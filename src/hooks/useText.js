import React, { useEffect } from 'react'
import { useState } from 'react' 

export default function useText(stageRef) {

    const [texts, setTexts] = useState([]);
    const [currentText, setCurrentText] = useState('');
    const [cursorPosition, setCursorPosition] = useState(null);
   
  
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (cursorPosition && e.key.length === 1) {
          setTexts(prevTexts => {
            const newTexts = [...prevTexts];
            const newText = {
              text: currentText + e.key,
              x: cursorPosition.x,
              y: cursorPosition.y
            };
            newTexts[newTexts.length - 1] = newText;
            setCurrentText(newText.text);
            return newTexts;
          });
        }
      };
  
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [cursorPosition, currentText]);



    const handleClick = (e) => {
        const stage = stageRef.current.getStage();
        const pointerPosition = stage.getPointerPosition();
        setCursorPosition(pointerPosition);
        setTexts([...texts, { text: '', x: pointerPosition.x, y: pointerPosition.y }]);
        setCurrentText('');
      };


  return {
   handleClick,
    texts,
    stageRef 
  }
}
