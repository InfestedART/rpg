import { characterSchema } from "@/schemas/character.schema";
import type { z } from "zod";

import Form from "@/components/Form";
import TextInput from "@/components/Form/TextInput";
import Button from "@/components/Button";
import SelectInput from "@/components/Form/SelectInput";
import { CLASS_OPTIONS, WEAPONS_BY_CLASS, type CharClassType } from "@/constants/classes";
import { useState } from "react";
import { createCharacter } from "@/api/characters";

type CharacterFormData = z.infer<typeof characterSchema>

const CharacterForm = () => {
  const [charClass, setCharClass] = useState<CharClassType>('soldier')

  const onSubmit = (data: CharacterFormData) => {
    console.log("==> Valid character:", data)
    createCharacter(data);
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
          onChange={(ev) => setCharClass(ev.target.value as CharClassType)}
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