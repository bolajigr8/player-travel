'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useLocalEsimPackages,
  useGlobalEsimPackages,
  useCreateEsimOrder,
} from '@/features/esim/hooks'
import type { EsimPackage } from '@/features/esim/types'
import { toast } from 'sonner'

import { StepProgress, type CheckoutStep } from './StepProgress'
import { OrderSidebar } from './OrderSidebar'
import { Step1PlanSelection } from './Step1PlanSelection'
import { Step2ContactDetails } from './Step2ContactDetails'

export function EsimCheckout() {
  const router = useRouter()
  const params = useSearchParams()

  const packageId = params.get('id') ?? ''
  const destination = params.get('destination') ?? ''
  const isGlobal = destination.toLowerCase() === 'global'
  const countryCodeFromId = !isGlobal ? destination.toUpperCase() : ''

  const { data: localData } = useLocalEsimPackages(
    !isGlobal ? countryCodeFromId : null,
  )
  const { data: globalData } = useGlobalEsimPackages()

  const allPackages: EsimPackage[] = isGlobal
    ? (globalData?.data?.data ?? [])
    : (localData?.data?.data ?? [])

  const [selectedPackageId, setSelectedPackageId] = useState<string>(packageId)
  const countryPackages = allPackages.filter(
    (p) => p.country_code?.toUpperCase() === countryCodeFromId,
  )
  const pkg =
    allPackages.find((p) => p.package_id === selectedPackageId) ??
    allPackages.find(
      (p) => p.country_code?.toUpperCase() === countryCodeFromId,
    ) ??
    null

  const [step, setStep] = useState<CheckoutStep>(1)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [deviceConfirmed, setDeviceConfirmed] = useState(false)
  const [activationConfirmed, setActivationConfirmed] = useState(false)

  const { mutate: createOrder, isPending } = useCreateEsimOrder()

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleStep1Continue() {
    if (!pkg) return
    setStep(2)
    scrollTop()
  }

  function handleStep2Submit() {
    if (!email || !email.includes('@')) {
      toast.error('Enter a valid email address.')
      return
    }
    if (!deviceConfirmed) {
      toast.error('Please confirm your device is eSIM-compatible.')
      return
    }
    if (!pkg) return

    createOrder(
      {
        package_id: pkg.package_id,
        quantity: 1,
        email,
        full_name: fullName || undefined,
        phone: phone || undefined,
        country: pkg.country_code ?? countryCodeFromId,
        type: isGlobal ? 'global' : 'local',
        sandbox: false,
      },
      {
        onSuccess: (res) => {
          sessionStorage.setItem('esim:ledger_id', String(res.data.ledger_id))
          sessionStorage.setItem('esim:session_id', res.data.session_id)
          window.location.href = res.data.checkout_url
        },
        onError: (err) => {
          toast.error(
            err.response?.data?.message ??
              err.message ??
              'Could not start checkout.',
          )
        },
      },
    )
  }

  const code =
    pkg?.country_code?.toUpperCase().slice(0, 2) ??
    pkg?.country.slice(0, 2).toUpperCase() ??
    '??'
  const planType = isGlobal ? 'Regional' : 'Local'
  const coverage = isGlobal ? 'Regional / Global' : 'Nationwide'

  console.log('Rendering checkout with:', pkg)
  return (
    <div className='min-h-screen pt-10 bg-background'>
      {/* Step bar — uses card bg + border variables */}
      <div className='sticky top-0 z-20 border-b border-border bg-background backdrop-blur-sm'>
        <div className='page-container flex items-center justify-between py-4'>
          <StepProgress step={step} />
          <div className='hidden text-right sm:block'>
            <p className='font-mono text-[9px] uppercase tracking-wider text-muted-foreground'>
              Running Total
            </p>
            <p className='font-heading text-lg font-black text-primary'>
              {pkg ? `€${pkg.price.toFixed(2)}` : '—'}
            </p>
          </div>
        </div>
      </div>

      <div className='page-container py-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]'>
          <div>
            {step === 1 && (
              <Step1PlanSelection
                pkg={pkg}
                code={code}
                planType={planType}
                coverage={coverage}
                countryPackages={countryPackages}
                selectedPackageId={selectedPackageId}
                onSelectPackage={setSelectedPackageId}
                onBack={() => router.back()}
                onContinue={handleStep1Continue}
              />
            )}

            {step === 2 && (
              <Step2ContactDetails
                email={email}
                setEmail={setEmail}
                fullName={fullName}
                setFullName={setFullName}
                phone={phone}
                setPhone={setPhone}
                deviceConfirmed={deviceConfirmed}
                setDeviceConfirmed={setDeviceConfirmed}
                activationConfirmed={activationConfirmed}
                setActivationConfirmed={setActivationConfirmed}
                isPending={isPending}
                onBack={() => {
                  setStep(1)
                  scrollTop()
                }}
                onSubmit={handleStep2Submit}
              />
            )}
          </div>

          <div className='lg:sticky lg:top-[73px] lg:self-start'>
            <OrderSidebar pkg={pkg} isGlobal={isGlobal} />
          </div>
        </div>
      </div>
    </div>
  )
}
