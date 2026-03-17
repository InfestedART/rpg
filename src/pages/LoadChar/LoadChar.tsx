import { useEffect, useState } from 'react';
import './LoadChar.css'
import type { CharClassType } from '@/constants/classes';
import { getAllCharacters } from '@/api/characters';
import Button from '@/components/Button';
import { faTrash, faHome } from '@fortawesome/free-solid-svg-icons';

type Character = {
  id: number;
  name: string;
  class: CharClassType;
  equipment?: string;
  createdAt?: string;
}

const LoadChar = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [charList, setCharList] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const data = await getAllCharacters();
      setCharList(data)
      setLoading(false)
    }

    fetchCharacters();
  }, [])

  const getCharTable = () => (
    <div className="max-w-xl border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-100 font-semibold text-gray-700 px-1 py-3 text-bold">
          <div className="px-4">Name</div>
          <div className="px-4">Class</div>
          <div className="px-4">Action</div>
        </div>
      {charList.map(char => (
        <div
          className="grid grid-cols-3 px-1 py-3 border-t border-gray-200"
          key={char.id}
        >
          <div className="px-4 self-center">{char.name}</div>
          <div className="px-4 self-center">{char.class}</div>
          <div className="flex flex-row px-4">
            <Button
              onClick={() => console.log('click')}
              className="mr-2"
              variant="primary"
              size="sm"
            >
              Select
            </Button>
            <Button
              icon={faTrash}
              iconPosition="left"
              onClick={() => console.log('delete')}
              variant="primary"
              size="sm"
            />
          </div>
        </div>
      ))}
    </div>    
  );

  return (
    <div className='loadChar'>
      <header className='page-header'>
        <h1 className='page-title'> CHARACTER SELECTION</h1>
      </header>
      {loading ? <div>Loading...</div> : getCharTable()}
    </div>
  );
}

export default LoadChar;