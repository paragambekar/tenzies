
export default function Die(props){
        console.log(props)

        const styles = {
            backgroundColor: props.isHeld ? "#59E391" : "white",
        }

    return (
        <div className="die" style={styles} onClick={props.holdDice}> 
            <h2>{props.value}</h2>
        </div>
    )

}