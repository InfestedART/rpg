import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoadChar.css'

import {
  getAllCharacters,
  deleteCharacter,
  getCharacterById,
} from '@/api/characters';
import Button from '@/components/Button';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useCharacterStore } from '@/store/characterStore';
import type { CharClassType } from '@/types/characterTypes';

type Character = {
  id: number;
  name: string;
  class: CharClassType;
  equipment?: string;
  createdAt?: string;
}

const LoadChar = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [charList, setCharList] = useState<Character[]>([]);
  const [deletedId, setDeletedId] = useState<number | null >(null);

  const { setSelectedCharacterId } = useCharacterStore();
  const navigate = useNavigate();

  const fetchCharacters = async () => {
    const data = await getAllCharacters();
    setCharList(data);
    setLoading(false);
  }

  const handleDelete = (id: number) => {
    setIsAlertOpen(true);
    setDeletedId(id);
  }

  const handleSelect = async (id: number) => {
    const char = await getCharacterById(id)
    setSelectedCharacterId(char.id);
    navigate('/game');
  }

  const confirmDelete = async () => {
    if (deletedId == null) return

    await deleteCharacter(deletedId);
    setIsAlertOpen(false);
    setDeletedId(null);
    fetchCharacters();
  }

  useEffect(() => {
    fetchCharacters();
  }, [])


  const getCharTable = () => (
    <div className="max-w-7xl self-center border border-gray-200 rounded-lg overflow-hidden">
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
              onClick={() => handleSelect(char.id)}
              className="mr-2"
              variant="primary"
              size="sm"
            >
              Select
            </Button>
            <Button
              icon={faTrash}
              iconPosition="left"
              onClick={() => handleDelete(char.id)}
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
      <ConfirmDialog
        isOpen={isAlertOpen}
        title="Delete character"
        message="Are you sure you want to delete this character? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsAlertOpen(false)}
        confirmLabel='Delete'
      />
    </div>
  );
}

export default LoadChar;