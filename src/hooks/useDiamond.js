
import React from 'react'
import { useState , useRef} from "react";

export default function useDiamond() {
    const [diamonds, setDiamonds] = useState([])
    
   
      
     const handleDiamondDown = (e, isDrawing,) => {
    
     
      isDrawing.current = true
      const pos = e.target.getStage().getPointerPosition()
      setDiamonds([...diamonds, {x: pos.x, y: pos.y, radius: 0  }])
      
  
    };
  
   
    const handleDiamondMove = (e, isDrawing ) => {
     
      if(!isDrawing.current ){
        return
      }
    
      const pos = e.target.getStage().getPointerPosition()
      let lastDiamond = diamonds[diamonds.length -1]
      
      lastDiamond.radius = Math.sqrt(Math.pow(pos.x - lastDiamond.x , 2) + Math.pow(pos.y - lastDiamond.y, 2))
    
    
      diamonds.splice(diamonds.length -1 , 1 , lastDiamond)
      setDiamonds(diamonds.concat())

   
    };
  
    
    
    const handleDiamondUp = (isDrawing) => {
      isDrawing.current = false;
    };


    return {
        handleDiamondDown,
        handleDiamondMove,
        handleDiamondUp,
        diamonds,
        setDiamonds
    }
     
}
