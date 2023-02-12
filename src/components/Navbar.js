import { useContext } from 'react';
import { NotesContext } from './../context/NotesContext';
import icons from '../Icons.svg';

const Navbar = () => {
  const { notes, setNotes, filter, setFilter } = useContext(NotesContext);
  const deleteCompleted = () => {
    setNotes(notes.filter((n) => n.isComplete === false));
  };
  return (
    <>
      <div className="navbar">
        <div className="filters">
          <button
            className={`btn-filter ${
              filter === 'active' ? 'filter-active' : ''
            } `}
            onClick={() => setFilter('active')}
          >
            In corso
          </button>

          <button
            className={`btn-filter ${
              filter === 'completed' ? 'filter-active' : ''
            } `}
            onClick={() => setFilter('completed')}
          >
            completate
          </button>

          <button
            className={`btn-filter ${filter === 'all' ? 'filter-active' : ''} `}
            onClick={() => setFilter('all')}
          >
            Tutte
          </button>
        </div>
        <span className="legenda">
          <svg className="legenda__icon">
            <use href={`${icons}#icon-checkbox`} />
          </svg>

          <span>check per completare</span>
        </span>
        <div className="counter">
          <span className="counter__value">
            {notes.filter((n) => n.isComplete === false).length}
          </span>
          <span className="counter__text">in corso</span>
        </div>
      </div>
      <div className="submenu">
        {filter === 'completed' &&
          notes.filter((n) => n.isComplete === true).length !== 0 && (
            <button className="submenu__link" onClick={deleteCompleted}>
              elimina completate
            </button>
          )}
        {filter === 'all' && (
          <button className="submenu__link" onClick={() => setNotes([])}>
            elimina tutte
          </button>
        )}
        {filter === 'active' && (
          <button className="submenu__link" style={{ visibility: 'hidden' }}>
            elimina tutte
          </button>
        )}
      </div>
    </>
  );
};
export default Navbar;
