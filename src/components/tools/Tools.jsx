import React from 'react'

export default function Tools({tool, setTool}) {

 const handleTool = (e) => {
    setTool(e.target.value)
  }


  const tools = [
    "Pen",
    "Ellipse",
    "Rectangle",
    "Arrow",
    "Diamond",
    "Text",
    "Image",
    "Eraser",
    "Drag",
    "StageMove"
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


