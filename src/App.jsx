import { useState } from 'react'
import './App.css'
import Tiquetes from './Componentes/Tiquetes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Tiquetes/>
    </>
  )
}

export default App
