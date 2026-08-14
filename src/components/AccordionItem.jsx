import { useState } from 'react'

export default function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-line rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-ink-deep hover:bg-white/[0.02] transition-colors cursor-pointer text-left"
      >
        <h3 className="text-[15px] font-semibold text-paper m-0">{title}</h3>
        <svg
          className={`w-4 h-4 text-paper/50 transition-transform duration-200 flex-none ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <div
        className={`transition-[max-height,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] overflow-hidden ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-1 text-[13.5px] text-paper/70 leading-[1.7] space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
