import RatIcon from '@/assets/icons/enemies/rat.svg?react'
import SkeletonIcon from '@/assets/icons/enemies/skeleton_1.svg?react'
import BrigandIcon from '@/assets/icons/enemies/brigand.svg?react'

import type { EnemyClassType } from '@/types/characterTypes'

const icons: Record<EnemyClassType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  rat: RatIcon,
  skeleton: SkeletonIcon,
  brigand: BrigandIcon,
  dummy: SkeletonIcon,
}

type IconName = keyof typeof icons

type UnitIconProps = {
  name: IconName
  size?: number
  className?: string
}

const UnitIcon = ({ name, size, className }: UnitIconProps) => {
  const IconComponent = icons[name]

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
    />
  )
}

export default UnitIcon