import shortid from 'shortid'

export const getAllAds = ({ ads }) => ads
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id)

const createActionName = (actionName) => `app/ads/${actionName}`
const UPDATE_ADS = createActionName('UPDATE_ADS')
const EDIT_AD = createActionName('EDIT_AD')
const ADD_AD = createActionName('ADD_AD')
const REMOVE_AD = createActionName('REMOVE_AD')
const SEARCH_ADS = createActionName('SEARCH_ADS')

export const updateAds = (payload) => ({ type: UPDATE_ADS, payload })
export const editAd = (payload) => ({ type: EDIT_AD, payload })
export const addAd = (payload) => ({ type: ADD_AD, payload })
export const removeAd = (payload) => ({ type: REMOVE_AD, payload })
export const searchAd = (payload) => ({type: SEARCH_ADS,payload: { payload },})

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload]
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad,
      )
    case ADD_AD:
      return [...statePart, { ...action.payload, _id: shortid() }]
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload)
    case SEARCH_ADS:
      return statePart.filter((ad) => ad.title.includes(action.payload))
    default:
      return statePart
  }
}

export default adsReducer