
import React from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

import Die from "./Die";

export default function App(){

    const[dice,setDice] = React.useState(allNewDice())

    const[tenzies, setTenzies] = React.useState(false)

    React.useEffect(() =>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        
        const allSameValues = dice.every(die => die.value === firstValue)

        // allHeld & allSameValues ? console.log("You won") : console.log("Continue Playing")
        if(allHeld && allSameValues){
            setTenzies(true)
            console.log("You won") 
        }else{
            console.log("Continue Playing")
        }

    },[dice])

    console.log("Set state of die",dice)

   
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
           return die.id === id ? 
           {...die, isHeld : !die.isHeld} : 
           die 
        }))
     }
 

    function allNewDice(){

        const dice = [];

        for(let i = 0; i < 10; i++){
            dice.push(generateNewDie());
        }
        return dice;
    }
    // const newDie = allNewDice()
    // console.log("Die---->",allNewDice())
    const diceArray = dice.map(item => (
        <Die 
            value={item.value} 
            key={item.id} 
            isHeld={item.isHeld}
            holdDice={() =>  holdDice(item.id)}
        />
    ))

    function generateNewDie(){
        return {
            value : Math.ceil(Math.random()*6), 
            isHeld : false,
            holdDice : holdDice, 
            id : nanoid(),
        }
    } 

    function rollDice(dice){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                die : 
                generateNewDie()
           }))
        }else{
            setTenzies(false)
            setDice(allNewDice())
        }
      
    }

    return (
        <main>
            {tenzies && <ReactConfetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceArray}
            </div>

            <div onClick={() => rollDice(dice)} className="roll-btn"><span>{tenzies ? "New Game" : "Roll"}</span></div>
          
        </main>
    )
}
