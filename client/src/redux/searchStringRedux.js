// Actions
const SEARCH_UPDATE = 'searchString/SEARCH_UPDATE';

// Action creators
export const searchUpdate = (updateSearchString) => ({
  type: SEARCH_UPDATE,
  payload: updateSearchString,
});

// Reducer
const initialState = '';
const searchStringReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

// Selectors
const getSearchString = (state) => state.searchString;
const getAllAds = (state) => state.ads;

export const getFilteredAds = (state) => {
  const searchString = getSearchString(state);
  const ads = getAllAds(state);

  if (searchString) {
    return ads.filter((ad) => ad.title.toLowerCase().includes(searchString.toLowerCase()));
  }
  return ads;
};

export default searchStringReducer;
