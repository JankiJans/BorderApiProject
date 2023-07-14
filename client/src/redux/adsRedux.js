import axios from 'axios'
import { API_URL } from '../config'

export const getAllAds = ({ ads }) => ads
export const getAdById = ({ ads }, id) => ads.find((ad) => ad._id === id);

const createActionName = (actionName) => `app/ads/${actionName}`
const UPDATE_ADS = createActionName('UPDATE_ADS')
const EDIT_AD = createActionName('EDIT_AD')
const ADD_AD = createActionName('ADD_AD')
const REMOVE_AD = createActionName('REMOVE_AD')

export const updateAds = (payload) => ({ type: UPDATE_ADS, payload })
export const editAd = (payload) => ({ type: EDIT_AD, payload })
export const addAd = (payload) => ({ type: ADD_AD, payload })
export const removeAd = (payload) => ({ type: REMOVE_AD, payload })

export const fetchAds = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/api/ads`);
  
      dispatch(updateAds(response.data));
    } catch (error) {
      console.log(error); 
    }
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ADS:
      return [...action.payload]
    case EDIT_AD:
      return statePart.map((ad) =>
      ad.id === action.payload.id ? { ...ad, ...action.payload } : ad,
      )
    case ADD_AD:
      return [...statePart, { ...action.payload }]
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload)
    default:
      return statePart
  }
}

export default adsReducer