import React from "react";
import "./Keyboard.css";
import HandsGuide from "../hands-guide"; 

interface KeyboardProps {
  nextChar?: string; 
}

const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const fingerMap: Record<string, string> = {
  'q': 'pinky-l', 'a': 'pinky-l', 'z': 'pinky-l',
  'w': 'ring-l', 's': 'ring-l', 'x': 'ring-l',
  'e': 'middle-l', 'd': 'middle-l', 'c': 'middle-l',
  'r': 'index-l', 'f': 'index-l', 'v': 'index-l', 't': 'index-l', 'g': 'index-l', 'b': 'index-l',
  'y': 'index-r', 'h': 'index-r', 'n': 'index-r', 'u': 'index-r', 'j': 'index-r', 'm': 'index-r',
  'i': 'middle-r', 'k': 'middle-r',
  'o': 'ring-r', 'l': 'ring-r',
  'p': 'pinky-r'
};

// 1. AS CORES DOS DEDOS
const fingerColorMap: Record<string, string> = {
  'pinky-l': '#ff8a80', 'ring-l': '#ffd180', 'middle-l': '#ffff8d', 'index-l': '#b9f6ca',
  'index-r': '#80d8ff', 'middle-r': '#8c9eff', 'ring-r': '#b388ff', 'pinky-r': '#ea80fc',
};

// 2. CLASSES DE BORDA
const fingerClassMap: Record<string, string> = {
  'pinky-l': 'pinky', 'ring-l': 'ring', 'middle-l': 'middle', 'index-l': 'index',
  'index-r': 'index', 'middle-r': 'middle', 'ring-r': 'ring', 'pinky-r': 'pinky',
};

const Keyboard = ({ nextChar }: KeyboardProps) => {
  const safeChar = nextChar ? nextChar.toLowerCase() : '';

  // 3. CALCULA A COR EXATA DA LETRA ATUAL
  const activeFingerId = safeChar ? fingerMap[safeChar] : undefined;
  const activeFingerColor = activeFingerId ? fingerColorMap[activeFingerId] : undefined;
  const activeFingerClass = activeFingerId ? fingerClassMap[activeFingerId] : '';

  return (
    <div className="keyboard-container">
      <div className="keyboard-layout">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`keyboard-row row-${rowIndex}`}>
            {row.map((key) => {
              const isTarget = key === safeChar;
              
              return (
                <div 
                  key={key} 
                  className={`key ${isTarget ? 'target' : ''} ${isTarget ? activeFingerClass : ''}`}
                  // 4. PINTA A TECLA COM A COR
                  style={isTarget ? { backgroundColor: activeFingerColor } : {}}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 5. ENVIA A COR PARA AS MÃOS */}
      <HandsGuide activeFingerId={activeFingerId} activeFingerColor={activeFingerColor} />
      
    </div>
  );
};

export default Keyboard;