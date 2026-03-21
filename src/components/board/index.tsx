import React, { useState } from "react";
import './Board.css';

import bgImage from '../../assets/bg_288x208.png';
import Animal, { AnimalType } from "../animal";
import LifeBar from "../lifebar";
import WordInput from "../word-input";
import ResultScreen from "../result-screen";

const animalSequence: AnimalType[] = ['bode', 'vaca', 'tatu'];

const Board = () => {
  const [lives, setLives] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(0); 
  const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');

  const currentAnimal = animalSequence[currentLevel];

  // Função 1: Chamada apenas quando a palavra inteira é digitada corretamente
  const handleSuccess = () => {
    if (currentLevel < animalSequence.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setGameState('win'); 
    }
  };

  // Função 2: Chamada IMEDIATAMENTE quando uma letra errada é digitada
  const handleError = () => {
    setLives((vidasAtuais) => {
      const novasVidas = Math.max(0, vidasAtuais - 1);
      
      if (novasVidas === 0) {
        setGameState('lose'); 
      }
      return novasVidas;
    });
  };

  const restartGame = () => {
    setLives(10);
    setCurrentLevel(0);
    setGameState('playing'); 
  };

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário do jogo" className="board-bg" />

      <div className="board-ui">
        
        {gameState !== 'playing' && (
          <ResultScreen status={gameState} onRestart={restartGame} />
        )}

        <div className="top-bar">
          <LifeBar lives={lives} />
        </div>

        <div className="center-stage">
          {gameState === 'playing' && <Animal type={currentAnimal} />}
        </div>

        <div className="bottom-bar">
          {gameState === 'playing' && (
            <WordInput 
              key={currentAnimal} 
              targetWord={currentAnimal} 
              onSuccess={handleSuccess} 
              onError={handleError} 
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default Board;