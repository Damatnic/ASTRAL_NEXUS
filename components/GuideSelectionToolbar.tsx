'use client'

interface GuideSelectionToolbarProps {
  x: number
  y: number
  onHighlight: (color: 'yellow' | 'green' | 'pink') => void
  onCopy: () => void
  onClose: () => void
}

export default function GuideSelectionToolbar({ x, y, onHighlight, onCopy, onClose }: GuideSelectionToolbarProps) {
  return (
    <div
      className="fixed z-[120] -translate-x-1/2 -translate-y-full"
      style={{ left: x, top: y - 16 }}
    >
      <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-glow-sm">
        <button className="text-xs text-gray-300 hover:text-white" onClick={onCopy}>Copy</button>
        <div className="w-px h-4 bg-white/15" />
        <button className="w-4 h-4 rounded-full bg-yellow-400/70 hover:ring-2 hover:ring-yellow-300" onClick={() => onHighlight('yellow')} aria-label="Highlight as key idea" />
        <button className="w-4 h-4 rounded-full bg-green-400/70 hover:ring-2 hover:ring-green-300" onClick={() => onHighlight('green')} aria-label="Highlight as action" />
        <button className="w-4 h-4 rounded-full bg-pink-400/70 hover:ring-2 hover:ring-pink-300" onClick={() => onHighlight('pink')} aria-label="Highlight to remember" />
        <div className="w-px h-4 bg-white/15" />
        <button className="text-xs text-gray-500 hover:text-white" onClick={onClose}>✕</button>
      </div>
    </div>
  )
}


