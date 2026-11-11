import type { FloatingTextType } from "@/types/dungeon.types"

type FloatingTextStyle = {
  className: string,
  format: (value?: number) => string,
}

export type FloatingTextProps = {
  type: FloatingTextType,
  value: number,
  onDone?: () => void,
}

const VARIANTS: Record<FloatingTextType, FloatingTextStyle> = {
  damage: { className: 'text-red-500 text-xl', format: (v) => `-${v}` },
  heal: { className: 'text-green-400 text-xl', format: (v) => `+${v}` },
  critical: { className: 'text-red-500 text-2xl font-bold', format: (v) => `-${v}!` },
  block: { className: 'text-yellow-400 text-xl', format: (v) => `-${v}` },
  miss: { className: 'text-orange-500 text-xl', format: () => `miss!` },
}

const FloatingText = ({ type, value, onDone }: FloatingTextProps) => {
  const { className, format } = VARIANTS[type]

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 z-50">
      <span
        onAnimationEnd={onDone}
        className={`block animate-float-up font-bold [text-shadow:0_2px_0_rgb(0_0_0/0.8)] ${className}`}
      >
        {format(value)}
      </span>
    </div>
  )
}

export default FloatingText