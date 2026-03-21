import React from "react";
import './Animal.css'; 

import bodeImg from '../../assets/tile_bode.png';
import vacaImg from '../../assets/tile_vaca.png';
import tatuImg from '../../assets/tile_tatu.png';

const animalImages = {
  bode: bodeImg,
  vaca: vacaImg,
  tatu: tatuImg
};

export type AnimalType = 'bode' | 'vaca' | 'tatu';

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