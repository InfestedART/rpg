import './SingleStat.css'

type SingleStatProps = {
  label: string,
  value: string,
}


const SingleStat = ({ label, value }: SingleStatProps) => {
  return (
    <div className="single-stat">
      <span className="single-stat__label">{label}</span>
      <span className="single-stat__value">{value}</span>
    </div>
  )
}

export default SingleStat