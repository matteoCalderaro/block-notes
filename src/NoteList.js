import { useContext, useState } from 'react';
import { NotesContext } from './context/NotesContext';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import {
  DocumentCheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import TextareaAutosize from 'react-textarea-autosize';

const NoteList = () => {
  const { notes, setNotes, noteFiltered } = useContext(NotesContext);

  const [textEdit, setTextEdit] = useState('');
  const [preValue, setPrevValue] = useState('');

  const remove = (note) => {
    const newNoteSet = notes.filter((n) => n !== note);
    setNotes(newNoteSet);
  };

  const update = (nota) => {
    const findNote = notes.find((n) => n.id === nota.id);
    if (!textEdit.trim()) {
      const notToChangeNote = {
        ...findNote,
        title: preValue,
        isEdited: !findNote.isEdited,
      };
      setNotes(notes.map((n) => (n.id === nota.id ? notToChangeNote : n)));
      return;
    }

    const changedNote = {
      ...findNote,
      title: textEdit,
      isEdited: !findNote.isEdited,
    };
    console.log(changedNote);
    setNotes(notes.map((n) => (n.id === nota.id ? changedNote : n)));
  };

  const edit = (nota) => {
    const findNote = notes.find((n) => n.id === nota.id);
    const editNote = { ...findNote, isEdited: !findNote.isEdited };
    setNotes(notes.map((n) => (n.id === nota.id ? editNote : n)));
  };

  const makeComplete = (note) => {
    const findNote = notes.find((n) => n.id === note.id);
    const updateNote = { ...findNote, isComplete: !findNote.isComplete };
    console.log(updateNote);
    setNotes(notes.map((n) => (n.id === note.id ? updateNote : n)));
  };

  const sort = () => {
    const noteArr = noteFiltered();
    const noteSort = noteArr.sort((a, b) => b.id - a.id);
    return noteSort;
  };

  return (
    <>
      <TransitionGroup>
        {sort()?.map((note) => (
          <CSSTransition
            key={note.id}
            timeout={300}
            classNames="slide-horizontal"
          >
            <div
              key={note.id}
              className={`outer-container ${
                note.isComplete ? 'outer-container--completed' : ''
              }`}
            >
              <input
                type="checkbox"
                className="checkbox"
                onChange={() => makeComplete(note)}
                checked={note.isComplete}
              />
              {note.isEdited ? (
                <CSSTransition in="{true}" timeout={2000} classNames="input">
                  <TransitionGroup component="div" className="inner-container">
                    <TextareaAutosize
                      defaultValue={note.title}
                      onChange={({ target }) => setTextEdit(target.value)}
                      onFocus={({ target }) => {
                        setTextEdit(target.value);
                        setPrevValue(target.value);
                      }}
                      onBlur={() => update(note)}
                      autoFocus
                    />
                    <button className="btn btn--update ">
                      <DocumentCheckIcon
                        className="btn--save__icon"
                        onClick={() => update(note)}
                      />
                    </button>
                    {/* </div> */}
                  </TransitionGroup>
                </CSSTransition>
              ) : (
                <CSSTransition in={false} timeout={2000} classNames="text">
                  <TransitionGroup component="div" className="inner-container">
                    <p className={note.isComplete ? 'isComplete' : 'bo'}>
                      {note.title}
                    </p>
                    <div className="buttons">
                      <button
                        className="btn btn--edit"
                        style={{
                          display: note.isComplete ? 'none' : 'block',
                        }}
                      >
                        <PencilSquareIcon
                          className="btn__icon--red"
                          onClick={() => edit(note)}
                        />
                      </button>
                      <button
                        className="btn btn--remove"
                        style={{
                          color: note.isComplete ? '#777' : 'red',
                        }}
                      >
                        <TrashIcon
                          className="btn--remove__icon"
                          onClick={() => remove(note)}
                        />
                      </button>
                    </div>
                  </TransitionGroup>
                </CSSTransition>
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};
export default NoteList;
