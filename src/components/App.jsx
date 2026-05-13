import { useState } from 'react'
import './App.css'

// Importações dos seus componentes
import Board from './board' // ou o caminho correto para o seu Board
import MainMenu from './main-menu' // Importe o menu que acabamos de criar!

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu')

  return (
    <>
      <header className="App-header">
        
        {currentScreen === 'menu' && (
          <MainMenu onSelectMode={(mode) => setCurrentScreen(mode)} />
        )}

        {/* FASE 1: Passamos o mode="copia" */}
        {currentScreen === 'copia' && (
          <Board mode="copia" onBackToMenu={() => setCurrentScreen('menu')} />
        )}

        {/* FASE 2: Passamos o mode="ditado" (Agora usa o mesmo Board!) */}
        {currentScreen === 'ditado' && (
          <Board mode="ditado" onBackToMenu={() => setCurrentScreen('menu')} />
        )}

      </header>
    </>
  )
}

export default App