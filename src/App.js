import { useEffect, useState } from 'react'

import Card from './components/card'
import { splitArray } from './utils/common'
import { Desk } from './App.style'

const App = () => {
  const [cards, setCards] = useState()
  const [points, setPoints] = useState({
    player1: 0,
    player2: 0,
  })
  const [maxPoint, setMaxPoint] = useState(0)
  const [cardsLeft, setCardsLeft] = useState()
  const [nextTurn, setNextTurn] = useState('player1')
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)

  const fetchCards = async () => {
    const res = await fetch(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=0&type=Normal%20Monster'
    )
    const result = await res.json()
    setCardsLeft(result.data.length)
    setCards(splitArray(result.data))
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const onSelectCard = (player, card, index) => {
    // set the next selected card's z-index
    const arr = [...cards]
    arr[player === 'player1' ? 0 : 1][index].zIndex = selectedCardIndex
    setSelectedCardIndex(selectedCardIndex + 1)
    setCards(arr)

    // make player wait until other player select a card
    const oppositePlayer = player === 'player1' ? 'player2' : 'player1'
    setNextTurn(oppositePlayer)

    // calculate the point base on selected cards
    if (maxPoint > 0) {
      if (card.atk > maxPoint) {
        setPoints({
          ...points,
          [player]: points[player] + 1,
        })
      } else {
        setPoints({
          ...points,
          [oppositePlayer]: points[oppositePlayer] + 1,
        })
      }
      setMaxPoint(0)
    } else {
      setMaxPoint(card.atk)
    }

    setCardsLeft(cardsLeft - 1)
  }

  useEffect(() => {
    console.log(cardsLeft, points)
    if (cardsLeft === 0 && (points.player1 > 0 || points.player2 > 0)) {
      setTimeout(() => {
        alert(points.player1 > points.player2 ? 'Player1 Win!' : 'Player2 Win!')
      }, 1000)
    }
  }, [cardsLeft, points])

  const onReplay = () => {
    fetchCards()
    setMaxPoint(0)
    setPoints({
      player1: 0,
      player2: 0,
    })
    setSelectedCardIndex(0)
    setNextTurn('player1')
  }

  return (
    <div className='App'>
      {cards && (
        <Desk>
          <button className='btn__replay' onClick={onReplay}>
            Replay
          </button>
          <p className='point-1'>Player1: {points.player1}</p>
          {cards[0].map((card, i) => (
            <Card
              key={card.id}
              data={card}
              position='player1'
              positionTop={100 + i * 100}
              onSelectCard={() => onSelectCard('player1', card, i)}
              nextTurn={nextTurn}
            />
          ))}
          <p className='point-2'>Player2: {points.player2}</p>
          {cards[1].map((card, i) => (
            <Card
              key={card.id}
              data={card}
              position='player2'
              positionTop={100 + i * 100}
              onSelectCard={() => onSelectCard('player2', card, i)}
              nextTurn={nextTurn}
            />
          ))}
        </Desk>
      )}
    </div>
  )
}

export default App
