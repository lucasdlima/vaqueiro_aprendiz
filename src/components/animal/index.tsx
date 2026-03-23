import React from "react";
import './Animal.css'; 

import bodeImg from '../../assets/animals/tile_bode.png';
import vacaImg from '../../assets/animals/tile_vaca.png';
import tatuImg from '../../assets/animals/tile_tatu.png';
import sapoImg from '../../assets/animals/tile_sapo.png';

const animalImages = {
  bode: bodeImg,
  vaca: vacaImg,
  tatu: tatuImg,
  sapo: sapoImg
};

export type AnimalType = 'bode' | 'vaca' | 'tatu' | 'sapo';

interface AnimalProps {
  type: AnimalType;
}

const Animal = ({ type }: AnimalProps) => {
  const currentImage = animalImages[type];

  return (
    <div className="animal-container">
      <img 
        src={currentImage} 
        alt={`Imagem de um ${type}`} 
        className="pixel-art-image"
      />
    </div>
  )
}

export default Animal;