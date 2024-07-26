import React, { useEffect } from 'react'
import {Stage , Layer, Text} from "react-konva"
import { useRef,useState } from 'react'
import {useEllipse, useArrow, useText, useRectangle, usePen, useDiamond} from "../hooks/index"
import {ArrowLayer, DiamondLayer, EllipseLayer, PenLayer, RectangleLayer,TextLayer,Tools } from "../components/index"


export default function Canvas() {


 const [erase, setEraser] = useState([])


  const [tool, setTool] = useState("Pen")
 
  const stageRef = useRef(null);
  const isDrawing = useRef(false);
  const [dragStage, setDragStage] = useState(false)

  

  const lastCenterRef = useRef(null);
  const lastDistRef = useRef(0);


  const {handleArrowDown, handleArrowMove, handleArrowUp, arrows} = useArrow()
  const   {handleRectangleDown, handleRectangleMove, handleRectangleUp, rectangles} = useRectangle()
  const {handlePenDown, handlePenMove, handlePenUp, lines} = usePen()
  const { handleEllipseDown,handleEllipseMove,handleEllipseUp,ellipses} = useEllipse()
  const {handleClick, texts} = useText(stageRef)
  const {handleDiamondDown, handleDiamondMove, handleDiamondUp, diamonds} = useDiamond()

 const handleDown = (e) => {
   if(tool === "Pen"){
     handlePenDown(e, isDrawing)
   }else if(tool === "Rectangle") {
     handleRectangleDown(e, isDrawing)
   }else if(tool === "Arrow"){
    handleArrowDown(e, isDrawing)
   }else if (tool === "Ellipse"){
    handleEllipseDown(e, isDrawing)
   }else if (tool === "Diamond") {
    handleDiamondDown(e, isDrawing)
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
  }else if (tool === "Diamond"){
    handleDiamondMove(e, isDrawing)
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
  }else if(tool === "Diamond"){
    handleDiamondUp(isDrawing)
  }
 }


 useEffect(() => {

  if(tool === "StageMove"){
    setDragStage(true)
  }else{
    setDragStage(false)  
  }

 }, [tool])


return (
    <div>
    <Stage
     width={window.innerWidth} 
     height={window.innerHeight}
     onMouseDown={handleDown}
     onMouseMove={handleMove}
     onMouseUp={handleUp}
     onClick={handleClick}
     ref={stageRef}
     draggable={dragStage}
    
     >
      
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
        </Layer>
        <PenLayer lines={lines} tool={tool} />
        <ArrowLayer  arrows={arrows} tool={tool} />
        <RectangleLayer rectangles={rectangles} tool={tool}/>
        <EllipseLayer ellipses={ellipses} tool={tool}/>
       <TextLayer texts={texts}  tool={tool} />
       <DiamondLayer diamonds={diamonds} tool={tool}/>
    </Stage>

    <Tools  tool={tool} setTool={setTool} />
     
    </div>
  )
}
