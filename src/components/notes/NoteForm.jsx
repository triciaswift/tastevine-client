import { useEffect, useState } from "react";
import { FormInput } from "../../utils/FormInput";
import { createNote, updateNote } from "../../managers/NoteManager";

export const NoteForm = ({
  note,
  isEditing,
  setIsEditing,
  setEditingNoteId,
  token,
  recipeId,
  fetchNotes,
  setShowAddButton,
}) => {
  const [currentNote, setCurrentNote] = useState({ content: "" });

  useEffect(() => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      content: note.content,
    }));
  }, [note]);

  const handleNoteState = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const newNote = {
      recipeId: recipeId,
      content: currentNote.content,
    };

    if (isEditing) {
      updateNote(newNote, note.id, token)
        .then(() => fetchNotes())
        .then(() => {
          setIsEditing(false);
          setEditingNoteId(null);
        });
    } else {
      createNote(newNote, token)
        .then(() => fetchNotes())
        .then(setShowAddButton(true));
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setIsEditing(false);
      setEditingNoteId(null);
    } else {
      setShowAddButton(true);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <fieldset className="content--container mb-2">
        <div>
          <label className="form-label">Note Content</label>
        </div>
        <FormInput
          type="textarea"
          name="content"
          value={currentNote.content}
          onChange={handleNoteState}
          rows="1"
        />
      </fieldset>
      <div className="flex justify-end mt-2">
        <button type="submit" className="px-2">
          <i className="fa-solid fa-check fa-lg cursor-pointer"></i>
        </button>
        <div>
          <i
            className="fa-solid fa-rotate-left fa-lg cursor-pointer"
            onClick={handleCancel}
          ></i>
        </div>
      </div>
    </form>
  );
};
