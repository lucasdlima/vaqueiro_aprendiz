import React, { useState, useEffect, useCallback } from "react";
import "./WordInput.css";
import Keyboard from "../keyboard";
import { playSound } from "../../utils/audio";

interface WordInputProps {
  targetWord: string; 
  onSuccess?: () => void; 
  onError?: () => void;   
  mode?: 'copia' | 'ditado'; // NOVO
}

const WordInput = ({ targetWord, onSuccess, onError, mode = 'copia' }: WordInputProps) => {
  const [typed, setTyped] = useState("");
  const expectedWord = targetWord.toLowerCase();

  // Reset do typed sempre que a palavra alvo mudar (passar de fase)
  useEffect(() => {
    setTyped("");
  }, [targetWord]);

  // Função principal que escuta as teclas do teclado real do usuário
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // 1. Ignora teclas de controle (Shift, CapsLock, Enter, Tab, etc)
    if (e.key.length > 1) {
      if (e.key === "Backspace" && typed.length > 0) {
         setTyped(prev => prev.slice(0, -1));
      }
      return; 
    }

    // Se a palavra já atingiu o tamanho máximo, ignora digitação extra
    // Isso evita bugs enquanto o setTimeout de 400ms está rodando
    if (typed.length >= expectedWord.length) return;

    const typedChar = e.key.toLowerCase();
    const currentExpectedChar = expectedWord[typed.length];
    
    // 2. SALVA A LETRA (SEJA CERTA OU ERRADA) PARA APARECER NA TELA
    const newTyped = typed + typedChar;
    setTyped(newTyped);

    // 3. TOCA O ÁUDIO INSTANTANEAMENTE PARA DAR FEEDBACK
    if (typedChar === currentExpectedChar) {
      playSound('hit'); 
    } else {
      playSound('miss');
    }

    // 4. VERIFICA SE A PALAVRA FOI CONCLUÍDA (Sua lógica original restaurada)
    if (newTyped.length === expectedWord.length) {
      if (newTyped === expectedWord) {
        // Digitou tudo certo!
        if (onSuccess) onSuccess();
      } else {
        // Terminou a palavra, mas contém erros (letras vermelhas)
        if (onError) onError(); // Tira uma vida lá no Board
        
        // Aguarda meio segundo para o jogador ver as letras vermelhas e reseta
        setTimeout(() => {
          setTyped("");
        }, 400);
      }
    }
  }, [typed, expectedWord, onSuccess, onError]);

  // Registra e limpa o "espião" de teclado do React
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Descobre qual é a próxima letra para o Teclado/Mãos acenderem
  const nextExpectedChar = typed.length < expectedWord.length 
    ? expectedWord[typed.length] 
    : undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="word-input-container">
        <div className="stylized-word">
          {expectedWord.split("").map((char, index) => {
            let statusClass = "pending"; 

            if (index < typed.length) {
              statusClass = typed[index] === char ? "correct" : "incorrect";
            } else if (index === typed.length) {
              statusClass = "active";
            }

            // 3. A MÁGICA DO DITADO AQUI:
            // Se for ditado e a letra ainda não foi digitada, esconde a letra!
            let displayChar = char;
            if (mode === 'ditado' && (statusClass === 'pending' || statusClass === 'active')) {
              displayChar = '_'; // Mostra um underline no lugar da letra
            }

            return (
              <span key={index} className={`char ${statusClass}`}>
                {displayChar}
              </span>
            );
          })}
        </div>
      </div>

      <Keyboard nextChar={nextExpectedChar} mode={mode} />
    </div>
  );
};

export default WordInput;