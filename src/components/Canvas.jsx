import React, { useRef, useState } from 'react'
import {Stage, Layer, Text, Line} from "react-konva"

export default function Canvas() {
     
   const [tool, setTool] = useState("pen")
   const [lines, setLines] = useState([])
   const isDrawing = useRef(false)

   const handleMouseDown = (e) => {
      isDrawing.current = true
      const pos = e.target.getStage().getPointerPosition()
      setLines([...lines, { tool, points:[pos.x, pos.y] }])

   }

    const handleMouseMove = (e) => {
       if(!isDrawing.current){
        return
       }

      
       const point = e.target.getStage().getPointerPosition();
       let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y])
      lines.splice( lines.length -1, 1, lastLine)
      setLines(lines.concat())

       
    }

    const handleMouseUp = () => {
       isDrawing.current = false
    }
    
  return (
    <div>
    <Stage
     width={window.innerWidth}
     height={window.innerHeight}
     onmousedown={handleMouseDown}
     onmousemove={handleMouseMove}
     onmouseup = {handleMouseUp}
    >
        <Layer>
        <Text text="Just start drawing" x={5} y={30} />
           {lines.map((line, i) => {
             
            return (<Line
               key={i}
               points={line.points}
               stroke="#f55442"
               strokeWidth={8}
               tension={0.5}
               lineCap="round"
               lineJoin="round"
               globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
             />)

            
           })}
        </Layer>
    </Stage>

    <select
     value={tool}
      onChange={(e) => {
        setTool(e.target.value)
      }}
    >
          <option  value="pen">pen</option>
          <option value="eraser">eraser</option>
    </select>
    
    </div>
  )
}
