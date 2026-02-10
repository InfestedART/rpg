// import { useState } from 'react'
import './App.css'
import Button from './components/Button';

function App() {

  return (
    <>
      <div className='title-container'>
        <h1>RPG GAME</h1>
      </div>
      <div className="panel">
        <Button onClick={() => console.log('click')}> New Character </Button>
        <Button disabled onClick={() => console.log('click')}> Load Character </Button>
      </div>
    </>
  )
}

export default App
