
import React, {useState, useEffect, forwardRef, useRef, useImperativeHandle} from 'react'
import { Group, Line, Transformer } from 'react-konva'

function PenLayer({ tool , transform }, refs) {


  const {penRef, trRef} = refs
  const [drag , setDrag] = useState(false)
  const [lines, setLines] = useState([])

  const groupRef = useRef(null)
  const isDrawing = useRef(false);




  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [lines, tool])


  




  const handlePenDown = (e) => {
      isDrawing.current = true
      const pos1 = e.target.getStage().getRelativePointerPosition()
      
      
      setLines([...lines, { points:[pos1.x , pos1.y] }])
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

    useImperativeHandle(penRef, () => ({
        handlePenDown,
        handlePenMove,
        handlePenUp,
       
      }
    ))


 
   
  return (
 
    <Group ref={groupRef}>
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
