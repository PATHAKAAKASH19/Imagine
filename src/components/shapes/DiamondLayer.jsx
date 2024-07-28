import React, { useEffect, useState , forwardRef} from 'react'
import { Layer, RegularPolygon, Transformer} from "react-konva"


 function DiamondLayer({diamonds , tool, transform}, trRef) {

 const [drag, setDrag] = useState(false)
 
 

 useEffect(() => {


  if(tool === "Drag"){
    setDrag(true)
  }else{
    setDrag(false)
  }
 }, [diamonds, tool])



 
  return (

   
    <Layer >

        {
          
            diamonds.map((diamond, index) => {
              
             return(
              
             
              <RegularPolygon
                key={index}
                x={diamond.x}
                y={diamond.y}
                sides={4}
                radius={diamond.radius}
               fill="pink"
               stroke="black"
               strokeWidth={2}
               draggable={drag}
              
               onClick={transform}
              
              /> 
            )

           })
        }


       
           
              
               
              
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


export default forwardRef(DiamondLayer)