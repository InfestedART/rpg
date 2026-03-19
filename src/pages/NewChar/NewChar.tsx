import './NewChar.css'
import CharacterForm from './CharacterForm'

const NewChar = () => {
  return (
    <div className='newchar'>

      <header className='page-header'>
        <h1 className='page-title'> CHARACTER CREATION </h1>
      </header>

      <div className='newchar-container'>
        <aside className='newchar-panel left'>
          <h2>STATS</h2>
          <CharacterForm />
        </aside>
        <section className='newchar-panel center'>
          <h2>PREVIEW</h2>
        </section>
        <aside className='newchar-panel rigth'>
          <h2>SUMMARY</h2>
        </aside>
      </div>

    </div>
  )
}

export default NewChar