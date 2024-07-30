import { useState } from "react";
import React from "react";


export default function useRectangle() {

    const [rectangles, setRectangles] = useState([])


    const handleRectangleDown = (e, isDrawing) => {
        isDrawing.current = true
        const pos = e.target.getStage().getPointerPosition()
        setRectangles([...rectangles, {x: pos.x, y: pos.y, width: 0 , height: 0 }])
       }
     
      const handleRectangleMove = (e, isDrawing) => {
       if(!isDrawing.current){
         return
       }
     
       const pos = e.target.getStage().getPointerPosition()
       let lastRectangle = rectangles[rectangles.length -1]
       lastRectangle.height = pos.y - lastRectangle.y
       lastRectangle.width = pos.x - lastRectangle.x
     
     
       rectangles.splice(rectangles.length -1 , 1 , lastRectangle)
       setRectangles(rectangles.concat())
     
      }
     
      const handleRectangleUp = (isDrawing) => {
         isDrawing.current = false
      }


      return {
        handleRectangleDown,
        handleRectangleMove,
        handleRectangleUp,
        rectangles,
        setRectangles
      }
}