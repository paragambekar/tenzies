
import React from "react";
import { nanoid } from "nanoid";

import Die from "./Die";

export default function App(){

    const[dice,setDice] = React.useState(allNewDice())

    

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
       setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
            die : 
            generateNewDie()
       }))
    }

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {diceArray}
            </div>

            <div onClick={() => rollDice(dice)} className="roll-btn"><span>Roll</span></div>
          
        </main>
    )
}
