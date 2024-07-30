import { useState } from "react";
import React from 'react'

export default function useEllipse() {
  
   const [ellipses, setEllipses] = useState([])

 
   const handleEllipseDown = (e, isDrawing) => {
   
      isDrawing.current = true

      const pos = e.target.getStage().getPointerPosition()
      setEllipses([...ellipses, { x:pos.x, y:pos.y, radiusX : 0, radiusY : 0}])
   }


   const handleEllipseMove =  (e, isDrawing) => {
      if(!isDrawing.current) return
     
      const pos = e.target.getStage().getPointerPosition()
      const lastEllipse = ellipses[ellipses.length - 1]
      lastEllipse.radiusY =Math.abs(lastEllipse.y- pos.y  )
      lastEllipse.radiusX =Math.abs(lastEllipse.x- pos.x) 

      ellipses.splice(ellipses.length -1 , 1 , lastEllipse)
      setEllipses(ellipses.concat())

   }

   const handleEllipseUp =  (isDrawing) => {
     isDrawing.current = false
   }

  return  {  
    handleEllipseDown,
    handleEllipseMove,
    handleEllipseUp,
    ellipses,
    setEllipses
  }
}
