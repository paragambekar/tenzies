
import React from "react";

import Die from "./Die";

export default function App(){

    const[dice,setDice] = React.useState(allNewDice())
    console.log("Set state of die",dice)

    function allNewDice(){

        const dice = [];
        for(let i = 0; i < 10; i++){
            dice.push(Math.ceil(Math.random()*6));
        }
        return dice;
    }
    // const newDie = allNewDice()
    // console.log("Die---->",allNewDice())
        const diceArray = dice.map(item => (
            <Die value={item}/>
        ))

    function rollDice(){
        setDice(allNewDice());
    }

    return (
        <main>
            <div className="die-container">
                {diceArray}
            </div>

            <div onClick={rollDice} className="roll-btn"><span>Roll</span></div>
          
        </main>
    )
}
