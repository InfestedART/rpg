import { round } from '@/utils/utils'
import './SingleStat.css'

type SingleStatProps = {
  label: string,
  value: string | number | undefined,
  percentage?: boolean
}

const SingleStat = ({ label, value, percentage=false }: SingleStatProps) => {

  const showStat = (stat: string | number | undefined) => {
    return stat !== undefined && (typeof(stat) === 'string' || stat > 0)
  }
  const showChance = (value: number | undefined) => round((value || 0)*100, 2)  

  const displayValue = typeof(value) === 'number' && percentage ? showChance(value) : value
  return showStat(value) ?
    <div className="single-stat">
      <span className="single-stat__label">{label}</span>
      <span className="single-stat__value">{displayValue}{percentage && '%'}</span>
    </div> :
    <div/>
}

export default SingleStat