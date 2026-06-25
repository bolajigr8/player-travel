'use client'

import { memo, useState, useCallback, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Wifi,
  Database,
  Zap,
  Loader2,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  useSimPackagesByIccid,
  useTopUpPackages,
  useCreateTopUp,
} from '@/features/esim/hooks'
import type { TopUpPackageItem } from '@/features/esim/types'

/* ── Plan row ──────────────────────────────────────────────────── */
const TopUpPlanRow = memo(function TopUpPlanRow({
  pkg,
  selected,
  onSelect,
}: {
  pkg: TopUpPackageItem
  selected: boolean
  onSelect: (id: string) => void
}) {
  const ppd =
    pkg.validity_days > 0 ? (pkg.price / pkg.validity_days).toFixed(2) : null

  return (
    <button
      onClick={() => onSelect(pkg.id)}
      className={cn(
        'flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-200',
        selected
          ? 'border-primary bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25)]'
          : 'border-border bg-card hover:border-primary/40',
      )}
    >
      <div
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          selected ? 'border-primary bg-primary' : 'border-muted-foreground/40',
        )}
      >
        {selected && (
          <div className='size-2 rounded-full bg-primary-foreground' />
        )}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-sm font-bold'>
          {pkg.unlimited ? 'Unlimited' : pkg.data}
        </p>
        <p className='truncate text-[12px] text-muted-foreground'>
          {pkg.validity_days} Days · Top-up
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <p className='font-heading font-bold text-primary'>
          €{pkg.price.toFixed(2)}
        </p>
        {ppd && (
          <p className='font-mono text-[10px] text-muted-foreground'>
            €{ppd}/DAY
          </p>
        )}
      </div>
    </button>
  )
})

/* ── Status badge ──────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const isActive = status === 'ACTIVE'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'bg-muted text-muted-foreground',
      )}
    >
      {isActive ? (
        <CheckCircle2 className='size-3' />
      ) : (
        <Clock className='size-3' />
      )}
      {status.replace(/_/g, ' ')}
    </span>
  )
}

/* ── Inner component that reads searchParams ───────────────────── */
function EsimTopUpInner() {
  const router = useRouter()
  const params = useSearchParams()
  const iccid = (params.get('iccid') ?? '').trim()

  /* Bug fix #2 & #5: only enable queries / mutation when iccid is valid */
  const validIccid = /^\d{18,22}$/.test(iccid) ? iccid : null

  const { data: simPackagesData, isLoading: simLoading } =
    useSimPackagesByIccid(validIccid)
  const { data: topUpData, isLoading: topUpLoading } =
    useTopUpPackages(validIccid)

  /* Bug fix #5: pass validIccid (never empty string) */
  const { mutate: createTopUp, isPending } = useCreateTopUp(validIccid ?? '')

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<1 | 2>(1)

  const topUpPackages: TopUpPackageItem[] = useMemo(
    () => topUpData?.data ?? [],
    [topUpData],
  )

  /* Bug fix #4: match on pkg.id (not pkg.package_id) */
  const selectedPkg = useMemo(
    () => topUpPackages.find((p) => p.id === selectedId) ?? null,
    [topUpPackages, selectedId],
  )

  const currentPackages = useMemo(
    () => simPackagesData?.data ?? [],
    [simPackagesData],
  )

  /* Bug fix #8: only show genuinely active package in the status card */
  const activePackage = useMemo(
    () => currentPackages.find((p) => p.status === 'ACTIVE') ?? null,
    [currentPackages],
  )

  /* Most-recent package for context (regardless of status) */
  const latestPackage = useMemo(
    () => currentPackages[0] ?? null,
    [currentPackages],
  )

  const handleSelect = useCallback((id: string) => setSelectedId(id), [])

  const handleContinue = useCallback(() => {
    if (!selectedPkg) {
      toast.error('Select a top-up plan first.')
      return
    }
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedPkg])

  const handlePurchase = useCallback(() => {
    if (!email || !email.includes('@')) {
      toast.error('Enter a valid email address.')
      return
    }
    if (!selectedPkg || !validIccid) return

    /* Bug fix #4: send pkg.id as package_id */
    createTopUp(
      {
        package_id: selectedPkg.id,
        quantity: 1,
        email,
        sandbox: false,
      },
      {
        onSuccess: (res) => {
          window.location.href = res.data.checkout_url
        },
        onError: (err) => {
          toast.error(
            err.response?.data?.message ??
              err.message ??
              'Could not start top-up checkout.',
          )
        },
      },
    )
  }, [email, selectedPkg, validIccid, createTopUp])

  /* ── No / invalid ICCID ── */
  if (!validIccid) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='page-container py-20 text-center'>
          <div className='mx-auto max-w-sm space-y-3'>
            <p className='font-heading text-lg font-black'>No eSIM found</p>
            <p className='text-sm text-muted-foreground'>
              {iccid
                ? `"${iccid}" doesn't look like a valid ICCID (must be 18–22 digits).`
                : 'No ICCID was provided. Use the link from your confirmation email, or enter your ICCID below.'}
            </p>
            <button
              onClick={() => router.push('/esim')}
              className='font-mono text-sm text-primary underline underline-offset-2'
            >
              ← Back to eSIM store
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isLoading = simLoading || topUpLoading

  return (
    <div className='min-h-screen bg-background'>
      <div className='page-container py-6'>
        <button
          onClick={() => router.back()}
          className='mb-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Back
        </button>

        {/* Header card */}
        <div className='mb-8 rounded-2xl border border-border bg-card p-6'>
          <div className='flex items-start gap-4'>
            <div className='grid size-12 shrink-0 place-items-center rounded-full bg-primary/10'>
              <Wifi className='size-6 text-primary' />
            </div>
            <div className='min-w-0'>
              <p className='font-mono text-[10px] uppercase tracking-wider text-primary'>
                Top Up Your eSIM
              </p>
              <h1 className='font-heading text-2xl font-black'>
                Add More Data
              </h1>
              <p className='mt-1 break-all font-mono text-[11px] text-muted-foreground'>
                ICCID: {iccid}
              </p>
            </div>
          </div>

          {/* Active package status */}
          {!simLoading && activePackage && (
            <div className='mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3'>
              <div>
                <p className='text-sm font-bold'>
                  Current: {activePackage.package.data}
                </p>
                <p className='text-[11px] text-muted-foreground'>
                  {activePackage.package.validity_days} days validity
                  {activePackage.expired_at
                    ? ` · Expires ${new Date(activePackage.expired_at).toLocaleDateString()}`
                    : ''}
                </p>
              </div>
              <StatusBadge status={activePackage.status} />
            </div>
          )}

          {/* Show latest even if not ACTIVE, so user has context */}
          {!simLoading && !activePackage && latestPackage && (
            <div className='mt-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3'>
              <div>
                <p className='text-sm font-bold'>
                  Last package: {latestPackage.package.data}
                </p>
                <p className='text-[11px] text-muted-foreground'>
                  {latestPackage.package.validity_days} days validity
                </p>
              </div>
              <StatusBadge status={latestPackage.status} />
            </div>
          )}
        </div>

        {/* Main layout */}
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]'>
          <div className='space-y-8'>
            {/* ── Step 1: pick plan ── */}
            {step === 1 && (
              <>
                <section>
                  <h2 className='mb-4 font-heading text-sm font-black uppercase tracking-wide'>
                    Choose a Top-Up
                  </h2>

                  {isLoading ? (
                    <div className='space-y-3'>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className='h-16 animate-pulse rounded-xl bg-muted'
                        />
                      ))}
                    </div>
                  ) : topUpPackages.length === 0 ? (
                    <div className='rounded-xl border border-dashed border-border px-5 py-10 text-center'>
                      <p className='text-sm text-muted-foreground'>
                        No top-up packages found for this eSIM.
                      </p>
                      <p className='mt-1 text-[11px] text-muted-foreground'>
                        This may mean the eSIM operator doesn't support top-ups,
                        or the ICCID is incorrect.
                      </p>
                    </div>
                  ) : (
                    <div className='space-y-3'>
                      {topUpPackages.map((pkg) => (
                        <TopUpPlanRow
                          key={pkg.id}
                          pkg={pkg}
                          selected={pkg.id === selectedId}
                          onSelect={handleSelect}
                        />
                      ))}
                    </div>
                  )}
                </section>

                <div className='flex justify-end'>
                  <motion.button
                    onClick={handleContinue}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedPkg}
                    className='flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] disabled:opacity-50'
                  >
                    Continue →
                  </motion.button>
                </div>
              </>
            )}

            {/* ── Step 2: email + confirm ── */}
            {step === 2 && (
              <div className='space-y-6'>
                <div className='flex items-center gap-3 rounded-2xl border border-border bg-card p-5'>
                  <div className='grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary'>
                    <Database className='size-5' />
                  </div>
                  <div>
                    <p className='font-heading font-bold'>Confirm Top-Up</p>
                    <p className='text-[12px] text-muted-foreground'>
                      We'll send the confirmation to your email
                    </p>
                  </div>
                </div>

                {/* Selected plan summary */}
                {selectedPkg && (
                  <div className='rounded-xl border border-primary/30 bg-primary/5 px-4 py-3'>
                    <p className='font-mono text-[10px] uppercase tracking-wider text-primary'>
                      Selected plan
                    </p>
                    <p className='mt-1 text-sm font-bold'>
                      {selectedPkg.title}
                    </p>
                    <p className='text-[12px] text-muted-foreground'>
                      {selectedPkg.data} · {selectedPkg.validity_days} days · €
                      {selectedPkg.price.toFixed(2)}
                    </p>
                  </div>
                )}

                <div className='space-y-1.5'>
                  <label className='text-sm font-medium text-foreground'>
                    Email <span className='text-primary'>*</span>
                  </label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePurchase()}
                    placeholder='your@email.com'
                    autoFocus
                    className='w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary'
                  />
                </div>

                <div className='flex items-center justify-between pt-2'>
                  <button
                    onClick={() => setStep(1)}
                    className='flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                  >
                    <ArrowLeft className='size-4' /> Back
                  </button>

                  <motion.button
                    onClick={handlePurchase}
                    disabled={isPending || !email}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] disabled:opacity-50'
                  >
                    {isPending && <Loader2 className='size-3.5 animate-spin' />}
                    {isPending ? 'Redirecting…' : 'Pay Now →'}
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar summary */}
          {selectedPkg && (
            <div className='lg:sticky lg:top-6 lg:self-start overflow-hidden rounded-2xl border border-border bg-card'>
              <div className='flex items-center gap-2 bg-primary px-4 py-3.5'>
                <Zap className='size-4 text-primary-foreground' />
                <p className='font-heading text-sm font-black text-primary-foreground'>
                  Top-Up Summary
                </p>
              </div>
              <div className='space-y-4 p-4'>
                <div>
                  <p className='text-sm font-bold'>{selectedPkg.title}</p>
                  <p className='text-[11px] text-muted-foreground'>
                    {selectedPkg.data} · {selectedPkg.validity_days} Days
                  </p>
                </div>

                <div className='space-y-1 border-t border-border pt-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Data</span>
                    <span className='font-medium'>{selectedPkg.data}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Validity</span>
                    <span className='font-medium'>
                      {selectedPkg.validity_days} days
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Delivery</span>
                    <span className='font-bold text-primary'>Instant</span>
                  </div>
                </div>

                <div className='flex items-center justify-between rounded-xl bg-primary px-4 py-3.5 font-black'>
                  <span className='text-sm text-primary-foreground'>
                    Total:
                  </span>
                  <span className='text-primary-foreground'>
                    €{selectedPkg.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Bug fix #7: Suspense wrapper required for useSearchParams ─── */
export function EsimTopUp() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background'>
          <div className='page-container py-20'>
            <div className='space-y-3'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-16 animate-pulse rounded-xl bg-muted'
                />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <EsimTopUpInner />
    </Suspense>
  )
}
