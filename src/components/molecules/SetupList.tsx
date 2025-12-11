type SetupListProps = {
  players: string[]
  onNameChange: (index: number, value: string) => void
  onRemove: (index: number) => void
  onAdd: () => void
  playerPlaceholder: (index: number) => string
  removeLabel: string
  addLabel: string
  disableRemove: boolean
}

export const SetupList = ({
  players,
  onNameChange,
  onRemove,
  onAdd,
  playerPlaceholder,
  removeLabel,
  addLabel,
  disableRemove,
}: SetupListProps) => (
  <div className="setup-list">
    {players.map((name, idx) => (
      <div key={idx} className="setup-row">
        <span className="setup-index" aria-hidden="true">
          {idx + 1}
        </span>
        <input
          value={name}
          onChange={(e) => onNameChange(idx, e.target.value)}
          placeholder={playerPlaceholder(idx + 1)}
          aria-label={playerPlaceholder(idx + 1)}
        />
        <button className="secondary ghost" onClick={() => onRemove(idx)} disabled={disableRemove}>
          {removeLabel}
        </button>
      </div>
    ))}
    <button className="secondary ghost setup-add" onClick={onAdd}>
      <span className="setup-add-icon" aria-hidden="true">
        +
      </span>
      {addLabel}
    </button>
  </div>
)
