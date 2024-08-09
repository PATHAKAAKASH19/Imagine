import React, { useEffect, useRef,useState  } from 'react'
import {Stage , Layer, Text} from "react-konva"
import {ArrowLayer, DiamondLayer, EllipseLayer, PenLayer, RectangleLayer, Tools} from "../components/index"


export default function Canvas() {

  const [tool, setTool] = useState("Pen")
 

 
 
 
  const [dragStage, setDragStage] = useState(false)
  const penRef = useRef(null)
  const rectangleRef = useRef(null)
  const arrowRef = useRef(null)
  const ellipseRef = useRef(null)
  const diamondRef = useRef(null)
  const trRef = useRef(null)

 

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


const handleDragMove = () => {
  const stage = stageRef.current;
  
};

const handleWheel = (e) => {
  e.evt.preventDefault();
  const scaleBy = 1.05;
  const stage = stageRef.current;
  const oldScale = stage.scaleX();
  const pointer = stage.getPointerPosition();
  const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });
  stage.position({
    x: pointer.x - (pointer.x - stage.position().x) * (newScale / oldScale),
    y: pointer.y - (pointer.y - stage.position().y) * (newScale / oldScale),
  });
  stage.batchDraw();
};




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
    
    

    >
        <Layer>
          <Text text="Just start Drawing" x={5} y={30} />
        </Layer>
        <Layer id="drawingLayer">
          <PenLayer tool={tool}  ref={{penRef, trRef }} transform={transform} />
          <ArrowLayer  tool={tool} ref={{arrowRef, trRef}} transform={transform} />
          <RectangleLayer tool={tool}  ref={{rectangleRef, trRef}} transform={transform}/>
          <EllipseLayer tool={tool}  ref={{ellipseRef, trRef}} transform={transform}/>
          <DiamondLayer tool={tool}  ref={{diamondRef, trRef}} transform={transform}/>
        </Layer>
    
    {/* <Eraser stageRef={ stageRef}></Eraser> */}

    </Stage>

     <Tools  tool={tool} setTool={setTool} />
 </div>
  )
}
