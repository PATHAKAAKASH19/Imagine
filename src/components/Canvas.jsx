import React, { useEffect, useRef,useState  } from 'react'
import {Stage , Layer, Text} from "react-konva"
import {ArrowLayer, DiamondLayer, EllipseLayer, ImageLayer, PenLayer, RectangleLayer, Tools} from "../components/index"


export default function Canvas() {

  const [tool, setTool] = useState("Pen")
  const [dragStage, setDragStage] = useState(false)

 
  const trRef = useRef(null)
  const stageRef = useRef(null)
 
 
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
    
  
     onClick={removeTransform}
     draggable={dragStage}
     ref={stageRef}
    >
        <Layer>
          <Text text="Just start Drawing" x={5} y={30} />
        </Layer>

        <ImageLayer tool={tool} ref={trRef} transform={transform} ></ImageLayer>
        <Layer id="drawingLayer">
          <PenLayer tool={tool}  ref={{ trRef, stageRef}} transform={transform} />
          <EllipseLayer tool={tool}  ref={{ trRef, stageRef} } transform={transform} />
          <RectangleLayer tool={tool}  ref={{ trRef, stageRef}} transform={transform}  />
          <ArrowLayer  tool={tool} ref={{trRef, stageRef}} transform={transform}  />
          <DiamondLayer tool={tool}  ref={{trRef, stageRef}} transform={transform} />
        </Layer>
    </Stage>

     <Tools  tool={tool} setTool={setTool} />
 </div>
  )
}
