
import React, {useState, useEffect} from 'react'
import { Layer, Line } from 'react-konva'

export default function PenLayer({lines, tool}) {

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
         />)

        
       })}
    </Layer>
  )
}
