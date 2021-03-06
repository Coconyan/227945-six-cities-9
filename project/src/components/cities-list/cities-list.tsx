import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { changeCity } from '../../store/data/data';
import {
  getCities,
  getCurrentCity
} from '../../store/data/selectors';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(getCities);
  const currentCity = useAppSelector(getCurrentCity);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li
                key={city}
                className="locations__item"
                id={city}
                onClick={() => {dispatch(changeCity(city));}}
              >
                <Link
                  to={AppRoute.Root}
                  className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
                >
                  <span>{city}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>

  );
}

export default memo(CitiesList);
