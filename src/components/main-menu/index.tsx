import React from "react";
import "./MainMenu.css";
import bgImage from '../../assets/bg_288x208.png';
import borda from '../../assets/borda.png';
import { playSound } from "../../utils/audio";

interface MainMenuProps {
  onSelectMode: (mode: 'copia' | 'ditado' | 'tutorial') => void;
}

const MainMenu = ({ onSelectMode }: MainMenuProps) => {
  
  const handleSelect = (mode: 'copia' | 'ditado' | 'tutorial') => {
    playSound('hit'); 
    onSelectMode(mode);
  };

  return (
    <div className="board-container">
      <img src={bgImage} alt="Cenário de fundo" className="board-bg" />
      <img src={borda} alt="Borda decorativa" className="board-border" />

      <div className="menu-ui">
        
        <div className="menu-header">
          <h1 className="menu-title">O Vaqueiro<br/>Aprendiz!</h1>
          
          {/* NOVO: Botão de tutorial no lugar do subtítulo! */}
          <button 
            className="tutorial-header-btn" 
            onClick={() => handleSelect('tutorial')}
          >
            📖 Como Jogar
          </button>
        </div>

        <div className="menu-buttons">
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