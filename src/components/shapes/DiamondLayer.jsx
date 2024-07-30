import React, { useEffect, useState , forwardRef} from 'react'
import { Group, RegularPolygon, Transformer} from "react-konva"


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

   
    <Group >

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
                
               onClick={tool==="Drag" ? transform : null}
              
              /> 
            )

           })
        }


       
           
              
               
              
                <Transformer
                 anchorStyleFunc={ (anchor)  =>{
                  
                  anchor.cornerRadius(10);}}
                ref={trRef}
                rotateEnabled={true}
                resizeEnabled={true}
                scaleEnabled={true}
                skewEnabled={true}
              />
          
       
    </Group>
  )
}


export default forwardRef(DiamondLayer)