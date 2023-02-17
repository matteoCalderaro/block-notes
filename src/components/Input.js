import TextareaAutosize from 'react-textarea-autosize';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { NotesContext } from './../context/NotesContext';

const Input = () => {
  const { noteTitle, newNote, setNoteTitle } = useContext(NotesContext);
  return (
    <div className="main-input-container">
      <form action="#" onBlur={newNote} className="textarea">
        <TextareaAutosize
          type="text"
          value={noteTitle}
          onChange={({ target }) => setNoteTitle(target.value)}
          className="textarea__input"
          placeholder="Scrivi una nota ...."
        />
      </form>
      <button className="btn btn--add ">
        <FolderPlusIcon />
      </button>
    </div>
  );
};

export default Input;
