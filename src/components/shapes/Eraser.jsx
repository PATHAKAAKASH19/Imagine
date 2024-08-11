import React, { forwardRef, useState, useImperativeHandle, useRef } from 'react'
import { Circle, Layer } from 'react-konva'

export default function Eraser({eraser, setEraser}) {

  
 


  

  

  return (
    <Layer>
        <Circle
         x={eraser.x}
         y={eraser.y}
         radius={eraser.radius}
         fill="red"
         stroke="Black"
         draggable={true}
         onDragMove={(e) => {
           setEraser(prev => ({
             ...prev,
               x : e.currentTarget.x(),
               y : e.currentTarget.y()
           }))
         }}
        ></Circle>
    </Layer>
  )
}


