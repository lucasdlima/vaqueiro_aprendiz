import React, { useState } from "react";
import './Board.css';

import bgImage from '../../assets/bg_288x208.png';
import Animal, { AnimalType } from "../animal";
import LifeBar from "../lifebar";
import WordInput from "../word-input";

// 1. Definimos a ordem das fases do jogo
const animalSequence: AnimalType[] = ['bode', 'vaca', 'tatu'];

const Board = () => {
  const [lives, setLives] = useState(10);
  
  // 2. Em vez de salvar o nome do animal, salvamos o número da fase atual (começa no 0)
  const [currentLevel, setCurrentLevel] = useState(0); 

  // Puxa o animal correto da lista baseado no nível atual
  const currentAnimal = animalSequence[currentLevel];

  const handleWordComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      // Verifica se ainda existem próximos animais na lista
      if (currentLevel < animalSequence.length - 1) {
        setCurrentLevel(currentLevel + 1); // Passa para o próximo animal
      } else {
        // Se chegou no final da lista, o jogador venceu!
        alert("🎉 Parabéns! Você completou todos os animais!");
        // Aqui você pode reiniciar o jogo voltando o currentLevel para 0, se quiser.
      }
    } else {
      // Errou! Tira 1 vida.
      setLives((vidasAtuais) => {
        const novasVidas = Math.max(0, vidasAtuais - 1);
        
        // Se as vidas chegarem a zero, Game Over!
        if (novasVidas === 0) {
          alert("💀 Fim de Jogo! Suas vidas acabaram.");
        }
        
        return novasVidas;
      });
    }
  };

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário do jogo" className="board-bg" />

      <div className="board-ui">
        
        <div className="top-bar">
          <LifeBar lives={lives} />
        </div>

        <div className="center-stage">
          <Animal type={currentAnimal} />
        </div>

        <div className="bottom-bar">
          {/* 3. O 'key' é essencial! Ele garante que o input zere ao mudar de animal */}
          <WordInput 
            key={currentAnimal} 
            targetWord={currentAnimal} 
            onComplete={handleWordComplete} 
          />
        </div>

      </div>
    </div>
  );
}

export default Board;