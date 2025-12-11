type SectionHeaderProps = {
  title: string
  label?: string
}

export const SectionHeader = ({ title, label }: SectionHeaderProps) => (
  <div className="section-head">
    <h3>{title}</h3>
    {label ? <p className="label">{label}</p> : null}
  </div>
)
