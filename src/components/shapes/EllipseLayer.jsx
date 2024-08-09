
import React, { useEffect, useState, forwardRef, useRef, useImperativeHandle} from "react";
import { Ellipse, Transformer, Group } from "react-konva";


function EllipseLayer({ tool, transform}, refs) {

 const {ellipseRef, trRef} = refs
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
     console.log(pos)
     setEllipses([...ellipses, { x:pos.x, y:pos.y, radiusX : 0, radiusY : 0}])
  }


  const handleEllipseMove =  (e) => {
     if(!isDrawing.current) return
    
     const pos = e.target.getStage().getRelativePointerPosition()
    
     const lastEllipse = ellipses[ellipses.length - 1]
     lastEllipse.radiusY =Math.abs(lastEllipse.y- pos.y  )
     console.log(e.target)
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
       anchorStyleFunc={ (anchor)  =>{
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