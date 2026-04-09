import { useState } from 'react'
import './App.css'

// Importações dos seus componentes
import Board from './board' // ou o caminho correto para o seu Board
import MainMenu from './main-menu' // Importe o menu que acabamos de criar!

function App() {
  // Criamos um "estado" para saber em qual tela o jogador está.
  // Começamos sempre no 'menu'
  const [currentScreen, setCurrentScreen] = useState('menu')

  return (
    <>
      <header className="App-header">
        
        {/* 1. MOSTRA O MENU PRINCIPAL */}
        {currentScreen === 'menu' && (
          <MainMenu onSelectMode={(mode) => setCurrentScreen(mode)} />
        )}

        {/* 2. MOSTRA A FASE DE CÓPIA (O JOGO ATUAL) */}
        {currentScreen === 'copia' && (
          <Board onBackToMenu={() => setCurrentScreen('menu')} />
        )}

        {/* 3. MOSTRA A TELA DE DITADO (EM BREVE) */}
        {currentScreen === 'ditado' && (
          <div className="board-container" style={{ backgroundColor: '#2e303a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ color: '#fbbf24', fontSize: '32px' }}>Fase 2: Ditado</h1>
            <p style={{ color: 'white', fontSize: '20px', margin: '20px 0' }}>Em desenvolvimento...</p>
            <button 
              onClick={() => setCurrentScreen('menu')}
              style={{ 
                padding: '12px 24px', 
                fontSize: '18px', 
                cursor: 'pointer',
                backgroundColor: '#ef4444',
                color: 'white',
                border: '4px solid #7f1d1d',
                borderRadius: '12px',
                fontWeight: 'bold'
              }}
            >
              ⬅️ Voltar ao Menu
            </button>
          </div>
        )}

      </header>
    </>
  )
}

export default App