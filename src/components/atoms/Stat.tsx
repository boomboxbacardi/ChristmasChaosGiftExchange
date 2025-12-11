type StatProps = {
  label: string
  value: string | number
}

export const Stat = ({ label, value }: StatProps) => (
  <div className="stat">
    <span className="label">{label}</span>
    <strong>{value}</strong>
  </div>
)
