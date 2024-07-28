
import React, {useState , useEffect, forwardRef} from 'react'
import { Layer, Rect, Transformer } from 'react-konva'

function RectangleLayer({rectangles , tool, transform}, trRef) {

 

 
  const [drag , setDrag] = useState(false)
 

  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [rectangles, tool])





 return (
 
 <Layer>

       
{(rectangles.map((rectangle , index) => {
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
                       draggable={drag}
                       onClick={tool==="Drag" ? transform : null}
                      
                       
                     />
                  
    ) }))}


        <Transformer
       ref={trRef}
       rotateEnabled={true}
       resizeEnabled={true}
       scaleEnabled={true}
       skewEnabled={true}
      />
        
    </Layer>)
        
           
        

  }
   

  export default forwardRef(RectangleLayer)
  




