import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Database,
  Zap,
  Wifi,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PlanRow } from './PlanRow'
import { DetailChip } from './DetailChip'
import type { EsimPackage } from '@/features/esim/types'

export function Step1PlanSelection({
  pkg,
  code,
  planType,
  coverage,
  countryPackages,
  selectedPackageId,
  onSelectPackage,
  onBack,
  onContinue,
}: {
  pkg: EsimPackage | null
  code: string
  planType: string
  coverage: string
  countryPackages: EsimPackage[]
  selectedPackageId: string
  onSelectPackage: (id: string) => void
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <div className='space-y-8'>
      {pkg && (
        <div className='flex  items-center gap-4 rounded-2xl border border-border bg-card p-5'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold'>
            {code}
          </div>
          <div>
            <p className='font-mono text-[10px] uppercase tracking-wider text-primary'>
              {planType} eSIM
            </p>
            <p className='font-heading text-lg font-bold'>{pkg.country}</p>
            <div className='flex items-center gap-1 text-[11px] text-muted-foreground'>
              <Globe className='size-3' />
              {coverage}
            </div>
          </div>
        </div>
      )}

      <section>
        <h2 className='mb-4 font-heading text-sm font-black uppercase tracking-wide'>
          Choose Your Plan
        </h2>
        <div className='space-y-3'>
          {(countryPackages.length > 0
            ? countryPackages
            : pkg
              ? [pkg]
              : []
          ).map((p) => (
            <PlanRow
              key={p.package_id}
              pkg={p}
              selected={p.package_id === selectedPackageId}
              onSelect={() => onSelectPackage(p.package_id)}
            />
          ))}
        </div>
      </section>

      {pkg && (
        <section>
          <h2 className='mb-4 font-heading text-sm font-black uppercase tracking-wide'>
            Plan Details
          </h2>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            <DetailChip icon={Database} value={pkg.data} label='Data' />
            <DetailChip
              icon={Zap}
              value={`${pkg.validity_days} Days`}
              label='Validity'
            />
            <DetailChip icon={Wifi} value='5G' label='Speed' />
            <DetailChip icon={Globe} value={pkg.operator} label='Network' />
            <DetailChip icon={Globe} value={coverage} label='Coverage' />
            <DetailChip icon={Globe} value={planType} label='Plan Type' />
          </div>
        </section>
      )}

      <div className='flex items-center justify-between pt-2'>
        <button
          onClick={onBack}
          className='flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <ChevronLeft className='size-4' /> Back to plan
        </button>
        <motion.button
          onClick={onContinue}
          disabled={!pkg}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] disabled:opacity-50'
        >
          Continue <ChevronRight className='size-4' />
        </motion.button>
      </div>
    </div>
  )
}
