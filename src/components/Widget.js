import { useContext } from 'react';
import Clock from 'react-clock';
import { NotesContext } from './../context/NotesContext';
import moment from 'moment';
import 'moment/locale/it';
import icons from '../Icons.svg';
moment.locale('it');

const Widget = () => {
  const { value, weather } = useContext(NotesContext);
  const currentWeatherCode = weather.current_weather?.weathercode;

  return (
    <div className="widget">
      <span className="date date__day">{moment().format('dddd')}</span>
      <span className="date date__year">{moment().format('LL')}</span>

      <div className="temp">
        <p>{weather.current_weather?.temperature}&deg;C</p>
      </div>

      <svg className="weather-icon">
        {currentWeatherCode > 4 ? (
          <use href={`${icons}#icon-rainy`} />
        ) : (
          <use href={`${icons}#icon-sunny`} />
        )}
      </svg>

      <Clock
        value={value}
        size="48px"
        hourMarksLength="0"
        minuteMarksLength="0"
        secondHandLength="80"
        hourHandWidth="2"
        className="clock-item"
      />
    </div>
  );
};
export default Widget;
