// 1. Importe seus arquivos de áudio
import hitSound from '../assets/sounds/hit.wav';
import missSound from '../assets/sounds/miss.wav';
import winSound from '../assets/sounds/winx.wav';
import loseSound from '../assets/sounds/lose.wav';

// 2. Pré-carrega os áudios na memória do navegador
const hitAudio = new Audio(hitSound);
const missAudio = new Audio(missSound);
const winAudio = new Audio(winSound);
const loseAudio = new Audio(loseSound);

// Opcional: Abaixe o volume dos sons de digitação para não irritar o jogador
hitAudio.volume = 0.7;
missAudio.volume = 0.5;
winAudio.volume = 0.7;

// 3. Cria a função exportável para tocar os sons
export const playSound = (type: 'hit' | 'miss' | 'win' | 'lose') => {
  let audio: HTMLAudioElement;

  switch (type) {
    case 'hit': audio = hitAudio; break;
    case 'miss': audio = missAudio; break;
    case 'win': audio = winAudio; break;
    case 'lose': audio = loseAudio; break;
    default: return;
  }

  // TRUQUE DE JOGO: "Rebobina" o áudio para o início. 
  // Se o jogador apertar duas teclas em 0.1s, o som toca duas vezes perfeitamente!
  audio.currentTime = 0; 
  
  // O .catch evita que o React dê erro se o navegador bloquear o autoplay
  audio.play().catch((err) => console.log("Áudio bloqueado pelo navegador:", err));
};