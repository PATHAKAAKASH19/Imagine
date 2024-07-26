
import React, {useState , useEffect} from 'react'
import { Layer, Rect } from 'react-konva'

export default function RectangleLayer({rectangles , tool}) {

 

 
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
                       
                     />
                  
    ) }))}
        
    </Layer>)
        
            
  }
   
  




