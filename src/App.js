import './App.css'; 
import { useEffect, useState } from 'react'; 
import  SingleCard  from './components/SingleCard';

const cardsImges = [{ "src": "images/helmet-1.png" , matched: false}, 
                    { "src": "images/potion-1.png" , matched: false}, 
                    { "src": "images/ring-1.png" , matched: false}, 
                    { "src": "images/sword-1.png" , matched: false}, 
                    { "src": "images/scroll-1.png" , matched: false}, 
                    { "src": "images/shield-1.png" , matched: false} ]; 
  
  
function App() { 

  const [cards, setCards] = useState([]); 
  const [turns, setTurns] = useState(0); 
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  const shuffleCards = () => { 
                          const shuffledCards = [...cardsImges, ...cardsImges] 
                          .sort(() => Math.random() - 0.5) 
                          .map((card) => ({ ...card, id: Math.random() }));
                          setChoiceOne(null);
                          setChoiceTwo(null);
                          setCards(shuffledCards); 
                          setTurns(0);
                         } 

      
  const HandleChose = (card) => {
                                choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
                                }

  useEffect(() => {
                    if(choiceOne && choiceTwo){
                      setDisabled(true);
                      if(choiceOne.src === choiceTwo.src){
                        setCards(prevCards => {
                          return prevCards.map(card => {
                            if(card.src === choiceOne.src){
                              return {...card, matched: true}
                            } else {
                              return card;
                            }
                          })
                        })

                        resetTurn();
                    } else {
                      setTimeout(() => resetTurn(), 1000);
                    }
                    }
                  }, [choiceOne, choiceTwo]);  
              
  const resetTurn = () => {
                            setChoiceOne(null);
                            setChoiceTwo(null);
                            setTurns(prevTurns => prevTurns + 1);
                            setDisabled(false);
                          };            
   
 useEffect(() => {
                    shuffleCards();
                  }, []); 

                      console.log("App: ",choiceOne, choiceTwo);
      return ( 
            <div className="App"> 
            <h1>Memory Game</h1> 
            <button onClick={shuffleCards}>Start Game</button> 
            <div className="card-grid">  
              {cards.map((card)=>  
                <div>
                  <SingleCard 
                  key={card.id} 
                  card={card} 
                  handleChose={HandleChose}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                  />
                </div>

              )} 
              </div> 
               <h3>Turns: {turns}</h3>
              </div>); }
                   
                   
                   
export default App;