import React from 'react'
import { nanoid } from "nanoid"
import Die from "./Die.jsx"
import Confetti from "react-confetti"
import Snowfall from "react-snowfall"

function App() {
  const [dice, setDice] = React.useState(() => generateNewDice())

  const gameWon = dice.every(die => die.isHeld) &&
  dice.every(die => die.value === dice[0].value)

  const resetBtn = React.useRef(null)
  
  React.useEffect(() => {
    if (gameWon) {
      resetBtn.current.focus()
    }
  }, [gameWon])

  
  function generateNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(),
        }))
  }

  function reroll() {
    if (!gameWon) {
    setDice(oldDice => oldDice.map(die =>
      die.isHeld?
        die :
        {...die, value: Math.ceil(Math.random() * 6)}
    ))} else {
      setDice(generateNewDice)
    }
  }

  function hold(id) {
    setDice(oldDice => oldDice.map(die => 
      die.id === id ?
        {...die, isHeld: !die.isHeld} :
        die
    ))
  }

  const diceElements = dice.map(dieObj => (
    <Die 
      key={dieObj.id}
      value={dieObj.value} 
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)} 
    />
  )
    
  )

  return (
    <main>
      <Snowfall />
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die
       to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className='roll-dice' ref={resetBtn} onClick={reroll}>{gameWon ? 'New game' : 'Roll'}</button>
    </main>
  )
}

export default App
