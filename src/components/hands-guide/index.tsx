import React from "react";
import "./HandsGuide.css";

// IMPORTANTE: Atualize aqui com os nomes das suas NOVAS imagens das mãos inteiras
import handLeft from "../../assets/hands/hand_esq.png"; 
import handRight from "../../assets/hands/hand_dir.png";

interface HandsGuideProps {
  activeFingerId?: string; // Ex: 'pinky-l', 'index-r'
}

const HandsGuide = ({ activeFingerId }: HandsGuideProps) => {
  // Verifica de qual mão é o dedo atual
  const isLeftHand = activeFingerId?.endsWith('-l');
  const isRightHand = activeFingerId?.endsWith('-r');

  return (
    <div className="hands-guide-container">
      
      {/* Mão Esquerda */}
      <div className="hand-wrapper left">
        <img src={handLeft} alt="Mão Esquerda" className="hand-image" />
        {/* Renderiza o ponto brilhante apenas se o dedo ativo for desta mão */}
        {isLeftHand && (
          <div className={`finger-dot pos-${activeFingerId}`}></div>
        )}
      </div>

      {/* Mão Direita */}
      <div className="hand-wrapper right">
        <img src={handRight} alt="Mão Direita" className="hand-image" />
        {/* Renderiza o ponto brilhante apenas se o dedo ativo for desta mão */}
        {isRightHand && (
          <div className={`finger-dot pos-${activeFingerId}`}></div>
        )}
      </div>

    </div>
  );
};

export default HandsGuide;