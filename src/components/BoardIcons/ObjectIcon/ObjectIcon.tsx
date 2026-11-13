import chestIcon from '@/assets/icons/objects/chest.png'
import type { ObjectClassType } from '@/types/characterTypes'

type IconName = 'chest' | 'button'

type ObjectIconProps = {
  name: IconName,
  size: number,
  className?: string,
}

const icons: Record<ObjectClassType, string> = {
  chest: chestIcon,
  button: chestIcon,
}

const ObjectIcon = ({ name, size, className }: ObjectIconProps) => {
  return (
    <img width={size} height={size} src={icons[name]} className={className} />
  )
} 

export default ObjectIcon