import './TitleScreen.css'
import Button from '../../components/Button';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCharacters } from '@/api/characters';

type TitleScreenProps = {
}

// const TitleScreen = (props: TitleScreenProps) => {
const TitleScreen = () => {
  const navigate = useNavigate();
  const [hasCharacters, setHasCharacters] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await getAllCharacters();
        setHasCharacters(characters.length > 0);
      } catch (error) {
        console.error('Failed to fetch characters:', error);
        setHasCharacters(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleNavigation = (destination: string) => {
    navigate(destination)
  }

  return (
    <div className='main-screen'>
      <div className='title-container'>
        <h1 data-testid='title'>RPG GAME</h1>
      </div>
      <div className='menu-container'>
        <div className="panel">
          <Button
            data-testid='new-btn'
            onClick={() => handleNavigation('/newChar')}
          >
            New Character
          </Button>
          <Button
            data-testid='load-btn'
            onClick={() => handleNavigation('/loadChar')}
            disabled={!hasCharacters}
          >
            Load Character
          </Button>
          <Button
            data-testid='chess-btn'
            onClick={() => handleNavigation('/Chess')}
          >
            Chess
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TitleScreen