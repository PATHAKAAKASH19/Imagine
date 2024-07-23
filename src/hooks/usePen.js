import React from "react";
import { useState } from "react";


export default function usePen() {


    const [lines, setLines] = useState([])


    const handlePenDown = (e, isDrawing) => {
        isDrawing.current = true
        const pos = e.target.getStage().getPointerPosition()
        setLines([...lines, { points:[pos.x, pos.y] }])
  
     }
  
      const handlePenMove = (e, isDrawing) => {
         if(!isDrawing.current){
          return
         }
  
        
         const pos = e.target.getStage().getPointerPosition();
         let lastLine = lines[lines.length - 1];
         lastLine.points = lastLine.points.concat([pos.x, pos.y])
        lines.splice( lines.length -1, 1, lastLine)
        setLines(lines.concat())
  
         
      }
  
      const handlePenUp = (isDrawing) => {
         isDrawing.current = false
      }



      return {
          handlePenDown,
          handlePenMove,
          handlePenUp,
          lines
      }

}