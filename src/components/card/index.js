import { useEffect, useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import CardContainer from './index.style'

const Card = ({ data, position, positionTop, onSelectCard, nextTurn }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(false)
  }, [data])

  const onClickCard = () => {
    if (!isFlipped && position === nextTurn) {
      setIsFlipped(!isFlipped)
      onSelectCard()
    }
  }

  return (
    <CardContainer
      position={position}
      positionTop={positionTop}
      isFlipped={isFlipped}
      onClick={onClickCard}
      zIndex={data.zIndex || 0}
    >
      <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
        <div></div>
        <div>
          <img src={data.card_images[0].image_url} alt='card' />
        </div>
      </ReactCardFlip>
    </CardContainer>
  )
}

export default Card
