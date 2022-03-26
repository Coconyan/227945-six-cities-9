import {
  useCallback,
  useMemo,
  useState
} from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import ListCards from '../../components/list-cards/list-cards';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import {
  SortTypes,
  SPINNER_COLOR
} from '../../const';
import {
  sortPriceToHigh,
  sortPriceToLow,
  sortRatingToHigh
} from '../../utils';
import { SpinnerCircular } from 'spinners-react';
import HeaderLoginInfo from '../../components/header-login-info/header-login-info';
import MainEmpty from '../../components/main-empty/main-empty';
import {
  getCurrentCity,
  getCurrentSortType,
  getLoadedDataStatus,
  getOffers
} from '../../store/data/selectors';

function MainPage(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const offers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getCurrentSortType);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  let currentCityOffers = useMemo(() => offers.filter((offer) => offer.city.name === currentCity.name), [currentCity.name, offers]);

  const [activeCard, setActiveCard] = useState<Offer | undefined>(
    undefined,
  );

  const onListItemHover = useCallback((id: string) => {
    const currentOffer = currentCityOffers.find((offer) => String(offer.id) === id);
    setActiveCard(currentOffer);
  },
  [currentCityOffers],
  );

  switch (currentSortType) {
    case SortTypes.PriceLowToHigh:
      currentCityOffers.sort(sortPriceToHigh);
      break;
    case SortTypes.PriceHighToLow:
      currentCityOffers.sort(sortPriceToLow);
      break;
    case SortTypes.RatingLowToHigh:
      currentCityOffers.sort(sortRatingToHigh);
      break;
    case SortTypes.Popular:
      currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
      break;
    default:
      currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo isMain />
            </div>
            <nav className="header__nav">
              <HeaderLoginInfo />
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <CitiesList />
        {currentCityOffers.length === 0
          ? <MainEmpty />
          : (
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{isDataLoaded ? `${currentCityOffers.length} places to stay in ${currentCity.name}` : 'Loading...'}</b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <Sort />
                  </form>
                  <div className="cities__places-list places__list tabs__content">
                    {isDataLoaded ? <ListCards offers={currentCityOffers} onListItemHover={onListItemHover} /> : <SpinnerCircular color={SPINNER_COLOR} />}
                  </div>
                </section>
                <div className="cities__right-section">
                  <section className="cities__map map" >
                    {
                      <Map
                        key={JSON.stringify(currentCity.location.longitude + currentCity.location.latitude)}
                        city={currentCity}
                        offers={currentCityOffers}
                        activeCard={activeCard}
                      />
                    }
                  </section>
                </div>
              </div>
            </div>
          )}
      </main>
    </div>
  );
}

export default MainPage;
