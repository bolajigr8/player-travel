'use client'

import {
  SlidersHorizontal,
  Plane,
  BedDouble,
  Wifi,
  Star,
  CreditCard,
  Bell,
  Info,
  Gift,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  INBOX_MESSAGES,
  type InboxMessage,
  type MessageType,
} from '@/store/dashboard'

export type InboxTab = 'All' | 'Unread' | 'Important'

const MSG_ICON: Record<MessageType, React.ElementType> = {
  flight: Plane,
  stay: BedDouble,
  esim: Wifi,
  reward: Star,
  payment: CreditCard,
  info: Info,
  welcome: Bell,
  promo: Gift,
}

const MSG_COLOR: Record<MessageType, string> = {
  flight: 'bg-primary/20 text-primary',
  stay: 'bg-[#C084FC]/20 text-[#C084FC]',
  esim: 'bg-[#34D399]/20 text-[#34D399]',
  reward: 'bg-amber-500/20 text-amber-400',
  payment: 'bg-green-500/20 text-green-400',
  info: 'bg-gray-500/20 text-gray-400',
  welcome: 'bg-primary/20 text-primary',
  promo: 'bg-orange-500/20 text-orange-400',
}

interface InboxLeftPanelProps {
  activeTab: InboxTab
  setActiveTab: (tab: InboxTab) => void
  selectedMsg: InboxMessage
  setSelectedMsg: (msg: InboxMessage) => void
}

export function InboxLeftPanel({
  activeTab,
  setActiveTab,
  selectedMsg,
  setSelectedMsg,
}: InboxLeftPanelProps) {
  const unreadCount = INBOX_MESSAGES.filter((m) => m.unread).length
  const filtered =
    activeTab === 'Unread'
      ? INBOX_MESSAGES.filter((m) => m.unread)
      : INBOX_MESSAGES

  return (
    <div className='w-full border-r border-border'>
      {/* Tabs */}
      <div className='flex items-center border-b border-border px-3 pt-3'>
        {(['All', 'Unread', 'Important'] as InboxTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'relative flex items-center gap-1.5 px-3 py-2.5 font-heading text-[12px] font-semibold transition-colors',
              activeTab === tab
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab}
            {tab === 'All' && (
              <span className='rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary-foreground'>
                {INBOX_MESSAGES.length}
              </span>
            )}
            {tab === 'Unread' && unreadCount > 0 && (
              <span className='rounded-full bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary-foreground'>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
        <button className='ml-auto p-1.5 text-muted-foreground hover:text-foreground'>
          <SlidersHorizontal className='h-3.5 w-3.5' />
        </button>
      </div>

      {/* Message list */}
      <div>
        {filtered.map((msg) => {
          const Icon = MSG_ICON[msg.type]
          const isSelected = selectedMsg.id === msg.id
          return (
            <button
              key={msg.id}
              onClick={() => setSelectedMsg(msg)}
              className={cn(
                'flex w-full items-start gap-3 border-b border-border px-3 py-3 text-left transition-colors',
                isSelected
                  ? 'border-l-2 border-l-primary bg-muted/60'
                  : 'border-l-2 border-l-transparent hover:bg-muted/30',
              )}
            >
              <div
                className={cn(
                  'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                  MSG_COLOR[msg.type],
                )}
              >
                <Icon className='h-3.5 w-3.5' />
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-1'>
                  <p
                    className={cn(
                      'truncate font-heading text-[12px]',
                      msg.unread
                        ? 'font-bold text-foreground dark:text-primary'
                        : 'font-semibold text-muted-foreground',
                    )}
                  >
                    {msg.title}
                  </p>
                  <span className='shrink-0 font-mono text-[9px] text-muted-foreground'>
                    {msg.time}
                  </span>
                </div>
                <p className='mt-0.5 line-clamp-2 text-[11px] text-muted-foreground'>
                  {msg.preview}
                </p>
                {msg.unread && (
                  <span className='mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary' />
                )}
              </div>
            </button>
          )
        })}
        <p className='py-4 text-center font-mono text-[10px] text-muted-foreground'>
          — End of messages —
        </p>
      </div>
    </div>
  )
}
