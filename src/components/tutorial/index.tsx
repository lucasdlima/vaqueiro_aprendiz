import React, { useState, useEffect } from "react";
import "./Tutorial.css";
import bgImage from '../../assets/bg_288x208.png';
import borda from '../../assets/borda.png';
import { playSound, speakWord } from "../../utils/audio";

import Animal from "../animal";
import Keyboard from "../keyboard";
import LifeBar from "../lifebar";
// 1. IMPORTAMOS A TELA DE RESULTADO AQUI
import ResultScreen from "../result-screen"; 

interface TutorialProps {
  onBackToMenu: () => void;
}

const PALAVRA_TUTORIAL = "vaca";

const TUTORIAL_STEPS = [
  {
    text: "Bem-vindo! Vamos digitar o nome desse animal. Pressione a tecla destacada.",
    position: { bottom: "-75px", left: "10%", transform: "translateX(-50%)" },
    tail: "right" 
  },
  {
    text: "Isso! Reparou nas mãozinhas? Elas mostram o dedo certinho que você deve usar. Agora utilize o dedo correto e pressione a tecla A.",
    position: { bottom: "-200px", left: "1%", transform: "translateX(-50%)" },
    tail: "bottom"
  },
  {
    text: "Ih, o bicho virou sombra! Nessa parte o teclado não dá mais a dica. Encontre a próxima letra.",
    position: { top: "50%", right: "calc(50% + 80px)", transform: "translateY(-50%)" },
    tail: "right" 
  },
  {
    text: "Se bater a dúvida de qual é o bicho, é só clicar ali em 🔊.",
    position: { top: "75%", left: "calc(50% + 112px)", transform: "translateY(-50%)" },
    tail: "top" 
  },
  // NOVOS PASSOS PARA EXPLICAR VIDAS E ESTRELAS!
  {
    text: "Prontinho! Essa é sua barra de vidas. Cada erro que você cometer vai tirar uma vida. Se acabar, o jogo termina.",
    position: { top: "8px", right: "35%", left: "auto", transform: "none" },
    tail: "top" // Bico aponta para cima, na direção da LifeBar
  },
  {
    text: "No final, quanto mais vidas sobrarem, mais estrelas ⭐ você ganha! Você está pronto?",
    position: { top: "50%", left: "65%", transform: "translateX(-50%)" },
    tail: "left" // Bico aponta para baixo, na direção das estrelas da tela de vitória
  }
];

const Tutorial = ({ onBackToMenu }: TutorialProps) => {
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // O teclado só funciona até completar a palavra (passo 4)
      if (typedCount >= PALAVRA_TUTORIAL.length) return;
      const expectedChar = PALAVRA_TUTORIAL[typedCount];
      const pressedChar = e.key.toLowerCase();
      if (!/^[a-zç]$/.test(pressedChar)) return;

      if (pressedChar === expectedChar) {
        playSound('hit');
        setTypedCount(prev => prev + 1);
      } else {
        playSound('miss');
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedCount]);

  const nextChar = typedCount < PALAVRA_TUTORIAL.length ? PALAVRA_TUTORIAL[typedCount] : '';
  const currentMode = typedCount < 2 ? 'copia' : 'ditado';
  const isSilhouette = currentMode === 'ditado' && typedCount < PALAVRA_TUTORIAL.length;

  const currentStep = TUTORIAL_STEPS[Math.min(typedCount, TUTORIAL_STEPS.length - 1)];

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário de fundo" className="board-bg" />
      <img src={borda} alt="Borda decorativa" className="board-border" />

      <div className="board-ui">
        <button className="back-to-menu-btn" onClick={onBackToMenu}>
          ⬅️
        </button>

        <div className="top-bar">
          <LifeBar lives={10} />
        </div>

        <div className="center-stage" style={{ position: 'relative' }}>
          
          <div 
            key={typedCount} 
            className={`tutorial-speech-bubble tail-${currentStep.tail}`} 
            style={currentStep.position}
          >
            {currentStep.text}
            
            {/* NOVO: Botão Próximo ao completar a palavra para ver as estrelas */}
            {typedCount === 4 && (
              <button className="btn-finish-tutorial" onClick={() => {
                playSound('hit');
                setTypedCount(5);
              }}>
                Próximo ➡️
              </button>
            )}

            {/* NOVO: Botão final para ir para o menu */}
            {typedCount === 5 && (
              <button className="btn-finish-tutorial" onClick={onBackToMenu}>
                Jogar de Verdade! 🎮
              </button>
            )}
          </div>

          <Animal type="vaca" silhouette={isSilhouette} />

          {currentMode === 'ditado' && typedCount < 4 && (
            <button className="replay-audio-btn" onClick={() => speakWord('vaca')} style={{ right: '110px', left: 'auto' }}>
              🔊 Ouvir
            </button>
          )}
        </div>

        <div className="bottom-bar">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="word-input-container">
              <div className="stylized-word">
                {PALAVRA_TUTORIAL.split('').map((char, index) => {
                  let displayChar = char;
                  if (index >= typedCount && currentMode === 'ditado') displayChar = '_';
                  let className = 'char pending';
                  if (index < typedCount) className = 'char correct';
                  else if (index === typedCount) className = 'char active';
                  return <span key={index} className={className}>{displayChar}</span>;
                })}
              </div>
            </div>

            {typedCount < 4 && (
               <Keyboard nextChar={nextChar} mode={currentMode} />
            )}
          </div>
        </div>

        {/* 2. RENDERIZA A TELA DE RESULTADO NO PASSO 5 */}
        {typedCount === 5 && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100 }}>
            <ResultScreen status="win" lives={10} onRestart={onBackToMenu} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Tutorial;