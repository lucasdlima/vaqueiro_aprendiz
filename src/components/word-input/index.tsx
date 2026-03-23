import React, { useState, useRef } from "react";
import "./WordInput.css";
import Keyboard from "../keyboard"; // Importa o nosso novo teclado simples

interface WordInputProps {
  targetWord: string; 
  onSuccess?: () => void; 
  onError?: () => void;   
}

const WordInput = ({ targetWord, onSuccess, onError }: WordInputProps) => {
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); 
    
    if (value.length <= targetWord.length) {
      setTyped(value);
      
      if (value.length === targetWord.length) {
        if (value === targetWord) {
          if (onSuccess) onSuccess();
        } else {
          if (onError) onError(); 
          setTimeout(() => setTyped(""), 400);
        }
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  // Descobre qual é a próxima letra (se a palavra já estiver completa, passa 'undefined')
  const nextExpectedChar = typed.length < targetWord.length 
    ? targetWord[typed.length] 
    : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div className="word-input-container" onClick={handleClick}>
        <input
          ref={inputRef}
          type="text"
          value={typed}
          onChange={handleChange}
          className="hidden-input"
          autoFocus 
        />

        <div className="stylized-word">
          {targetWord.split("").map((char, index) => {
            let statusClass = "pending"; 

            if (index < typed.length) {
              statusClass = typed[index] === char ? "correct" : "incorrect";
            } else if (index === typed.length) {
              statusClass = "active";
            }

            return (
              <span key={index} className={`char ${statusClass}`}>
                {char}
              </span>
            );
          })}
        </div>
      </div>

      {/* Renderiza o teclado simples, passando a letra alvo */}
      <Keyboard nextChar={nextExpectedChar} />
      
    </div>
  );
};

export default WordInput;