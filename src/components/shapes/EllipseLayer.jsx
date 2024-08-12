
import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle} from "react";
import { Ellipse, Transformer, Group } from "react-konva";


function EllipseLayer({ tool, transform}, refs) {

 const {ellipseRef, trRef, stageRef} = refs
  const [drag , setDrag] = useState(false)
  const [ellipses, setEllipses] = useState([])
  
  const isDrawing = useRef(false);


  useEffect(() => {
    
    if(tool==="Drag") {
      setDrag(true)
    }else{
      setDrag(false)
    }
  } , [ellipses, tool])



 

  const handleEllipseDown = (e) => {
  
     isDrawing.current = true
     const pos = e.target.getStage().getRelativePointerPosition()
   
     setEllipses([...ellipses, { x:pos.x, y:pos.y, radiusX : 0, radiusY : 0}])
  }


  const handleEllipseMove =  (e) => {
     if(!isDrawing.current) return
    
     const pos = e.target.getStage().getRelativePointerPosition()
    
     const lastEllipse = ellipses[ellipses.length - 1]
     lastEllipse.radiusY =Math.abs(lastEllipse.y- pos.y  )
     
     lastEllipse.radiusX =Math.abs(lastEllipse.x- pos.x) 
     ellipses.splice(ellipses.length -1 , 1 , lastEllipse)
     setEllipses(ellipses.concat())
    }

  const handleEllipseUp =  () => {
    isDrawing.current = false
  }


useImperativeHandle(ellipseRef,() => ({

  
    handleEllipseDown,
    handleEllipseMove,
    handleEllipseUp
  

}))
  


useEffect(() => {
  

  if(tool === "Eraser" && stageRef.current) {
    
    const stage = stageRef.current

    const handleErase = (e) => {
    
    const pos = e.target.getStage().getRelativePointerPosition()

     
    setEllipses(shapes => shapes.filter((shape) => {
      const ellipse = shape;
      const dx = pos.x - ellipse.x;
      const dy = pos.y - ellipse.y;
      return (Math.sqrt(dx * dx + dy * dy) > ellipse.radiusX)
    }
    
    ))
   }
  
  
    stage.on("mousemove", handleErase)
  
    return () => {
      stage.off("mousemove" , handleErase)
    }}
  
  }, [ tool])
    







  return (
    <Group>
      {   ellipses.map((ellipse, index) => {
        return (
          <Ellipse

            key={index}
            x={ellipse.x}
            y={ellipse.y}
            radiusX={ellipse.radiusX}
            radiusY={ellipse.radiusY}
            fill="skyblue"
            stroke="black"
            strokeWidth={2}
            draggable={drag}
            onClick={tool==="Drag" ? transform: null}
           
          />
        );
      })}

      <Transformer
       anchorStyleFunc={ (anchor)  => {
                   anchor.cornerRadius(10);}
                  }
       ref={trRef}
       rotateEnabled={true}
       resizeEnabled={true}
       scaleEnabled={true}
       skewEnabled={true}
      />
    </Group>
  );

}



export default forwardRef(EllipseLayer)