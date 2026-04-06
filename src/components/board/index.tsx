import React, { useState } from "react";
import './Board.css';

import bgImage from '../../assets/bg_288x208.png';
import borda from '../../assets/borda.png';
import Animal, { AnimalType } from "../animal";
import LifeBar from "../lifebar";
import WordInput from "../word-input";
import ResultScreen from "../result-screen";
import { playSound } from "../../utils/audio";

// 1. Lista com TODOS os animais 
const ALL_ANIMALS: AnimalType[] = [
  'bode', 'cachorro', 'gato', 'pato', 
  'porco', 'sapo', 'tatu', 'vaca'
];

// 2. Número de animais por partida
const ANIMALS_PER_GAME = 5;

// Função auxiliar que embaralha a lista e pega a quantidade desejada
const getRandomAnimals = (count: number): AnimalType[] => {
  // Cria uma cópia da lista e embaralha os itens aleatoriamente
  const shuffled = [...ALL_ANIMALS].sort(() => 0.5 - Math.random());
  // Corta a lista para ter apenas a quantidade que definimos no count
  return shuffled.slice(0, count);
};

const Board = () => {
  const [lives, setLives] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(0); 
  const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');
  
  // O getRandomAnimals é chamado na inicialização para sortear a primeira partida.
  const [animalSequence, setAnimalSequence] = useState<AnimalType[]>(() => getRandomAnimals(ANIMALS_PER_GAME));

  const currentAnimal = animalSequence[currentLevel];

  // Chamada apenas quando a palavra inteira é digitada corretamente
  const handleSuccess = () => {
    if (currentLevel < animalSequence.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      playSound('win');
      setGameState('win'); 
    }
  };

  // Chamada IMEDIATAMENTE quando uma palavra errada é finalizada
  const handleError = () => {
    setLives((vidasAtuais) => {
      const novasVidas = Math.max(0, vidasAtuais - 1);
      
      if (novasVidas === 0) {
        playSound('lose');
        setGameState('lose'); 
      }
      return novasVidas;
    });
  };

  const restartGame = () => {
    setLives(10);
    setCurrentLevel(0);
    // 4. Sorteia uma nova para cada partida.
    setAnimalSequence(getRandomAnimals(ANIMALS_PER_GAME));
    setGameState('playing'); 
  };

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário do jogo" className="board-bg" />
      
      <img src={borda} alt="Borda decorativa" className="board-border" /> 

      <div className="board-ui">
        
        {gameState !== 'playing' && (
          <ResultScreen 
            status={gameState} 
            onRestart={restartGame} 
            lives={lives}
          />
        )}

        <div className="top-bar">
          <LifeBar lives={lives} />
        </div>

        <div className="center-stage">
          {gameState === 'playing' && currentAnimal && <Animal type={currentAnimal} />}
        </div>

        <div className="bottom-bar">
          {gameState === 'playing' && currentAnimal && (
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