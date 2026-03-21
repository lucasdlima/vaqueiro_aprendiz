import React from "react";
import "./LifeBar.css";
import lifeBar1 from '../../assets/lifebar/life_bar1.png'; 
import lifeBar2 from '../../assets/lifebar/life_bar2.png'; 
import lifeBar3 from '../../assets/lifebar/life_bar3.png';
import lifeBar4 from '../../assets/lifebar/life_bar4.png';
import lifeBar5 from '../../assets/lifebar/life_bar5.png';
import lifeBar6 from '../../assets/lifebar/life_bar6.png';
import lifeBar7 from '../../assets/lifebar/life_bar7.png';
import lifeBar8 from '../../assets/lifebar/life_bar8.png';
import lifeBar9 from '../../assets/lifebar/life_bar9.png';
import lifeBar10 from '../../assets/lifebar/life_bar10.png'; 
import lifeBar11 from '../../assets/lifebar/life_bar11.png'; 

const lifeImages = [
  lifeBar1, 
  lifeBar2, 
  lifeBar3,
  lifeBar4,
  lifeBar5,
  lifeBar6,
  lifeBar7,
  lifeBar8,
  lifeBar9, 
  lifeBar10,
  lifeBar11
];

interface LifeBarProps {
  lives: number; // Vai receber um número de 0 a 10
}

const LifeBar = ({ lives }: LifeBarProps) => {
  const currentLife = Math.max(0, Math.min(10, lives));

  return (
    <div className="lifebar-container">
      {/*quantidade de vidas para puxar a imagem certa do Array */}
      <img src={lifeImages[currentLife]} alt={`Vidas restantes: ${currentLife}`} className="lifebar-image" />
    </div>
  );
}

export default LifeBar;