import React, { useState, useRef } from "react";
import "./WordInput.css";

interface WordInputProps {
  targetWord: string; 
  onSuccess?: () => void; // Dispara quando a palavra inteira estiver certa
  onError?: () => void;   // Dispara cada vez que errar uma letra
}

const WordInput = ({ targetWord, onSuccess, onError }: WordInputProps) => {
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); 
    
    // Verifica se o usuário ADICIONOU uma letra (em vez de usar o backspace para apagar)
    if (value.length > typed.length) {
      // Pega a última letra que ele acabou de digitar
      const addedChar = value[value.length - 1];
      // Pega a letra correta correspondente àquela posição
      const expectedChar = targetWord[value.length - 1];
      
      // Se a letra for errada, dispara o erro na mesma hora!
      if (addedChar !== expectedChar && onError) {
        onError();
      }
    }

    // Atualiza o estado para mostrar a letra na tela (mesmo que seja vermelha)
    if (value.length <= targetWord.length) {
      setTyped(value);
      
      // Se a palavra digitada for perfeitamente igual à palavra alvo, ele passa de fase
      if (value === targetWord && onSuccess) {
        onSuccess();
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