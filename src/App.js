import { NotesContext } from './context/NotesContext';
import NoteList from './NoteList';
import useLocalStorage from './hooks/useLocalStorage';
import { useState, useEffect } from 'react';

import 'react-clock/dist/Clock.css';
import NoNotes from './components/NoNotes';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Input from './components/Input';
import Widget from './components/Widget';
import Navbar from './components/Navbar';

function App() {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [id, setId] = useLocalStorage('id', 1);
  const [filter, setFilter] = useState('all');
  const [weather, setWeather] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  useEffect(() => {
    setFilter('active');
  }, [id]);

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=45.87&longitude=10.88&current_weather=true'
    )
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);
  console.log(weather);

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const noteFiltered = () => {
    if (filter === 'all') {
      return notes;
    }
    if (filter === 'completed') {
      return notes.filter((n) => n.isComplete === true);
    }
    if (filter === 'active') {
      return notes.filter((n) => n.isComplete === false);
    }
    return notes;
  };

  const newNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;
    setId((prev) => prev + 1);
    setNotes([
      ...notes,
      { id: id, title: noteTitle, isEdited: false, isComplete: false },
    ]);
    setNoteTitle('');
  };

  return (
    <>
      <NotesContext.Provider
        value={{
          notes,
          setNotes,
          id,
          setId,
          filter,
          setFilter,
          noteFiltered,
          value,
          weather,
          noteTitle,
          setNoteTitle,
          newNote,
        }}
      >
        <div className="main-container">
          <Widget />
          <Input />

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={notes.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              {notes.length === 0 ? (
                <NoNotes />
              ) : (
                <>
                  <Navbar />
                  <NoteList />
                </>
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
      </NotesContext.Provider>
    </>
  );
}

export default App;
