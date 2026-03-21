import { useState } from 'react'
import './App.css'
// 1. Importe a imagem apontando para o caminho relativo correto
import Board from './board'

function App() {
  return (
    <>
      <header className="App-header">
        <Board />
      </header>
    </>
  )
}

export default App