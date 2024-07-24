import React, { useEffect } from 'react'
import {Stage , Layer, Text} from "react-konva"
import { useRef,useState } from 'react'
import ArrowShape from './shapes/Arrow'
import useArrow from '../hooks/useArrow'
import Tools from './tools/Tools'
import useRectangle from '../hooks/useRectangle'
import usePen from '../hooks/usePen'
import Rectangle from './shapes/Rectangle'
import Pen from './shapes/Pen'
import useEllipse from '../hooks/useEllipse'

import EllipseShape from './shapes/EllipseShape'


export default function Canvas() {


  const [tool, setTool] = useState("Pen")


  const isDrawing = useRef(false);
 
  const {handleArrowDown, handleArrowMove, handleArrowUp, arrows} = useArrow()
  const   {handleRectangleDown, handleRectangleMove, handleRectangleUp, rectangles} = useRectangle()
  const {handlePenDown, handlePenMove, handlePenUp, lines} = usePen()

  const { handleEllipseDown,handleEllipseMove,handleEllipseUp,ellipses} = useEllipse()
 
 const handleDown = (e) => {
   if(tool === "Pen"){
     handlePenDown(e, isDrawing)
   }else if(tool === "Rectangle") {
     handleRectangleDown(e, isDrawing)
   }else if(tool === "Arrow"){
    handleArrowDown(e, isDrawing)
   }else if (tool === "Ellipse"){
    handleEllipseDown(e, isDrawing)
   }
  
  
  
  }
  
 

 const handleMove = (e) => {
  if(tool === "Pen"){
    handlePenMove(e, isDrawing)
  }else if(tool === "Rectangle") {
    handleRectangleMove(e, isDrawing)
  }else if(tool === "Arrow"){
   handleArrowMove(e, isDrawing)
  }else if(tool === "Ellipse"){
    handleEllipseMove(e , isDrawing)
  }
 }

 const handleUp = () => {
     if(tool === "Pen"){
    handlePenUp(isDrawing)
  }else if(tool === "Rectangle") {
    handleRectangleUp(isDrawing)
  }else if(tool === "Arrow"){
   handleArrowUp(isDrawing)
  }else if(tool==="Ellipse"){
    handleEllipseUp(isDrawing)
  }
 }



  
  return (
    <div>
    <Stage
     width={window.innerWidth} 
     height={window.innerHeight}
     onMouseDown={handleDown}
     onMouseMove={handleMove}
     onMouseUp={handleUp}
     draggable={true}
     >
      
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
        </Layer>
        <Pen lines={lines} ></Pen>
        <ArrowShape   arrows={arrows} />
        <Rectangle rectangles={rectangles}></Rectangle>
        <EllipseShape ellipses={ellipses}></EllipseShape>
    </Stage>

    <Tools  tool={tool} setTool={setTool} ></Tools>
     
    </div>
  )
}
