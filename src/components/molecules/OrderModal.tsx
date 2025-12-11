import React from 'react'

type OrderModalProps = {
  isOpen: boolean
  order?: string[]
  heading: string
  subtitle: string
  startLabel: string
  startingLabel: string
  isStarting: boolean
  onStart: () => void
  onClose: () => void
}

export const OrderModal = ({
  isOpen,
  order,
  heading,
  subtitle,
  startLabel,
  startingLabel,
  isStarting,
  onStart,
  onClose,
}: OrderModalProps) => {
  if (!isOpen) return null

  const hasOrder = Boolean(order?.length)
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
        <button className="modal-close" onClick={onClose} disabled={isStarting}>
          ×
        </button>
        <div className="modal-content">
          <h2>{heading}</h2>
          <p className="modal-line">{subtitle}</p>
          {hasOrder && (
            <div className="order-list">
              {order?.map((name, idx) => (
                <div key={name + idx} className="order-entry">
                  <span className="order-badge">{idx + 1}</span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          )}
          <div className="spinner-actions">
            <button className="primary" onClick={onStart} disabled={isStarting}>
              {isStarting ? startingLabel : startLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
