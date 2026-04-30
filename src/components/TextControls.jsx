import { Bold, Italic, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react'
import { FONT_FAMILIES, TEXT_COLORS, TEXT_POSITIONS } from '../constants/templates'
import clsx from 'clsx'

function RangeInput({ label, value, min, max, step = 1, unit = '', onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {label}
        </label>
        <span className="text-xs font-mono text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

function ColorPicker({ label, colors, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-md border border-stone-200"
            style={{ background: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-6 h-6 cursor-pointer"
            title="Custom color"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {colors.map((c) => (
          <button
            key={c.value}
            title={c.label}
            onClick={() => onChange(c.value)}
            className={clsx(
              'color-swatch',
              c.value === '#ffffff' && 'border border-stone-200',
              value === c.value && 'color-swatch-active'
            )}
            style={{ background: c.value }}
          />
        ))}
      </div>
    </div>
  )
}

export default function TextControls({ settings, onChange }) {
  const {
    topText, bottomText, fontSize, fontFamily,
    textColor, strokeColor, strokeWidth,
    bold, italic, textAlign, uppercase, textPosition,
  } = settings

  const set = (key) => (val) => onChange({ ...settings, [key]: val })
  const toggle = (key) => () => onChange({ ...settings, [key]: !settings[key] })

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="panel-title">Text & Style</span>
        <Type size={14} className="text-stone-400" />
      </div>

      <div className="p-4 space-y-5">
        {/* Text inputs */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Top Text
            </label>
            <input
              type="text"
              value={topText}
              onChange={(e) => set('topText')(e.target.value)}
              placeholder="TOP TEXT"
              className="input-field"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Bottom Text
            </label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => set('bottomText')(e.target.value)}
              placeholder="BOTTOM TEXT"
              className="input-field"
            />
          </div>
        </div>

        <div className="h-px bg-stone-100" />

        {/* Font & Position */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Font
            </label>
            <select
              value={fontFamily}
              onChange={(e) => set('fontFamily')(e.target.value)}
              className="select-field"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Position
            </label>
            <select
              value={textPosition}
              onChange={(e) => set('textPosition')(e.target.value)}
              className="select-field"
            >
              {TEXT_POSITIONS.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Align & Formatting buttons */}
        <div className="flex gap-2 items-center">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-1">
            Style
          </span>
          {[
            { key: 'bold', icon: <Bold size={13} />, label: 'Bold' },
            { key: 'italic', icon: <Italic size={13} />, label: 'Italic' },
            { key: 'uppercase', icon: <span className="text-[11px] font-black">AA</span>, label: 'Uppercase' },
          ].map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={toggle(key)}
              title={label}
              className={clsx(
                'btn-icon text-sm',
                settings[key]
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'btn-outline'
              )}
            >
              {icon}
            </button>
          ))}

          <div className="ml-auto flex gap-1">
            {[
              { val: 'left', icon: <AlignLeft size={13} /> },
              { val: 'center', icon: <AlignCenter size={13} /> },
              { val: 'right', icon: <AlignRight size={13} /> },
            ].map(({ val, icon }) => (
              <button
                key={val}
                onClick={() => set('textAlign')(val)}
                className={clsx(
                  'btn-icon',
                  textAlign === val
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'btn-outline'
                )}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-stone-100" />

        {/* Size & Stroke */}
        <div className="space-y-4">
          <RangeInput
            label="Font Size"
            value={fontSize}
            min={16}
            max={120}
            unit="px"
            onChange={set('fontSize')}
          />
          <RangeInput
            label="Stroke Width"
            value={strokeWidth}
            min={0}
            max={12}
            unit="px"
            onChange={set('strokeWidth')}
          />
        </div>

        <div className="h-px bg-stone-100" />

        {/* Colors */}
        <ColorPicker
          label="Text Color"
          colors={TEXT_COLORS}
          value={textColor}
          onChange={set('textColor')}
        />
        <ColorPicker
          label="Outline Color"
          colors={TEXT_COLORS}
          value={strokeColor}
          onChange={set('strokeColor')}
        />
      </div>
    </div>
  )
}
