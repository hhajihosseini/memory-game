import React from 'react'
import './SingleCard.css';

export default function SingleCard({card, flipped, handleChose, disabled}) {

  const HandleClick = () => {
    if(!disabled){
      handleChose(card);
    }
  }   

  return (
       <div className="card"> 
          <div className={flipped ? "flipped" : ""}> 
               <img className='front' src={card.src} alt="Front Card" /> 
               <img 
               className='back' 
               src="images/cover.png" 
               onClick={HandleClick}
               alt="Back Card" 
               /> 
          </div>
      </div>
    
  )
}
