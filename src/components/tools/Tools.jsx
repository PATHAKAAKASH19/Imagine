import React, { forwardRef, useState } from 'react'

export default function Tools({tool, setTool}) {

 
  const handleTool = (e) => {
    console.log(tool)
    setTool(e.target.value)
    console.log(tool)
  }
  const tools = [
    "Pen",
    "Ellipse",
    "Rectangle",
    "Arrow",
    "Diamond"
  ]
  return (
    <div>
      <select  value={tool} onChange={(handleTool)}>
         {tools.map((toolsIten, index) => {
        
           return (
            
            <option value={toolsIten} key={index}  > 
            {toolsIten}
            </option>
           )
         })}
      </select>
    </div>
  )
}


