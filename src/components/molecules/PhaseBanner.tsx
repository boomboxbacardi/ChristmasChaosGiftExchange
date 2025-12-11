type PhaseBannerProps = {
  banner: string | null
  body: string
  cta: string
  onClose: () => void
}

export const PhaseBanner = ({ banner, body, cta, onClose }: PhaseBannerProps) => {
  if (!banner) return null
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal wide phase-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close phase modal">
          ×
        </button>
        <div className="modal-content">
          <h2>{banner}</h2>
          <p className="modal-line">{body}</p>
          <div className="spinner-actions">
            <button className="primary" onClick={onClose}>
              {cta}
            </button>
            <button className="secondary" onClick={onClose} aria-label="Close phase modal">
              Stäng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
