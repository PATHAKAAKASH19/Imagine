
import React, {useState , useEffect, forwardRef, useRef} from 'react'
import { Group, Rect, Transformer } from 'react-konva'


function RectangleLayer({ tool, transform }, refs) {

  const { trRef, stageRef} = refs
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


 

    useEffect(() => {
  
      const stage = stageRef.current
      if(tool === "Rectangle" && stage){
         
    
    
    
    
        stage.on("mousedown" , handleRectangleDown)
        stage.on("mousemove" , handleRectangleMove)
        stage.on("mouseup" , handleRectangleUp)
        stage.on("touchstart", handleRectangleDown)
        stage.on("touchmove", handleRectangleMove)
        stage.on("touchend", handleRectangleUp)
    
    
    
        return () => {
          stage.off("mousedown" , handleRectangleDown)
          stage.off("mousemove" , handleRectangleMove)
          stage.off("mouseup" , handleRectangleUp)
          stage.off("touchstart", handleRectangleDown)
          stage.off("touchmove", handleRectangleMove)
          stage.off("touchend", handleRectangleUp)
      
        }
      }
    
    } , [tool , isDrawing, rectangles])
    


    useEffect(() => {
    
      const stage = stageRef.current
      if(tool === "Eraser" && stage) {
      
        const handleErase = (e) => {
          
          
        const pos = stage.getRelativePointerPosition()
    
         
        setRectangles(shapes => shapes.filter((shape) => {
          const rect = shape;
               
  
                const intersects = !(
                  pos.x > rect.x + rect.width ||
                  pos.x  < rect.x ||
                  pos.y > rect.y + rect.height ||
                  pos.y  < rect.y
                );
  
                return !intersects;
              }
            ))
        
      
       }
      
      
        stage.on("mousemove", handleErase)
        stage.on("touchmove", handleErase)
      
        return () => {
          stage.off("mousemove" , handleErase)
          stage.off("touchmove" , handleErase)
        }}
      
      }, [ tool])
   





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
  




