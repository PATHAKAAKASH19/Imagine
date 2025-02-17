
import React, {useState, useEffect, forwardRef, useRef} from 'react'
import { Group, Line, Transformer } from 'react-konva'

function PenLayer({ tool , transform }, refs) {


  const { trRef, stageRef} = refs
  const [drag , setDrag] = useState(false)
  const [lines, setLines] = useState([])
  const isDrawing = useRef(false);




  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [ tool])


  




  const handlePenDown = (e) => {
     
     
      isDrawing.current = true
      const pos = e.target.getStage().getRelativePointerPosition()
      
      
      setLines([...lines, { points:[pos.x , pos.y] }])
    }

    const handlePenMove = (e) => {
       if(!isDrawing.current){
        return
       }

     
      const pos = e.target.getStage().getRelativePointerPosition();
     
   
     
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([pos.x, pos.y])
      lines.splice( lines.length -1, 1, lastLine)
    
      setLines(lines.concat())
    }


    const handlePenUp = () => {
       isDrawing.current = false
    }



    useEffect(() => {
  
      const stage = stageRef.current
      if(tool === "Pen" && stage){
         
    
    
    
    
        stage.on("mousedown" , handlePenDown)
        stage.on("mousemove" , handlePenMove)
        stage.on("mouseup" , handlePenUp)
        stage.on("touchstart", handlePenDown)
        stage.on("touchmove", handlePenMove)
        stage.on("touchend", handlePenUp)
    
    
    
        return () => {
          stage.off("mousedown" , handlePenDown)
          stage.off("mousemove" , handlePenMove)
          stage.off("mouseup" , handlePenUp)
          stage.off("touchstart", handlePenDown)
          stage.off("touchmove", handlePenMove)
          stage.off("touchend", handlePenUp)
      
        }
      }
    
    } , [tool , isDrawing, lines])
    
   



    useEffect(() => {
    
      const stage = stageRef.current
      if(tool === "Eraser" && stage) {
      
        const handleErase = (e) => {
          
          
        const pos = stage.getRelativePointerPosition()
    
         
        setLines(shapes => shapes.filter((shape) => {
          const line = shape;
          const lineBounds = {
            x: Math.min(...line.points.filter((_, i) => i % 2 === 0)),
            y: Math.min(...line.points.filter((_, i) => i % 2 !== 0)),
            width: Math.max(...line.points.filter((_, i) => i % 2 === 0)) - Math.min(...line.points.filter((_, i) => i % 2 === 0)),
            height: Math.max(...line.points.filter((_, i) => i % 2 !== 0)) - Math.min(...line.points.filter((_, i) => i % 2 !== 0)),
          };


          const intersects =
          (pos.x > lineBounds.x + lineBounds.width ||
            pos.x < lineBounds.x ||
            pos.y > lineBounds.y + lineBounds.height ||
            pos.y < lineBounds.y);

           return intersects;
              
          }))
      }
      
      
        stage.on("mousemove", handleErase)
        stage.on("touchmove", handleErase)
      
        return () => {
          stage.off("mousemove" , handleErase)
           stage.off("touchmove" , handleErase)
        }}
      
      }, [ tool])
   




 
   
  return (
 
    <Group >
       {lines.map((line, index) => {
         
        return (<Line
        
           key={index}
           points={line.points}
           stroke="#f55442"
           strokeWidth={3}
           tension={0.5}
           lineCap="round"
           lineJoin="round"
           draggable={drag}
           onClick={tool==="Drag" ? transform: null}
          
         
         />)
      })}
    
    <Transformer
      anchorStyleFunc={ (anchor)  =>{
          anchor.cornerRadius(10);
        }
      }
       ref={trRef}
       rotateEnabled={true}
       resizeEnabled={true}
       scaleEnabled={true}
       skewEnabled={true}
      />
      </Group>
  )
}

export default forwardRef(PenLayer)
