import { STICKERS } from '../constants/templates'
import { Smile } from 'lucide-react'

export default function StickerPanel({ onAddSticker }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Quick Stickers</span>
        <Smile size={14} className="text-stone-400" />
      </div>
      <div className="p-3">
        <div className="flex flex-wrap gap-1">
          {STICKERS.map((s) => (
            <button
              key={s}
              onClick={() => onAddSticker(s)}
              title="Add to top text"
              className="w-9 h-9 flex items-center justify-center text-xl rounded-lg
                         border border-transparent hover:border-stone-200 hover:bg-stone-50
                         hover:scale-110 active:scale-95 transition-all duration-100 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-stone-400 mt-2 text-center">
          Click any emoji to append to top text
        </p>
      </div>
    </div>
  )
}
