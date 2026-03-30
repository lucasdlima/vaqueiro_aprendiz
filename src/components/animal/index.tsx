import React from "react";
import './Animal.css'; 

import bodeImg from '../../assets/animals/tile_bode.png';
import vacaImg from '../../assets/animals/tile_vaca.png';
import tatuImg from '../../assets/animals/tile_tatu.png';
import sapoImg from '../../assets/animals/tile_sapo.png';
import cachorroImg from '../../assets/animals/tile_cachorro.png';
import gatoImg from '../../assets/animals/tile_gato.png';
import porcoImg from '../../assets/animals/tile_porco.png';
import patoImg from '../../assets/animals/tile_pato.png';

const animalImages = {
  bode: bodeImg,
  vaca: vacaImg,
  tatu: tatuImg,
  sapo: sapoImg,
  cachorro: cachorroImg,
  gato: gatoImg,
  porco: porcoImg,
  pato: patoImg
};

export type AnimalType = 'bode' | 'vaca' | 'tatu' | 'sapo' | 'cachorro' | 'gato' | 'porco' | 'pato';

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