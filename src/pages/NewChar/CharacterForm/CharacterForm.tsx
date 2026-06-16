import { useState } from "react";
import type { z } from "zod";

import Form from "@/components/Form";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import SelectInput from "@/components/Form/SelectInput";

import { characterSchema } from "@/schemas/character.schema";
import { createCharacter } from "@/api/characters";
import { CLASS_OPTIONS, WEAPONS_BY_CLASS } from "@/constants/classOptions";
import type { CharacterType, CharClassType } from "@/types/characterTypes";

import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore'
import { useCharacterStore } from "@/store/characterStore";

type CharacterFormData = z.infer<typeof characterSchema>

const CharacterForm = () => {
  const [charClass, setCharClass] = useState<CharClassType>('soldier')
  const { setSelectedCharacter } = useCharacterStore();
  const { setCurrentClass } = useGameStore();

  const navigate = useNavigate();

  const onSubmit = async (data: CharacterFormData) => {
    await createCharacter(data);
    setSelectedCharacter(data as CharacterType);
    console.log("==> Valid character:", data)
    navigate('/game');
  };

  const equipmentOptions =
    charClass && WEAPONS_BY_CLASS[charClass]
      ? WEAPONS_BY_CLASS[charClass]
      : []

  return (
    <div className="newchar-stats">
      <Form
        schema={characterSchema}
        onSubmit={data => onSubmit(data)}
      >  
        <TextInput label="Character Name" name="name" />
        <SelectInput
          label="Class"
          name="class"
          options={CLASS_OPTIONS}
          onChange={(ev) => {
            setCharClass(ev.target.value as CharClassType)
            setCurrentClass(ev.target.value as CharClassType)
          }}
        />
        {charClass && (
          <SelectInput
            label="Equiment"
            name="equipment"
            options={equipmentOptions}
          />
        )}
        <Button className="mt-8 ml-auto" variant="primary" type="submit" size="md">
          CREATE CHARACTER
        </Button>
      </Form>
    </div>
  )

};

export default CharacterForm;