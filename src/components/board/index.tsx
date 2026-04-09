import React, { useState } from "react";
import './Board.css';

import bgImage from '../../assets/bg_copia_288x208.png';
import borda from '../../assets/borda.png';
import Animal, { AnimalType } from "../animal";
import LifeBar from "../lifebar";
import WordInput from "../word-input";
import ResultScreen from "../result-screen";
import { playSound } from "../../utils/audio";

// 1. Lista com TODOS os animais disponíveis
const ALL_ANIMALS: AnimalType[] = [
  'bode', 'cachorro', 'gato', 'pato', 
  'porco', 'sapo', 'tatu', 'vaca'
];

// 2. Configuração: Número de animais por partida
const ANIMALS_PER_GAME = 5;

// Função auxiliar que embaralha a lista e pega a quantidade desejada
const getRandomAnimals = (count: number): AnimalType[] => {
  const shuffled = [...ALL_ANIMALS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// 3. Propriedades que o Board recebe (agora vindo do App.jsx)
interface BoardProps {
  onBackToMenu: () => void;
}

const Board = ({ onBackToMenu }: BoardProps) => {
  const [lives, setLives] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(0); 
  const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');
  
  // Sorteia a primeira partida ao carregar o componente
  const [animalSequence, setAnimalSequence] = useState<AnimalType[]>(() => getRandomAnimals(ANIMALS_PER_GAME));

  const currentAnimal = animalSequence[currentLevel];

  // Acertou a palavra inteira
  const handleSuccess = () => {
    if (currentLevel < animalSequence.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      playSound('win');
      setGameState('win'); 
    }
  };

  // Errou e perdeu uma vida
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

  // Reinicia a partida com novos animais
  const restartGame = () => {
    setLives(10);
    setCurrentLevel(0);
    setAnimalSequence(getRandomAnimals(ANIMALS_PER_GAME));
    setGameState('playing'); 
  };

  return (
    <div className="board-container">
      {/* Cenário e Moldura */}
      <img src={bgImage} alt="Cenário do jogo" className="board-bg" />
      <img src={borda} alt="Borda decorativa" className="board-border" /> 

      <div className="board-ui">
        
        {/* Botão de Voltar ao Menu */}
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          ⬅️
        </button>
        
        {/* Tela de Vitória / Derrota */}
        {gameState !== 'playing' && (
          <ResultScreen 
            status={gameState} 
            onRestart={restartGame} 
            lives={lives}
          />
        )}

        {/* Interface do Jogo */}
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