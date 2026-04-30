import { useCallback, useEffect, useRef, useState } from 'react'

export function useMemeCanvas(settings) {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const {
    topText,
    bottomText,
    fontSize,
    fontFamily,
    textColor,
    strokeColor,
    strokeWidth,
    bold,
    italic,
    textAlign,
    uppercase,
    textPosition,
  } = settings

  const drawMeme = useCallback(() => {
    const canvas = canvasRef.current
    const image = imgRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    canvas.width = image.naturalWidth || image.width
    canvas.height = image.naturalHeight || image.height
    setDimensions({ width: canvas.width, height: canvas.height })

    // Draw image
    ctx.drawImage(image, 0, 0)

    // Font setup
    const weight = bold ? 'bold ' : ''
    const style = italic ? 'italic ' : ''
    ctx.font = `${style}${weight}${fontSize}px "${fontFamily}"`
    ctx.fillStyle = textColor
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = strokeWidth
    ctx.lineJoin = 'round'
    ctx.textAlign = textAlign

    const x =
      textAlign === 'center'
        ? canvas.width / 2
        : textAlign === 'left'
        ? 20
        : canvas.width - 20

    const formatText = (t) => (uppercase ? t.toUpperCase() : t)

    const drawText = (text, y, baseline) => {
      if (!text.trim()) return
      ctx.textBaseline = baseline
      const lines = wrapText(ctx, text, canvas.width - 40)
      const lineH = fontSize * 1.15
      lines.forEach((line, i) => {
        const lineY = baseline === 'top'
          ? y + i * lineH
          : y - (lines.length - 1 - i) * lineH
        if (strokeWidth > 0) ctx.strokeText(formatText(line), x, lineY)
        ctx.fillText(formatText(line), x, lineY)
      })
    }

    const padding = Math.max(14, fontSize * 0.25)

    if (textPosition === 'top-bottom' || textPosition === 'top-only') {
      drawText(topText, padding, 'top')
    }
    if (textPosition === 'top-bottom' || textPosition === 'bottom-only') {
      drawText(bottomText, canvas.height - padding, 'bottom')
    }
    if (textPosition === 'center') {
      ctx.textBaseline = 'middle'
      const text = [topText, bottomText].filter(Boolean).join('\n')
      drawText(text, canvas.height / 2, 'middle')
    }
  }, [
    topText, bottomText, fontSize, fontFamily, textColor,
    strokeColor, strokeWidth, bold, italic, textAlign,
    uppercase, textPosition,
  ])

  useEffect(() => {
    if (isLoaded) drawMeme()
  }, [drawMeme, isLoaded])

  const loadImage = useCallback((src) => {
    setIsLoading(true)
    setIsLoaded(false)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      imgRef.current = img
      setIsLoaded(true)
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
    }
    img.src = src
  }, [])

  const clearCanvas = useCallback(() => {
    imgRef.current = null
    setIsLoaded(false)
    setDimensions({ width: 0, height: 0 })
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [])

  const downloadMeme = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !isLoaded) return false
    const link = document.createElement('a')
    link.download = `memeforge-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    return true
  }, [isLoaded])

  const copyToClipboard = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas || !isLoaded) return false
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ])
          resolve(true)
        } catch {
          resolve(false)
        }
      })
    })
  }, [isLoaded])

  return {
    canvasRef,
    isLoaded,
    isLoading,
    dimensions,
    loadImage,
    clearCanvas,
    downloadMeme,
    copyToClipboard,
  }
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}
