import { useEffect, useRef, useState } from "react";
import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti'
import Die from "./components/Die";
import { generateAllNewDice } from "./utils/generateAllNewDice";


function App() {

  const [dice, setDice] = useState(()=>generateAllNewDice());

  const {width,height} = useWindowSize();
  
  let gameWon = dice.every(item=>item.value==dice[0].value && item.isHeld==true);

  const gameWonButton = useRef(null);

  useEffect(()=>{
    if(gameWon){
    console.log("winner winner chicken dinner!!!..");
    gameWonButton.current.focus()
  }
  },[gameWon]);


  function handleRoll() {
    setDice(prev => generateAllNewDice(prev));
  }

  function handleNewGame(){
    setDice(generateAllNewDice());
  }

  function hold(id) {
    let arr = dice.map((item) => {
      return item.id === id ?
        { ...item, isHeld: !item.isHeld } : item;
    });

    setDice(arr);
  }

  const diceElements = dice.map((item) => (
    <Die
      key={item.id}
      hold={() => hold(item.id)}
      style={{ backgroundColor: item.isHeld ? "#59E391" : "#ffffff" }}
      value={item.value}
    />));


  return (

    <main>
      {gameWon && <Confetti width={width} height={height}/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>

      <div className="container">
        {diceElements}
      </div>

      <button  
          className="roll-dice" 
          onClick={gameWon?handleNewGame:handleRoll}
          ref={gameWonButton}
      >
        {gameWon?"New Game": "Roll"}
      </button>

    </main>

  )
}

export default App
