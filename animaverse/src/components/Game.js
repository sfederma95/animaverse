import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../users/UserContext';
import axios from 'axios'
import Card from './Card'
import AnimalsApi from '../api'

const BASE_URL = 'https://deckofcardsapi.com/api'

function Game(){
    const [deckId, setDeckId] = useState(null)
    const [cardArr1,setCardArr1] = useState([])
    const [cardArr2,setCardArr2] = useState([])
    const [game,setGame] = useState(null)
    const [isVis, setIsVis] = useState(false)
    // const {currentUser} = useContext(UserContext);
    async function getDeckId(){
        let res = await axios.get(`${BASE_URL}/deck/new/shuffle/?cards=1D,1S,1C,1H,2D,2S,2C,2H,3D,3S,3C,3H,4D,4S,4C,4H,5D,5S,5C,5H,6D,6S,6C,6H,7D,7S,7C,7H,8D,8S,8C,8H,9D,9S,9C,9H,0D,0S,0C,0H`)
        console.log('got deck id')
        let deckId = res.data.deck_id
        setDeckId(deckId)
        return deckId;
    }
    async function setUpCards(deckId){
        try{
            let res = await axios.get(`${BASE_URL}/deck/${deckId}/draw/?count=2`)
            setCardArr1(res.data.cards)
            let res2 = await axios.get(`${BASE_URL}/deck/${deckId}/draw/?count=2`)
            setCardArr2(res2.data.cards)
            await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
            setIsVis(true);
            console.log('setup card ran')
        } catch(e){
            alert("Let's try that one again.")
            window.location.reload();
        }
    }
    useEffect(function(){
        async function loadGame(){
            let initialDeckId = await getDeckId();
            setUpCards(initialDeckId)
        }
        loadGame();
    },[])
    async function checkWin(e){
        let player1Total = cardArr1.reduce((acc,val) => (+acc.value)+(+val.value) )
        let player2Total = cardArr2.reduce((acc,val) => (+acc.value)+(+val.value) )
        if (e.target.innerHTML==="More") {
            if(player1Total == player2Total){
                alert("Your hands are equal! Click 'New Game' to try again.")
            }
            else if(player1Total < player2Total) {
                alert('You lose!')
                newGame()
            } 
            else {
                alert('You win!')
                // await AnimalsApi.addGold(currentUser.usr_id,25)
                newGame()
            }
        }
        if (e.target.innerHTML==="Less") {
            if(player1Total == player2Total){
                alert("How about that, your hands are equal! Click 'New Game' to try again.")
            }
            else if(player1Total > player2Total) {
                alert('You lose!')
                newGame()
            }
            else {
                alert('You win!')
                // await AnimalsApi.addGold(currentUser.usr_id,25)
                newGame()
            }
        } 
    }
    async function newGame(){
        setGame(null)
        setCardArr1([])
        setCardArr2([])
        setUpCards(deckId)
    }
    async function showGame(){
        let player1 = cardArr1.map(c=>{
            return <Card image={c.image} code={c.code} />
        })
        let player2 = cardArr2.map(c=>{
            return <Card image={c.image} code={c.code} />
        })
        let viewGame = (
            <div>
                <div>
                    <p>Your hand:</p>
                    {player1}
                </div>
                <div>
                    <p>The total of my cards compared to my opponent's is:</p>
                    <button onClick={checkWin}>More</button>
                    <button onClick={checkWin}>Less</button>
                </div>
                <div>
                    <p>Opponent:</p>
                    {player2}
                </div>
                <button onClick={newGame}>New Game</button>
            </div>
            )
        setGame(viewGame)
        setIsVis(false)
    }
    return(
        <div>
            <h1>Mini-game</h1>
            <p>Win the game to earn coins! Don't worry, there's no penalty for losing.</p>
            {isVis ? <button onClick={showGame}>Start Game!</button> : null}
            {game}
        </div>
    )
}

export default Game;