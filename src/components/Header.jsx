import { Zap, Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        
        {/* Logo & Status */}
        <div className="flex items-center gap-2.5">
          <Zap size={18} className="text-rose-600" fill="currentColor" />
          <span className="font-medium tracking-tight text-stone-900">MemeForge</span>
          <span className="text-[10px] text-stone-400 uppercase tracking-widest">Beta</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-4 md:flex">
             <span className="flex items-center gap-1.5 text-[11px] text-stone-400">
              <span className="h-1 w-1 rounded-full bg-green-500" />
               Active
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/support"
              className="flex items-center gap-1.5 text-xs font-medium text-rose-600 transition-colors hover:text-rose-700"
            >
              <Heart size={14} />
              <span>Support The Creator</span>
            </a>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-stone-900 px-3.5 py-1.5 text-xs text-white transition-black hover:bg-stone-800 hidden md:flex"
            >
              GitHub
            </a>
          </div>
        </div>

      </div>
    </header>
  )
}