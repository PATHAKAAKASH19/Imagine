

import { useState } from "react";

export default function useDiamond() {
    const [diamonds, setDiamonds] = useState([])
  
   
      
     const handleDiamondDown = (e, isDrawing) => {
     
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setArrows([...arrows, { points: [pos.x, pos.y, pos.x, pos.y] }]);
    };
  
   
    const handleDiamondMove = (e, isDrawing ) => {
      if (!isDrawing.current) return;
      const pos = e.target.getStage().getPointerPosition();
      const newArrows = [...arrows];
      const lastArrow = newArrows[newArrows.length - 1];
      lastArrow.points = [lastArrow.points[0], lastArrow.points[1], pos.x, pos.y];
      newArrows.splice(newArrows.length - 1, 1, lastArrow);
      setArrows(newArrows);
    };
  
    
    
    const handleDiamondUp = (isDrawing) => {
      isDrawing.current = false;
    };


    return {
        handleDiamondDown,
        handleDiamondMove,
        handleDiamondUp,
        diamonds
    }
     
}
