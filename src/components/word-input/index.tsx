import React, { useState, useRef } from "react";
import "./WordInput.css";

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
    
    // Só aceita digitar até o limite de letras da palavra
    if (value.length <= targetWord.length) {
      setTyped(value);
      
      // Verifica se o jogador preencheu todos os espaços da palavra
      if (value.length === targetWord.length) {
        
        if (value === targetWord) {
          // 1. Palavra completa e CORRETA
          if (onSuccess) onSuccess();
        } else {
          // 2. Palavra completa, mas ERRADA
          if (onError) onError(); // Dispara a função para perder 1 vida
          
          // Usa um setTimeout para esperar 400 milissegundos antes de apagar.
          // Assim o jogador tem tempo de ver que a última letra ficou vermelha!
          setTimeout(() => {
            setTyped("");
          }, 400);
        }
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
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
  );
};

export default WordInput;