import React from "react";
import "./HandsGuide.css";

import handLeft from "../../assets/hands/hand_esq.png"; 
import handRight from "../../assets/hands/hand_dir.png";

interface HandsGuideProps {
  activeFingerId?: string; 
  // 1. RECEBE A COR AQUI
  activeFingerColor?: string; 
}

const HandsGuide = ({ activeFingerId, activeFingerColor }: HandsGuideProps) => {
  const isLeftHand = activeFingerId?.endsWith('-l');
  const isRightHand = activeFingerId?.endsWith('-r');

  // 2. CRIA O ESTILO DA BOLINHA COM A COR EXATA
  const dotStyle = {
    backgroundColor: activeFingerColor,
    boxShadow: `0 0 10px ${activeFingerColor}, 0 0 20px ${activeFingerColor}`
  };

  return (
    <div className="hands-guide-container">
      
      <div className="hand-wrapper left">
        <img src={handLeft} alt="Mão Esquerda" className="hand-image" />
        {isLeftHand && (
          // 3. APLICA A COR NA BOLINHA
          <div className={`finger-dot pos-${activeFingerId}`} style={dotStyle}></div>
        )}
      </div>

      <div className="hand-wrapper right">
        <img src={handRight} alt="Mão Direita" className="hand-image" />
        {isRightHand && (
          // 3. APLICA A COR NA BOLINHA
          <div className={`finger-dot pos-${activeFingerId}`} style={dotStyle}></div>
        )}
      </div>

    </div>
  );
};

export default HandsGuide;