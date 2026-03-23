import React from "react";
import "./Keyboard.css";
// 1. Importe o novo componente de mãos
import HandsGuide from "../hands-guide"; 

interface KeyboardProps {
  nextChar?: string; // A letra que precisa ser digitada agora
}

// Mapa do teclado (QWERTY/ABNT2 simplificado)
const rows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

// Mapa indicando qual dedo usar para cada tecla (MANTIDO)
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

const Keyboard = ({ nextChar }: KeyboardProps) => {
  // SEGURANÇA: Garante que a letra sempre seja minúscula
  const safeChar = nextChar ? nextChar.toLowerCase() : '';

  // 2. CÁLCULO MESTRE: Descobre qual é o ID do dedo que deve ser destacado nas mãos
  const activeFingerId = safeChar ? fingerMap[safeChar] : undefined;

  return (
    <div className="keyboard-container">
      
      {/* Renderiza as teclas do teclado (MANTIDO) */}
      <div className="keyboard-layout">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={`keyboard-row row-${rowIndex}`}>
            {row.map((key) => {
              const isTarget = key === safeChar;
              
              return (
                <div 
                  key={key} 
                  // Mantivemos a classe 'target' para destacar a tecla alvo
                  className={`key ${isTarget ? 'target' : ''}`}
                >
                  {key}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 3. Renderizamos o guia de mãos ABAIXO do teclado, passando o dedo ativo! */}
      <HandsGuide activeFingerId={activeFingerId} />
      
    </div>
  );
};

export default Keyboard;