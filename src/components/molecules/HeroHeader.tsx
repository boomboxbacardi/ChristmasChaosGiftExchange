import { ReactNode } from 'react'

type HeroHeaderProps = {
  eyebrow: string
  title: string
  subtitle: string
  actions?: ReactNode
}

export const HeroHeader = ({ eyebrow, title, subtitle, actions }: HeroHeaderProps) => (
  <header className="hero">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{subtitle}</p>
    </div>
    {actions ? <div className="hero-actions">{actions}</div> : null}
  </header>
)
