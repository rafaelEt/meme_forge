import { useState } from 'react'
import { Upload } from 'lucide-react'
import { useRef } from 'react'
import { TEMPLATES } from '../constants/templates'
import clsx from 'clsx'

export default function TemplateGrid({ selectedId, onSelect, onUpload }) {
  const fileInputRef = useRef(null)
  const [tab, setTab] = useState('templates')
  const [hoveredId, setHoveredId] = useState(null)

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
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Source</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-100">
        {['templates', 'upload'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx('tab', tab === t && 'tab-active')}
          >
            {t === 'templates' ? 'Templates' : 'Upload'}
          </button>
        ))}
      </div>

      {/* Templates grid */}
      {tab === 'templates' && (
        <div className="p-3 grid grid-cols-3 gap-2 max-h-100 overflow-y-auto">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onSelect(tmpl)}
              onMouseEnter={() => setHoveredId(tmpl.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={clsx(
                'template-card group',
                selectedId === tmpl.id && 'template-card-active'
              )}
            >
              <div className="relative overflow-hidden">
                <img
                  src={tmpl.url}
                  alt={tmpl.name}
                  crossOrigin="anonymous"
                  loading="lazy"
                  className={clsx(
                    'w-full h-36 object-cover transition-transform duration-200',
                    hoveredId === tmpl.id && 'scale-105'
                  )}
                />
                {selectedId === tmpl.id && (
                  <div className="absolute inset-0 bg-brand/10 flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white px-2 py-1.5">
                <p className="text-[10px] font-semibold text-stone-500 truncate leading-none">
                  {tmpl.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload tab */}
      {tab === 'upload' && (
        <div className="p-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-stone-200 rounded-xl p-6
                       flex flex-col items-center gap-3 cursor-pointer group
                       hover:border-brand hover:bg-brand-light transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-stone-100 group-hover:bg-brand/10
                            flex items-center justify-center text-stone-400 group-hover:text-brand
                            transition-all duration-200">
              <Upload size={20} />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-stone-700 mb-1">
                Click or drag & drop
              </p>
              <p className="text-xs text-stone-400">PNG, JPG, GIF, WebP</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}
    </div>
  )
}
