import React, { forwardRef, useEffect, useState } from 'react'
import { Layer, Text, Transformer } from 'react-konva'

 function TextLayer({tool, transform}, trRef) {
 
  const [texts, setTexts] = useState([])
  const [drag, setDrag] = useState(false)
  const [text, setText] = useState('')
  
  
  useEffect(() => {
   
   tool === "Drag" ? setDrag(true) : setDrag(false)

  }, [tool])

  

  useEffect(() => {

   
   if(tool === "Text") {
    const handleText = (e) => {
     if(e.key){
      setTexts(prev => {return [...prev , {x: pos.x, y: pos.y , }]})
     }
    }

    const stopText = () => [
         console.log("keyup")
    ]

    window.addEventListener("keydown", handleText)
    window.addEventListener("keyup" , stopText)

    return () => {
      window.removeEventListener("keydown", handleText)
      window.removeEventListener("keyup", stopText)
    }}
  }, [tool])
  return (
    <Layer >
          
     { texts.map((text, index) => (
      <Text
       key={index}
       text={text.txt}
       x={text.x}
       y={text.y}
       draggable={drag}
       onClick={ drag ? transform:null}
       
      
      />))}
       
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

export default forwardRef(TextLayer)
