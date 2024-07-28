import React, { useEffect, useRef,useState  } from 'react'
import {Stage , Layer, Text} from "react-konva"
import {useEllipse, useArrow, useRectangle, usePen, useDiamond} from "../hooks/index"
import {ArrowLayer, DiamondLayer, EllipseLayer, PenLayer, RectangleLayer,Tools } from "../components/index"


export default function Canvas() {




  const [tool, setTool] = useState("Pen")
 

  const isDrawing = useRef(false);
  const [dragStage, setDragStage] = useState(false)


  const trRef = useRef(null)
  



  const {handleArrowDown, handleArrowMove, handleArrowUp, arrows} = useArrow()
  const   {handleRectangleDown, handleRectangleMove, handleRectangleUp, rectangles} = useRectangle()
  const {handlePenDown, handlePenMove, handlePenUp, lines} = usePen()
  const { handleEllipseDown,handleEllipseMove,handleEllipseUp,ellipses} = useEllipse()

  const {handleDiamondDown, handleDiamondMove, handleDiamondUp, diamonds} = useDiamond()

 const handleDown = (e) => {
   if(tool === "Pen" ){
     handlePenDown(e, isDrawing)
   }else if(tool === "Rectangle" ) {
     handleRectangleDown(e, isDrawing)
   }else if(tool === "Arrow" ){
    handleArrowDown(e, isDrawing)
   }else if (tool === "Ellipse" ){
    handleEllipseDown(e, isDrawing)
   }else if (tool === "Diamond" ) {
    handleDiamondDown(e, isDrawing)
   }else if (tool === "Eraser"){
     handleEraserDown(e)
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
     width={window.innerWidth} 
     height={window.innerHeight}
     onMouseDown={handleDown}
     onMouseMove={handleMove}
     onMouseUp={handleUp}
   
     onClick={removeTransform}
     
     draggable={dragStage}
    
     >
      
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
        </Layer>
        <PenLayer lines={lines} tool={tool}  transform={transform} ref={trRef}/>
        <ArrowLayer  arrows={arrows} tool={tool}  transform={transform} ref={trRef}/>
        <RectangleLayer rectangles={rectangles} tool={tool}    transform={transform} ref={trRef} />
        <EllipseLayer ellipses={ellipses} tool={tool}  transform={transform} ref={trRef} />
      
       <DiamondLayer diamonds={diamonds} tool={tool}   transform={transform} ref={trRef}/>
    </Stage>

    <Tools  tool={tool} setTool={setTool} />
     
    </div>
  )
}
