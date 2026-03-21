import React from "react";
import "./ResultScreen.css";

// Definimos o que o componente vai receber: se o jogador ganhou ou perdeu, 
// e a função que vai ser disparada quando ele clicar no botão.
interface ResultScreenProps {
  status: 'win' | 'lose';
  onRestart: () => void;
}

const ResultScreen = ({ status, onRestart }: ResultScreenProps) => {
  return (
    <div className="result-container">
      <div className={`result-box ${status}`}>
        <h1>{status === 'win' ? '🎉 Parabéns!' : '💀 Fim de Jogo'}</h1>
        <p>
          {status === 'win' 
            ? 'Você acertou todos os animais!' 
            : 'Suas vidas acabaram, tente novamente.'}
        </p>
        <button className="restart-button" onClick={onRestart}>
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;