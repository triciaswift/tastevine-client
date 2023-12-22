import { useEffect, useState } from "react";
import { getNotesByRecipeId } from "../../managers/NoteManager";

export const NotesList = ({ token, recipeId, userId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotesByRecipeId(token, recipeId).then(setNotes);
  }, [token, recipeId]);

  const displayButtons = () => {
    if (notes && notes.length)
      return (
        <>
          <div className="footer--container flex justify-end mt-2">
            <div className="mr-1">
              <i className="icon fa-solid fa-pen-to-square fa-lg cursor-pointer"></i>
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
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
  };

  return (
    <div className="notes--container flex flex-col rounded-b-md border-t-transparent px-10 py-2 bg-cyan-600">
      <div className="text-center">
        <button className="bg-white">Add Note</button>
      </div>
      <div className="flex justify-around flex-wrap">
        {notes.map((note) => (
          <div
            className="note--container card basis-1/3 bg-white px-2 pt-2 rounded-md my-4 shadow-lg"
            key={note.id}
          >
            <div className="card-body">
              <div className="flex justify-between card-subtitle mb-2">
                <div>{note.author.full_name}</div>
                <div>{note.posted_on}</div>
              </div>
              <p className="card-text">{note.content}</p>
              {userId === note.author.id ? displayButtons() : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
