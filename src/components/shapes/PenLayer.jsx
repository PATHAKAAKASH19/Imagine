
import React, {useState, useEffect, forwardRef} from 'react'
import { Layer, Line, Transformer } from 'react-konva'

function PenLayer({lines, tool, transform}, trRef) {

  const [drag , setDrag] = useState(false)




  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [lines, tool])



 
   
  return (
    <Layer>
     
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
          
           onClick={tool==="Drag" ? transform : null}
         />)

        
       })}


     <Transformer
       ref={trRef}
       rotateEnabled={true}
       resizeEnabled={true}
       scaleEnabled={true}
       skewEnabled={true}
      />
    </Layer>
  )
}

export default forwardRef(PenLayer)
