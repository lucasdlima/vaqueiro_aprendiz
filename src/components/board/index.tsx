import React, { useState } from "react";
import './Board.css';

import bgImage from '../../assets/bg_288x208.png';
import Animal, { AnimalType } from "../animal";
import LifeBar from "../lifebar";
import WordInput from "../word-input";
import ResultScreen from "../result-screen"; // 1. Importando o novo componente!

const animalSequence: AnimalType[] = ['bode', 'vaca', 'tatu'];

const Board = () => {
  const [lives, setLives] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(0); 
  
  // 2. Novo estado para controlar a tela atual
  const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');

  const currentAnimal = animalSequence[currentLevel];

  const handleWordComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      if (currentLevel < animalSequence.length - 1) {
        setCurrentLevel(currentLevel + 1);
      } else {
        // 3. Em vez do alert, mudamos o estado para Vitória
        setGameState('win'); 
      }
    } else {
      setLives((vidasAtuais) => {
        const novasVidas = Math.max(0, vidasAtuais - 1);
        if (novasVidas === 0) {
          // 4. Em vez do alert, mudamos o estado para Derrota
          setGameState('lose'); 
        }
        return novasVidas;
      });
    }
  };

  // 5. Função para reiniciar tudo e voltar a jogar
  const restartGame = () => {
    setLives(10);
    setCurrentLevel(0);
    setGameState('playing'); // Esconde a tela de resultado
  };

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário do jogo" className="board-bg" />

      <div className="board-ui">
        
        {/* 6. Se o jogo acabou (win ou lose), mostra o painel. Se não, mostra o jogo! */}
        {gameState !== 'playing' && (
          <ResultScreen status={gameState} onRestart={restartGame} />
        )}

        <div className="top-bar">
          <LifeBar lives={lives} />
        </div>

        <div className="center-stage">
          {/* Esconde o animal se o jogo tiver acabado */}
          {gameState === 'playing' && <Animal type={currentAnimal} />}
        </div>

        <div className="bottom-bar">
          {gameState === 'playing' && (
            <WordInput 
              key={currentAnimal} 
              targetWord={currentAnimal} 
              onComplete={handleWordComplete} 
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default Board;