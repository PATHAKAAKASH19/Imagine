import React, { useEffect, useRef,useState  } from 'react'
import {Stage , Layer, Text} from "react-konva"
import {ArrowLayer, DiamondLayer, EllipseLayer, ImageLayer, PenLayer, RectangleLayer, Tools} from "../components/index"


export default function Canvas() {

  const [tool, setTool] = useState("Pen")
  const [dragStage, setDragStage] = useState(false)

  const penRef = useRef(null)
  const rectangleRef = useRef(null)
  const arrowRef = useRef(null)
  const ellipseRef = useRef(null)
  const diamondRef = useRef(null)
  const trRef = useRef(null)
  const stageRef = useRef(null)
 
 
 

  const handleDown = (e) => {

   if(tool === "Pen" ){
     penRef.current?.handlePenDown(e)
   }else if(tool === "Rectangle" ) {
     rectangleRef.current?.handleRectangleDown(e)
   }else if(tool === "Arrow" ){
    arrowRef.current?.handleArrowDown(e)
   }else if (tool === "Ellipse" ){
    ellipseRef.current?.handleEllipseDown(e)
   }else if (tool === "Diamond" ) {
    diamondRef.current?.handleDiamondDown(e)
   }
   
  
  }
  
 
 const handleMove = (e) => {
  if(tool === "Pen"){
    penRef.current?.handlePenMove(e)
  }else if(tool === "Rectangle") {
    rectangleRef.current?.handleRectangleMove(e)
  }else if(tool === "Arrow"){
   arrowRef.current?.handleArrowMove(e)
  }else if(tool === "Ellipse"){
    ellipseRef.current?.handleEllipseMove(e)
  }else if (tool === "Diamond"){
    diamondRef.current?.handleDiamondMove(e )
  }
 }

 
 
 const handleUp = () => {
  
  if(tool === "Pen"){
    penRef.current?.handlePenUp()
  }else if(tool === "Rectangle") {
    rectangleRef.current?.handleRectangleUp()
  }else if(tool === "Arrow"){
   arrowRef.current?.handleArrowUp()
  }else if(tool==="Ellipse"){
    ellipseRef.current?.handleEllipseUp()
  }else if(tool === "Diamond"){
    diamondRef.current?.handleDiamondUp()
  }
 }


 

 useEffect(() => {

  if(tool === "StageMove"){
    setDragStage(true)
  }else{
    setDragStage(false)  
  }

}, [tool])





const transform = (e) => {
  const shape = e.target
  trRef.current.nodes([shape])
  trRef.current.getLayer().batchDraw()
 }

 
 const removeTransform = (e) => {

  if (e.target === e.target.getStage()){
    trRef.current.nodes([])
    trRef.current.getLayer().batchDraw()
  }
}










return (
  <div>
    <Stage
   
     width={window.innerWidth } 
     height={window.innerHeight}
     onMouseDown={handleDown}
     onMouseMove={handleMove }
     onMouseUp={handleUp}
     onTouchStart={handleDown}
     onTouchMove={handleMove}
     onTouchEnd={handleUp}
     onClick={removeTransform}
     draggable={dragStage}
     ref={stageRef}
    >
        <Layer>
          <Text text="Just start Drawing" x={5} y={30} />
        </Layer>

        <ImageLayer tool={tool} ref={trRef} transform={transform} ></ImageLayer>
        <Layer id="drawingLayer">
          <PenLayer tool={tool}  ref={{penRef, trRef}} transform={transform} stageRef={stageRef}/>
          <EllipseLayer tool={tool}  ref={{ellipseRef, trRef}} transform={transform} stageRef={stageRef}/>
          <RectangleLayer tool={tool}  ref={{rectangleRef, trRef}} transform={transform}  stageRef={stageRef}/>
          <ArrowLayer  tool={tool} ref={{arrowRef, trRef}} transform={transform}  stageRef={stageRef}/>
          <DiamondLayer tool={tool}  ref={{diamondRef, trRef}} transform={transform} stageRef={stageRef}/>
        </Layer>
    </Stage>

     <Tools  tool={tool} setTool={setTool} />
 </div>
  )
}
