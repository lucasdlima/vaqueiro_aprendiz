import { useState } from 'react'
import './App.css'

// Importações dos seus componentes
import Board from './board' 
import MainMenu from './main-menu' 
import Tutorial from './tutorial' // <--- 1. Nova importação do Tutorial adicionada

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu')

  return (
    <>
      <header className="App-header">
        
        {/* O MENU PRINCIPAL */}
        {currentScreen === 'menu' && (
          <MainMenu onSelectMode={(mode) => setCurrentScreen(mode)} />
        )}

        {/* FASE 1: Cópia */}
        {currentScreen === 'copia' && (
          <Board mode="copia" onBackToMenu={() => setCurrentScreen('menu')} />
        )}

        {/* FASE 2: Ditado */}
        {currentScreen === 'ditado' && (
          <Board mode="ditado" onBackToMenu={() => setCurrentScreen('menu')} />
        )}

        {/* TELA DE INSTRUÇÕES (NOVO) */}
        {currentScreen === 'tutorial' && (
           // <--- 2. Renderiza o tutorial e permite voltar ao menu
          <Tutorial onBackToMenu={() => setCurrentScreen('menu')} />
        )}

      </header>
    </>
  )
}

export default App