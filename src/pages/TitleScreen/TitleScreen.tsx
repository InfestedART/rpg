import './TitleScreen.css'
import Button from '../../components/Button';
import { useNavigate } from "react-router-dom";

type TitleScreenProps = {
}

const TitleScreen = (props: TitleScreenProps) => {

  const navigate = useNavigate();

  const handleNavigation = (destination: string) => {
    navigate(destination)
  }

  return (
    <div className='main-screen'>
      <div className='title-container'>
        <h1>RPG GAME</h1>
      </div>
      <div className='menu-container'>
        <div className="panel">
          <Button onClick={() => handleNavigation('/newChar')}> New Character </Button>
          <Button onClick={() => handleNavigation('/loadChar')}> Load Character </Button>
        </div>
      </div>
    </div>
  )
}

export default TitleScreen