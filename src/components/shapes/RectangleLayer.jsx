
import React, {useState , useEffect, forwardRef, useImperativeHandle, useRef} from 'react'
import { Group, Rect, Transformer } from 'react-konva'


function RectangleLayer({ tool, transform, stageRef}, refs) {

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
        const pos = e.target.getStage().getRelativePointerPosition()
        setRectangles([...rectangles, {x: pos.x, y: pos.y, width: 0 , height: 0 }])
    }
     
  const handleRectangleMove = (e) => {
       if(!isDrawing.current){
         return
       }
     
       const pos = e.target.getStage().getRelativePointerPosition()
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





useEffect(() => {

  const stage = stageRef.current

  if(tool === "Eraser"){

   const handleErase = (e) => {
     const pos = e.target.getStage().getRelativePointerPosition()
     
     setRectangles(shapes => shapes.filter(shape => {

      const rect = shape
      const isIntersecting =
      pos.x > rect.x &&
      pos.x < rect.x + rect.width &&
      pos.y > rect.y &&
      pos.y < rect.y + rect.height;
      return isIntersecting;
    }))
   }




    stage.on("mousemove", handleErase)

    return () => {
      stage.off("mouseover", handleErase)
    }
  }


 
} , [tool])


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
  




