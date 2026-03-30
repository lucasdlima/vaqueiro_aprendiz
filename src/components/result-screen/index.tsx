import React from "react";
import "./ResultScreen.css";

interface ResultScreenProps {
  status: 'win' | 'lose';
  onRestart: () => void;
  lives?: number; // Recebe a quantidade de vidas que sobrou
}

const ResultScreen = ({ status, onRestart, lives = 0 }: ResultScreenProps) => {
  const isWin = status === 'win';

  // Lógica de cálculo das estrelas baseada na sua sugestão
  let stars = 0;
  if (isWin) {
    if (lives === 10) stars = 3;
    else if (lives >= 5) stars = 2;
    else stars = 1;
  }

  // Array auxiliar para desenhar as 3 estrelas
  const starArray = [1, 2, 3]; 

  return (
    <div className="result-overlay">
      <div className="result-modal">
        
        <h2 className={`result-title ${isWin ? 'win-text' : 'lose-text'}`}>
          {isWin ? "Você Venceu!" : "Fim de Jogo"}
        </h2>
        
        <p className="result-message">
          {isWin ? "Parabéns! Você digitou todos os animais." : "Suas vidas acabaram..."}
        </p>

        {/* Renderiza as estrelas apenas se o jogador ganhou */}
        {isWin && (
          <div className="stars-container">
            {starArray.map((starIndex) => (
              <span 
                key={starIndex}
                // Se o índice da estrela for menor ou igual as estrelas ganhas, ela fica preenchida (amarela)
                className={`star ${starIndex <= stars ? 'filled' : 'empty'}`}
                // Adiciona um atraso na animação para elas aparecerem uma por uma (efeito cascata)
                style={{ animationDelay: `${starIndex * 0.2}s` }}
              >
                ★
              </span>
            ))}
          </div>
        )}

        <button className="restart-button" onClick={onRestart}>
          {isWin ? "Jogar Novamente" : "Tentar Novamente"}
        </button>
        
      </div>
    </div>
  );
};

export default ResultScreen;