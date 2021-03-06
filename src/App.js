import React, {useState, useEffect} from 'react'

import './App.css';

/* Components */
import Die from './components/Die.js'
import Stopwatch from './components/Stopwatch.js';

function App() {
  const [randomDiceObj, setRandomDiceObj] = useState(allNewValue)
  const [numberOfRolls, setNumberOfRolls] = useState(0)
  const [tenzi, setTenzi] = useState(false)

  const [timerOn, setTimerOn] = useState(false);
  

  // Check if game ended or not
  useEffect(() => {
    const firstValue = randomDiceObj[0].value;
    const allHeld = randomDiceObj.every(die => die.held)
    const allSameNumber = randomDiceObj.every(die => firstValue === die.value)
    if(allHeld && allSameNumber) {
      setTenzi(true);
      setTimerOn(false)
    }
  }, [randomDiceObj])

  // Create new dice at the start
  function allNewValue() {
    const diceSides = 6;
    const randomNumbersArr = [];
    const amount = 10;

    for(let i = 0; i < amount; i++) {
      const obj = {
        id: i, 
        value: Math.ceil(Math.random() * diceSides),
        held: false
      }
  
      randomNumbersArr.push(obj);
    }
    return randomNumbersArr
  }

  // Get an amount of random numbers between 
  // 1 and the max number of dice sides
  function getNewRandomNumbers() {
    if(!tenzi) {
      const diceSides = 6;
      setTimerOn(true)
      setNumberOfRolls(prevNumberOfRolls => prevNumberOfRolls + 1)
      setRandomDiceObj(prevRandomDice => {
        return prevRandomDice.map(diceObj => {
          return diceObj.held === false ? 
          {...diceObj, value: Math.ceil(Math.random() * diceSides)} : {...diceObj}
        })
      })
    } else {
      setTimerOn(false)
      setNumberOfRolls(0)
      setRandomDiceObj(allNewValue)
      setTenzi(false)
    }
  }

  // Change dice held property
  function holdDice(id) {
    if(!tenzi) {
      setRandomDiceObj(prevDiceObj => {
        return prevDiceObj.map(diceObj => {
          return diceObj.id === id ? {...diceObj, held: !diceObj.held} : diceObj
        })
      })
    }
  }

  // Map the numbers array from state to
  // Die elements
  const dieElements = randomDiceObj.map(diceObj => {
    return <Die key={diceObj.id} id={diceObj.id} value={diceObj.value} handleClick={holdDice} held={diceObj.held}/>
  })

  return (
    <div className="App">
      <h1 className="App--title">Tenzi</h1>
      <p className="App--description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      
      <div className="dieContainer">
        {dieElements}
      </div>
      {tenzi && <p>Congratulations!</p>}
      <button className="App--button" onClick={getNewRandomNumbers}>{tenzi ? "Reset Game" : "Roll"}</button>
      <div className="App--gameInfo">
        <p>Number of rolls: {numberOfRolls}</p>
        <Stopwatch timerOn={timerOn}/>
        
      </div>
    </div>
  );
}

export default App;
