import { HeroHeader } from '../molecules/HeroHeader'
import { SectionHeader } from '../atoms/SectionHeader'
import { SetupList } from '../molecules/SetupList'
import { OrderModal } from '../molecules/OrderModal'

type SetupTemplateProps = {
  eyebrow: string
  title: string
  subtitle: string
  setupTitle: string
  setupHint: string
  players: string[]
  highlightedIndex: number | null
  onNameChange: (index: number, value: string) => void
  onRemove: (index: number) => void
  onAdd: () => void
  playerPlaceholder: (index: number) => string
  removeLabel: string
  addLabel: string
  totalLabel: string
  pileValue: number
  onPileChange: (value: number) => void
  onRandomize: () => void
  randomizeLabel: string
  randomizingLabel: string
  isRandomizing: boolean
  orderHeading: string
  orderSubtitle: string
  orderFallback: (index: number) => string
  order: string[]
  isOrderOpen: boolean
  onOrderClose: () => void
  onOrderStart: () => void
  isStarting: boolean
  orderStartLabel: string
  orderStartingLabel: string
}

export const SetupTemplate = ({
  eyebrow,
  title,
  subtitle,
  setupTitle,
  setupHint,
  players,
  highlightedIndex,
  onNameChange,
  onRemove,
  onAdd,
  playerPlaceholder,
  removeLabel,
  addLabel,
  totalLabel,
  pileValue,
  onPileChange,
  onRandomize,
  randomizeLabel,
  randomizingLabel,
  isRandomizing,
  orderHeading,
  orderSubtitle,
  orderFallback,
  order,
  isOrderOpen,
  onOrderClose,
  onOrderStart,
  isStarting,
  orderStartLabel,
  orderStartingLabel,
}: SetupTemplateProps) => (
  <div className="page">
    <HeroHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
    <section className="layout">
      <div className="left-panel">
        <div className="block">
          <SectionHeader title={setupTitle} label={setupHint} />
          <SetupList
            players={players}
            highlightedIndex={highlightedIndex}
            onNameChange={onNameChange}
            onRemove={onRemove}
            onAdd={onAdd}
            playerPlaceholder={(idx) => playerPlaceholder(idx)}
            removeLabel={removeLabel}
            addLabel={addLabel}
            disableRemove={players.length <= 2}
          />
          <div className="setup-controls">
            <label className="label">{totalLabel}</label>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              value={pileValue}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9]/g, '')
                onPileChange(val ? Number(val) : 0)
              }}
            />
          </div>
          <div className="spinner-actions">
            <button className="primary" onClick={onRandomize} disabled={isRandomizing}>
              {isRandomizing ? randomizingLabel : randomizeLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="block">
          <SectionHeader title={orderHeading} label={orderSubtitle} />
          <div className="player-list">
            {players.map((name, idx) => (
              <div key={idx} className={`player-row ${highlightedIndex === idx ? 'active' : ''}`}>
                <div className="player-name">{name || orderFallback(idx + 1)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <OrderModal
      isOpen={isOrderOpen}
      order={order}
      heading={orderHeading}
      subtitle={orderSubtitle}
      startLabel={orderStartLabel}
      startingLabel={orderStartingLabel}
      isStarting={isStarting}
      onStart={onOrderStart}
      onClose={onOrderClose}
    />
  </div>
)
