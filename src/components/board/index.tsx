import React, { useState, useEffect } from "react";
import './Board.css';

import bgImage from '../../assets/bg_copia_288x208.png';
import borda from '../../assets/borda.png';
import Animal, { AnimalType } from "../animal";
import LifeBar from "../lifebar";
import WordInput from "../word-input";
import ResultScreen from "../result-screen";
import { playSound, speakWord } from "../../utils/audio";

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
  mode: 'copia' | 'ditado'; // NOVO: O Board agora sabe qual fase é!
}

const Board = ({ onBackToMenu, mode }: BoardProps) => {
  const [lives, setLives] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(0); 
  const [gameState, setGameState] = useState<'playing' | 'win' | 'lose'>('playing');
  
  // Sorteia a primeira partida ao carregar o componente
  const [animalSequence, setAnimalSequence] = useState<AnimalType[]>(() => getRandomAnimals(ANIMALS_PER_GAME));

  const [isRevealing, setIsRevealing] = useState(false);

  const currentAnimal = animalSequence[currentLevel];

  useEffect(() => {
    if (mode === 'ditado' && gameState === 'playing' && currentAnimal && !isRevealing) {
      // speakWord(currentAnimal);
    }
  }, [currentAnimal, mode, gameState, isRevealing]);

  // Acertou a palavra inteira
  const handleSuccess = () => {
    // Se for modo Ditado, fazemos a pausa dramática de 1.5 segundos
    if (mode === 'ditado') {
      setIsRevealing(true); // Revela a sombra!
      // playSound('win_level'); // Opcional: tocar um sonzinho feliz aqui
      
      setTimeout(() => {
        proceedToNext();
      }, 1500);
      
    } else {
      // Se for Cópia, pula direto como já era
      proceedToNext();
    }
  };

  const proceedToNext = () => {
    setIsRevealing(false); // Reseta a revelação
    if (currentLevel < animalSequence.length - 1) {
      setCurrentLevel(prev => prev + 1);
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

  const isSilhouette = mode === 'ditado' && !isRevealing;

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário do jogo" className="board-bg" />
      <img src={borda} alt="Borda decorativa" className="board-border" /> 

      <div className="board-ui">
        
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          ⬅️
        </button>
        
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

        <div className="center-stage" style={{ position: 'relative' }}>
          
          {gameState === 'playing' && currentAnimal && (
            <Animal type={currentAnimal} silhouette={isSilhouette} />
          )}

          {/* O botão não some mais! Ele apenas fica translúcido e não clicável durante a revelação */}
          {mode === 'ditado' && gameState === 'playing' && (
            <button 
              className="replay-audio-btn" 
              onClick={() => speakWord(currentAnimal)}
              style={{ 
                opacity: isRevealing ? 0.5 : 1, 
                pointerEvents: isRevealing ? 'none' : 'auto' 
              }}
            >
              🔊 Ouvir
            </button>
          )}

        </div>

        <div className="bottom-bar">
          {/* O WordInput NÃO some mais, mantendo a estrutura da tela travada e perfeita! */}
          {gameState === 'playing' && currentAnimal && (
            <WordInput 
              key={currentAnimal} 
              targetWord={currentAnimal} 
              onSuccess={handleSuccess} 
              onError={handleError} 
              mode={mode} 
            />
          )}
        </div>

      </div>
    </div>
  );
}

export default Board;