type SetupListProps = {
  players: string[]
  highlightedIndex: number | null
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
  highlightedIndex,
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
      <div key={idx} className={`setup-row ${highlightedIndex === idx ? 'active' : ''}`}>
        <input value={name} onChange={(e) => onNameChange(idx, e.target.value)} placeholder={playerPlaceholder(idx + 1)} />
        <button className="secondary" onClick={() => onRemove(idx)} disabled={disableRemove}>
          {removeLabel}
        </button>
      </div>
    ))}
    <button className="secondary" onClick={onAdd}>
      {addLabel}
    </button>
  </div>
)
