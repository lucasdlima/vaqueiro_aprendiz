import React, { useState, useRef } from "react";
import "./WordInput.css";

interface WordInputProps {
  targetWord: string; // A palavra que o usuário deve digitar (ex: "bode")
  onComplete?: (isCorrect: boolean) => void; 
}

const WordInput = ({ targetWord, onComplete }: WordInputProps) => {
  // Guarda o que o usuário já digitou
  const [typed, setTyped] = useState("");
  
  // Referência para o input invisível
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); // Ignora maiúsculas/minúsculas
    
    // Só permite digitar até o tamanho máximo da palavra
    if (value.length <= targetWord.length) {
      setTyped(value);
      
      // Se digitou a última letra, podemos disparar um evento para o jogo saber
      if (value.length === targetWord.length && onComplete) {
        const isPerfect = value === targetWord;
        onComplete(isPerfect);
      }
    }
  };

  // Se o usuário clicar na área da palavra, foca no input invisível para abrir o teclado
  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="word-input-container" onClick={handleClick}>
      {/* O input real fica escondido, mas é ele que captura o teclado do celular/PC */}
      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        className="hidden-input"
        autoFocus // Já foca automaticamente quando a tela carrega
      />

      {/* Aqui é onde desenhamos a palavra letra por letra */}
      <div className="stylized-word">
        {targetWord.split("").map((char, index) => {
          let statusClass = "pending"; // Padrão: Branca (ainda não chegou nela)

          if (index < typed.length) {
            // Letras que já foram digitadas
            statusClass = typed[index] === char ? "correct" : "incorrect";
          } else if (index === typed.length) {
            // A exata próxima letra a ser digitada
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