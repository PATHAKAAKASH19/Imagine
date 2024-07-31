
import React, {useState , useEffect, forwardRef, useImperativeHandle, useRef} from 'react'
import { Group, Rect, Transformer } from 'react-konva'
import DiamondLayer from './DiamondLayer'

function RectangleLayer({ tool, transform}, refs) {

  const {rectangleRef, trRef} = refs
  const [rectangles, setRectangles] = useState([])
  const [drag , setDrag] = useState(false)
  
  const isDrawing = useRef(false);
 

  useEffect(() => {
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [rectangles, tool])


  

 


  const handleRectangleDown = (e) => {
        isDrawing.current = true
        const pos = e.target.getStage().getPointerPosition()
        setRectangles([...rectangles, {x: pos.x, y: pos.y, width: 0 , height: 0 }])
    }
     
  const handleRectangleMove = (e) => {
       if(!isDrawing.current){
         return
       }
     
       const pos = e.target.getStage().getPointerPosition()
       let lastRectangle = rectangles[rectangles.length -1]
       lastRectangle.height = pos.y - lastRectangle.y
       lastRectangle.width = pos.x - lastRectangle.x
     
       rectangles.splice(rectangles.length -1 , 1 , lastRectangle)
       setRectangles(rectangles.concat())
    }
     
  const handleRectangleUp = () => {
         isDrawing.current = false
    }


  useImperativeHandle(rectangleRef, () => ({
      
        handleRectangleDown,
        handleRectangleMove,
        handleRectangleUp
      
    }))


 return (
  
  <Group>
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
                       onClick={tool==="Drag" ? transform: null}
                      />
              ) }))}

       <Transformer
         anchorStyleFunc={ (anchor)  =>{
                anchor.cornerRadius(10);
              }
            }
         ref={trRef}
         rotateEnabled={true}
         resizeEnabled={true}
         scaleEnabled={true}
         skewEnabled={true}
      />
      </Group>
      )
  }
   

  export default forwardRef(RectangleLayer)
  




