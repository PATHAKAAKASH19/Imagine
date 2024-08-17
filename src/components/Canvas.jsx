import React, { useEffect, useRef,useState  } from 'react'
import {Stage , Layer, Text} from "react-konva"
import Konva from 'konva';
import { Html } from 'react-konva-utils';
import {ArrowLayer, DiamondLayer, EllipseLayer, ImageLayer, PenLayer, RectangleLayer, Tools} from "../components/index"


export default function Canvas() {

  const [tool, setTool] = useState("Pen")
  const [dragStage, setDragStage] = useState(false)
  const trRef = useRef(null)
  const stageRef = useRef(null)

  const [history, setHistory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)



 

    const saveHistory = () => {

      const stage = stageRef.current
      const stageData = stage.toJSON()
  
  
      
       
        setHistory((prevHistory) => {
          
         const newHistory = prevHistory.slice(0, currentIndex + 1)
         newHistory.push(stageData)
         return newHistory
  
        })
      
       setCurrentIndex(prev => (prev + 1))
    }
  



 const undo = () => {
    
  if(currentIndex>0) {
     const stage = stageRef.current
     const prevIndex = currentIndex - 1
     const previousState = history[prevIndex]
    
   
     setCurrentIndex(prevIndex)
  }
 }
 

 const redo = () => {

  if(currentIndex< history.length - 1 ){
    
    const stage = stageRef.current
    const nextIndex = currentIndex + 1
    const nextState = history[nextIndex]
  
  
 
  

    setCurrentIndex(nextState)
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
     onClick={removeTransform}
     draggable={dragStage}
     ref={stageRef}

    >
        <Layer>
          <Text text="Just start Drawing" x={5} y={30} />
        </Layer>
        <Layer>
          <Html
          
          >

            <Tools  tool={tool} setTool={setTool} />
            <button onClick={undo} type='button' 
             style={{
              background: "black",
              color:"white",
              position:"relative",
              top: "90vh",
              left: "2vh"
             }}
            
            >undo</button>
            <button 
             onClick={redo} 
             type='button'
             style={{
               background: "black",
               color:"white",
               position:"relative",
               top: "90vh",
               left: "4vh"
             

             }}>redo</button>


          </Html>
        </Layer>

        <ImageLayer tool={tool} ref={trRef} transform={transform} ></ImageLayer>
        <Layer id="drawingLayer">
          <PenLayer tool={tool}  ref={{ trRef, stageRef}} transform={transform}  />
          <EllipseLayer tool={tool}  ref={{ trRef, stageRef} } transform={transform} />
          <RectangleLayer tool={tool}  ref={{ trRef, stageRef}} transform={transform} />
          <ArrowLayer  tool={tool} ref={{trRef, stageRef}} transform={transform} saveHistory={saveHistory} />
          <DiamondLayer tool={tool}  ref={{trRef, stageRef}} transform={transform} />
        </Layer>



        <Layer>
   
        <Html>
           
       
        </Html>
        </Layer>
      
    </Stage>

    
   
   
 </div>
  )
}
