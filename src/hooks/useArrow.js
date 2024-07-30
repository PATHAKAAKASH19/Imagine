import { useState } from "react";

export default function useArrow() {
    const [arrows, setArrows] = useState([])
   
  
   
      
     const handleArrowDown = (e, isDrawing) => {
     
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setArrows([...arrows, { points: [pos.x, pos.y, pos.x, pos.y] }]);
    };
  
   
    const handleArrowMove = (e, isDrawing ) => {
      if (!isDrawing.current) return;
      const pos = e.target.getStage().getPointerPosition();
      const newArrows = [...arrows];
      const lastArrow = newArrows[newArrows.length - 1];
      lastArrow.points = [lastArrow.points[0], lastArrow.points[1], pos.x, pos.y];
      newArrows.splice(newArrows.length - 1, 1, lastArrow);
      setArrows(newArrows);
    };
  
    
    
    const handleArrowUp = (isDrawing) => {
      isDrawing.current = false;
    };


    return {
        handleArrowDown,
        handleArrowMove,
        handleArrowUp,
        arrows,
        setArrows
    }
     
}

