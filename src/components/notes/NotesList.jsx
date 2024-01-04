import { useState } from "react";
import { deleteNote } from "../../managers/NoteManager";
import { NoteForm } from "./NoteForm";

export const NotesList = ({ token, recipeId, userId, notes, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const newNote = { content: "" };

  const handleEdit = (noteId) => {
    setIsEditing(true);
    setEditingNoteId(noteId);
  };

  const displayButtons = (note) => {
    if (notes && notes.length)
      return (
        <>
          <div className="footer--container flex justify-end mt-2">
            <div className="mr-1">
              <i
                className="icon fa-solid fa-pen-to-square fa-lg cursor-pointer"
                onClick={() => handleEdit(note.id)}
              ></i>
            </div>
            <div className="ml-1">
              <i
                className="icon fa-solid fa-trash fa-lg cursor-pointer"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                type="button"
              ></i>
            </div>
          </div>
          <div className="modal fade" id="deleteModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  Are you sure you want to delete this recipe?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      deleteNote(token, note.id)
                        .then(() => {
                          fetchNotes();
                        })
                        .then(setEditingNoteId(null));
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  };

  return (
    <div className="notes--container flex flex-col rounded-b-md border-t-transparent px-8 pb-1 bg-green-800 w-full h-full overflow-auto">
      <div className="my-2">
        <div className="text-center">
          <button
            type="button"
            className="bg-white px-4 py-1 rounded-full"
            data-bs-toggle="modal"
            data-bs-target="#noteFormModal"
          >
            Add Note
          </button>
        </div>
        <div
          className="modal fade"
          id="noteFormModal"
          tabIndex="-1"
          aria-labelledby="noteFormLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header border-b-0 pb-0">
                {/* <div className="modal-title fs-5" id="noteFormLabel">
                  Note Content
                </div> */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body pt-0">
                <NoteForm
                  note={newNote}
                  isEditing={isEditing}
                  token={token}
                  recipeId={recipeId}
                  fetchNotes={fetchNotes}
                />
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* {showAddButton ? (
          <div className="text-center">
            <button
              className="bg-white px-4 py-1 rounded-full"
              onClick={() => setShowAddButton(false)}
            >
              Add Note
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="card basis-80">
              <div className="card-body">
                <NoteForm
                  note={newNote}
                  isEditing={isEditing}
                  token={token}
                  recipeId={recipeId}
                  fetchNotes={fetchNotes}
                  setShowAddButton={setShowAddButton}
                />
              </div>
            </div>
          </div>
        )} */}
      </div>
      <div className="bg-green-100 rounded-lg h-full mb-4 overflow-y-auto">
        <div className="flex justify-around flex-wrap">
          {notes.map((note) => (
            <div
              className="note--container card basis-80 bg-white px-2 pt-2 rounded-md my-3 shadow-lg border-2 border-green-800"
              key={note.id}
            >
              <div className="card-body">
                {editingNoteId === note.id ? (
                  <NoteForm
                    note={note}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    setEditingNoteId={setEditingNoteId}
                    token={token}
                    recipeId={recipeId}
                    fetchNotes={fetchNotes}
                  />
                ) : (
                  <>
                    <div className="flex justify-between card-subtitle mb-2">
                      <div>{note.author.full_name}</div>
                      <div>{note.posted_on}</div>
                    </div>
                    <p className="card-text">{note.content}</p>
                    {userId === note.author.id && displayButtons(note)}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
