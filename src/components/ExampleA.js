import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const ExampleA = () => {
  const [isEnter, setIsEnter] = useState(true);
  return (
    <div className="container">
      <button
        onClick={() => {
          setIsEnter((v) => !v);
        }}
      >
        Transition
      </button>
      <CSSTransition
        //1. state(enter/exit) in={true} means enter and in={false} means exit
        in={isEnter}
        //2. duration
        timeout={5000}
        //3. class name prefix
        classNames="myclass"
        // only on mounted
        appear={true}
      >
        <p className="my-paragraph">{isEnter ? 'Enter' : 'Exit'}</p>
      </CSSTransition>
    </div>
  );
};
export default ExampleA;
