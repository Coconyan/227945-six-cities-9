import { createReducer } from '@reduxjs/toolkit';
import { SortTypes } from '../const';
import {
  City,
  Offers
} from '../types/offer';
import { cities } from '../mocks/cities';
import {
  changeCity,
  fillOffersList,
  changeSortType,
  loadOffers
} from './actions';

type InitialState = {
  cities: City[],
  currentCity: City,
  offers: Offers,
  currentSortType: string,
  isDataLoaded: boolean,
}

const initialState: InitialState = {
  cities,
  currentCity: cities[0],
  offers: [],
  currentSortType: SortTypes.Popular,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortType, (state, action) => {
      state.currentSortType = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    });
});

export { reducer };
