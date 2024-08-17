import React, { useEffect, useRef,useState  } from 'react'
import {Stage , Layer, Text} from "react-konva"

import { Html } from 'react-konva-utils';
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
     className='container'

    >
        <Layer>
          <Text text="Just start Drawing" x={5} y={30} />
        </Layer>
      
         

        <ImageLayer tool={tool} ref={trRef} transform={transform} ></ImageLayer>
        <Layer id="drawingLayer">
          <PenLayer tool={tool}  ref={{ trRef, stageRef}} transform={transform}  />
          <EllipseLayer tool={tool}  ref={{ trRef, stageRef} } transform={transform} />
          <RectangleLayer tool={tool}  ref={{ trRef, stageRef}} transform={transform} />
          <ArrowLayer  tool={tool} ref={{trRef, stageRef}} transform={transform}  />
          <DiamondLayer tool={tool}  ref={{trRef, stageRef}} transform={transform} />
        </Layer>



        <Layer>
   
        <Html>
           
       
        </Html>
        </Layer>
      
    </Stage>

     

    <button type='button' 
             style={{
              background: "black",
              color:"white",
              position:"absolute",
              top: "90vh",
              left: "2vh"
             }}
            
            >undo</button>


      <button 
            
            type='button'
            style={{
              background: "black",
              color:"white",
              position:"absolute",
              top: "90vh",
              left: "10vh"
            

            }}>redo</button>

    
    <Tools  tool={tool} setTool={setTool} />
   
 </div>
  )
}
