import React from 'react'

type Props = {
  actorName?: string
  currentPlayerName?: string
  isRandomizingTarget: boolean
  giveAwayTarget: string | null
  onClose: () => void
  title: string
  verb: string
  closeLabel: string
}

export const GiveAwayModal: React.FC<Props> = ({
  actorName,
  currentPlayerName,
  isRandomizingTarget,
  giveAwayTarget,
  onClose,
  title,
  verb,
  closeLabel,
}) => {
  const displayActor = actorName ?? currentPlayerName ?? '—'
  const displayTarget = giveAwayTarget ?? (isRandomizingTarget ? '…' : '—')

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onClose()
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={handleOverlayClick}
    >
      <div className="modal wide" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={closeLabel}
          disabled={isRandomizingTarget}
        >
          ×
        </button>
        <div className="modal-content">
          <h2>{title}</h2>
          <p className="modal-line">
            <span className="name-stable">{displayActor}</span>
            <span className="verb"> {verb} </span>
            <span className={`name-stable target ${isRandomizingTarget ? 'pulse' : ''}`}>{displayTarget}</span>
            <span className="emoji celebration">🎁✨</span>
          </p>
        </div>
      </div>
    </div>
  )
}
