import { RollOutcome } from '../../types/game'

type LastRollCardProps = {
  lastOutcome: RollOutcome | null
  label: string
  emptyLabel: string
}

export const LastRollCard = ({ lastOutcome, label, emptyLabel }: LastRollCardProps) => (
  <div className="last-roll block">
    <p className="label">{label}</p>
    {lastOutcome ? (
      <div className="roll-card">
        <div>
          <div className="roll-title">{lastOutcome.title}</div>
          <div className="roll-desc">{lastOutcome.description}</div>
          <div className="roll-phase">{lastOutcome.phase.toUpperCase()}</div>
        </div>
      </div>
    ) : (
      <div className="roll-card empty">{emptyLabel}</div>
    )}
  </div>
)
