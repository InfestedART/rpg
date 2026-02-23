import './NewChar.css'
import NewCharStats from './NewCharStats'

/* type NewCharProps = {} */

const NewChar = () => {
  return (
    <div className='newchar'>

      <header className='newchar-header'>
        <h1 className='newchar-title'> CHARACTER CREATION </h1>
      </header>

      <div className='newchar-container'>
        <aside className='newchar-panel left'>
          <h2>STATS</h2>
          <NewCharStats />
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