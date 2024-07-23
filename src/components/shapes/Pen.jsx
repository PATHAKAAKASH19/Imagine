import React from 'react'

import { Layer, Line } from 'react-konva'

export default function Pen({lines}) {


 
   
  return (
    <Layer>
     
       {lines.map((line, index) => {
         
        return (<Line
           key={index}
           points={line.points}
           stroke="#f55442"
           strokeWidth={8}
           tension={0.5}
           lineCap="round"
           lineJoin="round"
           draggable={true}
         />)

        
       })}
    </Layer>
  )
}
