import { useRef } from 'react'
import { Download, Copy, Trash2, Upload, Image } from 'lucide-react'
import clsx from 'clsx'

export default function CanvasPreview({
  canvasRef,
  isLoaded,
  isLoading,
  dimensions,
  onUpload,
  onDownload,
  onCopy,
  onClear,
}) {
  const fileInputRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onUpload(ev.target.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => onUpload(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="panel flex flex-col h-full">
      {/* Header */}
      <div className="panel-header">
        <span className="panel-title">Preview</span>
        {isLoaded && (
          <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse2" />
            {dimensions.width} × {dimensions.height}
          </span>
        )}
      </div>

      {/* Canvas Area */}
      <div
        className={clsx(
          'flex-1 flex items-center justify-center min-h-80 relative',
          isLoaded ? 'canvas-checkerboard p-6' : 'bg-stone-50 p-8'
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-stone-200 border-t-brand rounded-full animate-spin" />
              <span className="text-xs text-stone-500 font-medium">Loading image…</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoaded && !isLoading && (
          <div
            className="flex flex-col items-center gap-4 text-center cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-brand
                            flex items-center justify-center text-brand
                            group-hover:border-brand group-hover:text-brand transition-all duration-200
                            group-hover:bg-brand-light">
              <Image size={32} />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-600 mb-1">
                Drop an image or click to upload
              </p>
              <p className="text-xs text-stone-400">PNG, JPG, GIF, WebP supported</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="w-8 h-px bg-stone-200" />
              or pick a template below
              <span className="w-8 h-px bg-stone-200" />
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className={clsx(
            'max-w-full max-h-[500px] rounded-xl shadow-canvas transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
          )}
        />
      </div>

      {/* Toolbar */}
      {isLoaded && (
        <div className="px-4 py-3 border-t border-stone-100 bg-stone-50/50 flex items-center gap-2 animate-slideIn">
          <button onClick={onDownload} className="btn-brand flex-1 gap-2 text-xs py-2">
            <Download size={14} />
            Download PNG
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-ghost text-xs py-2 px-3 gap-1.5"
          >
            <Upload size={14} />
          </button>
          <button onClick={onClear} className="btn-ghost text-xs py-2 px-3 gap-1.5 text-red-400 hover:text-red-600 hover:bg-red-50">
            <Trash2 size={14} />
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}
