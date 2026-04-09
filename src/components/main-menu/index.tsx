import React from "react";
import "./MainMenu.css";
import bgImage from '../../assets/bg_288x208.png';
import borda from '../../assets/borda.png';
import { playSound } from "../../utils/audio";

interface MainMenuProps {
  onSelectMode: (mode: 'copia' | 'ditado') => void;
}

const MainMenu = ({ onSelectMode }: MainMenuProps) => {
  
  const handleSelect = (mode: 'copia' | 'ditado') => {
    playSound('hit'); // Toca o som agradável ao clicar
    onSelectMode(mode);
  };

  return (
    <div className="board-container">
      {/* O mesmo fundo do jogo */}
      <img src={bgImage} alt="Cenário de fundo" className="board-bg" />
      <img src={borda} alt="Borda decorativa" className="board-border" />

      <div className="menu-ui">
        <div className="menu-header">
          <h1 className="menu-title">O Vaqueiro<br/>Aprendiz!</h1>
          <p className="menu-subtitle">Escolha como quer jogar:</p>
        </div>

        <div className="menu-buttons">
          {/* Botão da Fase Cópia */}
          <button 
            className="menu-btn btn-copia" 
            onClick={() => handleSelect('copia')}
          >
            <span className="btn-icon">👀 ⌨️</span>
            <span className="btn-text">
              <strong>Fase 1: Cópia</strong>
              <small>Olhar e Digitar</small>
            </span>
          </button>

          {/* Botão da Fase Ditado */}
          <button 
            className="menu-btn btn-ditado" 
            onClick={() => handleSelect('ditado')}
          >
            <span className="btn-icon">🎧 ⌨️</span>
            <span className="btn-text">
              <strong>Fase 2: Ditado</strong>
              <small>Ouvir e Digitar</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;