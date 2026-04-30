import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'
import clsx from 'clsx'

const ICONS = {
  success: <CheckCircle size={15} className="text-green-400 shrink-0" />,
  error:   <XCircle size={15} className="text-red-400 shrink-0" />,
  info:    <AlertCircle size={15} className="text-blue-400 shrink-0" />,
}

export default function Toast({ toasts, onRemove }) {
  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            'flex items-center gap-3 px-4 py-3 rounded-xl shadow-toast',
            'bg-stone-900 text-white text-sm font-medium',
            'pointer-events-auto animate-slideIn min-w-48 max-w-72'
          )}
        >
          {ICONS[t.type] || ICONS.success}
          <span className="flex-1 text-xs">{t.message}</span>
          <button
            onClick={() => onRemove(t.id)}
            className="text-stone-500 hover:text-white transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  )
}
