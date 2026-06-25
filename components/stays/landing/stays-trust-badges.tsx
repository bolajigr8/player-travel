'use client'

import { motion } from 'framer-motion'
import { Shield, Tag, Star, MessageCircle } from 'lucide-react'
import { STAY_TRUST_BADGES } from '@/store/stays'

const ICONS: Record<string, React.ElementType> = {
  shield: Shield,
  tag: Tag,
  star: Star,
  message: MessageCircle,
}

export function StaysTrustBadges() {
  return (
    <section className='border-b border-border bg-card/40'>
      <div className='page-container py-6'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {STAY_TRUST_BADGES.map((badge, i) => {
            const Icon = ICONS[badge.icon] ?? Shield
            return (
              <motion.div
                key={badge.title}
                className='flex items-center gap-3'
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
              >
                <div className='grid size-9 shrink-0 place-items-center rounded-lg border border-primary/30 bg-primary/10 text-primary'>
                  <Icon className='size-4' />
                </div>
                <div>
                  <p className='text-[13px] font-bold leading-tight text-foreground'>
                    {badge.title}
                  </p>
                  <p className='text-[11px] leading-tight text-muted-foreground'>
                    {badge.subtitle}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
