import SpikesIcon from '@/assets/icons/terrain/spikes.png'
import type { TileDecal } from '@/types/dungeon.types'

type IconProps = {
  name: TileDecal,
  size: number,
  className?: string,
}

const icons: Record<TileDecal, string> = {
  spikes: SpikesIcon,
  lava: SpikesIcon,
  button: SpikesIcon,
}

const TerrainIcon = ({size, name, className}: IconProps) => {
  return (
    <img
      width={size}
      height={size}
      src={icons[name]}
      className={className}
    />
  )
}

export default TerrainIcon