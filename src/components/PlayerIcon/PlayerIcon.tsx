import RangerIcon from '@/assets/icons/classes/ranger.svg?react'
import WarriorIcon from '@/assets/icons/classes/warrior.svg?react'
import type { CharClassType } from '@/types/characterTypes'

const icons: Record<CharClassType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  ranger: RangerIcon,
  warrior: WarriorIcon,
  soldier: WarriorIcon,
  bandit: WarriorIcon,
  wizard: RangerIcon,
}

type PlayerIconProps = {
  name: CharClassType,
  size?: number,
  className?: string
}

const PlayerIcon = ({ name, size, className }: PlayerIconProps) => {
  const IconComponent = icons[name]

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
    />
  )
}

export default PlayerIcon