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
}) => {
  // State variable to handle the current note content being edited or added
  const [currentNote, setCurrentNote] = useState({ content: "" });

  // Update the current note state when the "note" prop changes
  useEffect(() => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      content: note.content,
    }));
  }, [note]);

  // Function handles the changes in the note content input
  const handleNoteState = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  // Function handles saving the note
  const handleSave = (e) => {
    e.preventDefault();

    const newNote = {
      recipeId: recipeId,
      content: currentNote.content,
    };

    // Check if editing or creating a new note
    if (isEditing) {
      // Update an existing note
      updateNote(newNote, note.id, token)
        .then(() => fetchNotes())
        .then(() => {
          setIsEditing(false);
          setEditingNoteId(null);
        });
    } else {
      // Create a new note
      createNote(newNote, token).then(() => fetchNotes());
    }
  };

  // Function handles canceling of note edit form
  const handleCancel = () => {
    setIsEditing(false);
    setEditingNoteId(null);
  };

  // JSX to display the note form
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
      {/* Save/Cancel buttons */}
      <div className="flex justify-end mt-2">
        <button type="submit" className="px-2" data-bs-dismiss="modal">
          <i className="fa-solid fa-check fa-lg cursor-pointer"></i>
        </button>
        <div>
          <i
            className="fa-solid fa-rotate-left fa-lg cursor-pointer"
            onClick={handleCancel}
            data-bs-dismiss="modal"
          ></i>
        </div>
      </div>
    </form>
  );
};
