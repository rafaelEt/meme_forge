import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import CanvasPreview from './components/CanvasPreview'
import TemplateGrid from './components/TemplateGrid'
import TextControls from './components/TextControls'
import StickerPanel from './components/StickerPanel'
import Toast from './components/Toast'
import SupportPackages from './components/Support' // Import your new page
import { useMemeCanvas } from './hooks/useMemeCanvas'
import { useToast } from './hooks/useToast'
import { RotateCcw } from 'lucide-react'

const DEFAULT_SETTINGS = {
  topText: 'TOP TEXT',
  bottomText: 'BOTTOM TEXT',
  fontSize: 52,
  fontFamily: 'Impact',
  textColor: '#ffffff',
  strokeColor: '#000000',
  strokeWidth: 3,
  bold: false,
  italic: false,
  textAlign: 'center',
  uppercase: true,
  textPosition: 'top-bottom',
}

// Separate Editor Component for the / route
function Editor() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [selectedTmpl, setSelectedTmpl] = useState(null)
  const { toasts, showToast, removeToast } = useToast()

  const {
    canvasRef,
    isLoaded,
    isLoading,
    dimensions,
    loadImage,
    clearCanvas,
    downloadMeme,
    copyToClipboard,
  } = useMemeCanvas(settings)

  const handleTemplateSelect = (tmpl) => {
    setSelectedTmpl(tmpl.id)
    loadImage(tmpl.url)
  }

  const handleUpload = (src) => {
    setSelectedTmpl(null)
    loadImage(src)
  }

  const handleDownload = () => {
    if (!isLoaded) return showToast('Please select an image first', 'error')
    downloadMeme()
    showToast('Meme downloaded!', 'success')
  }

  const handleCopy = async () => {
    if (!isLoaded) return showToast('Please select an image first', 'error')
    const ok = await copyToClipboard()
    if (ok) showToast('Copied to clipboard!', 'success')
    else showToast('Copy not supported — try downloading', 'info')
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8">
        <div className="mb-8 animate-fadeUp">
          <h1 className="font-display text-4xl text-stone-900 leading-none mb-2">
            Create Your Meme
          </h1>
          <p className="text-sm text-stone-500">
            Pick a template or upload image, add text, and download in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-8">
            <section className="overflow-hidden">
              <CanvasPreview
                canvasRef={canvasRef}
                isLoaded={isLoaded}
                isLoading={isLoading}
                dimensions={dimensions}
                onUpload={handleUpload}
                onDownload={handleDownload}
                onCopy={handleCopy}
                onClear={() => {
                  clearCanvas()
                  setSelectedTmpl(null)
                  showToast('Canvas cleared', 'info')
                }}
              />
            </section>

            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-4">Featured Templates</h3>
              <TemplateGrid selectedId={selectedTmpl} onSelect={handleTemplateSelect} onUpload={handleUpload} />
            </section>
          </div>

          <aside className=" space-y-6">
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-stone-900">Customization</h2>
                <button
                  onClick={() => setSettings(DEFAULT_SETTINGS)}
                  className="flex items-center gap-1.5 text-[11px] text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
              <div className="space-y-6">
                <TextControls settings={settings} onChange={setSettings} />
                <div className="pt-6 border-t border-stone-100">
                  <StickerPanel onAddSticker={(emoji) => setSettings(s => ({ ...s, topText: s.topText + emoji }))} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-stone-100 py-6 mt-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between text-[11px] text-stone-400">
          <span>MemeForge — Built with React + Tailwind</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  )
}

// Main App with Routing
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50/50 flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/support" element={<SupportPackages />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}