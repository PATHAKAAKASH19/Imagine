import React from 'react'
import { Layer, Rect } from 'react-konva'

export default function Rectangle({rectangles}) {
   
   
  

  
 



  return (
    <Layer>
       {
           rectangles.map((rectangle , index) => {
               return (
                   <Rect
                     key={index}
                     x={rectangle.x}
                     y={rectangle.y}
                     width={rectangle.width}
                     height={rectangle.height}
                     stroke="blue"
                     strokeWidth={2}
                     fill="pink"
                     draggable={true}
                   />

                 
               )
           })
       }
   </Layer>
  )
}
