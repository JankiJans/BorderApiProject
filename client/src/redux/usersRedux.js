// selectors
export const getUser = (state) => state.user;

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// action creators
export const logIn = (payload) => {
  localStorage.setItem('loggedInUser', payload.login);
  return {
    type: LOG_IN,
    payload,
  };
};

export const logOut = () => {
  localStorage.removeItem('loggedInUser');
  return {
    type: LOG_OUT,
  };
};

const SAVE_USER_TO_LOCAL_STORAGE = createActionName('SAVE_USER_TO_LOCAL_STORAGE');
export const saveUserToLocalStorage = () => ({
  type: SAVE_USER_TO_LOCAL_STORAGE,
});

const initialState = {
  login: localStorage.getItem('loggedInUser') || null,
  request: { pending: false, error: null, success: false },
};

const usersReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, login: action.payload.login };
    case LOG_OUT:
      return { ...statePart, login: null };
    case SAVE_USER_TO_LOCAL_STORAGE:
      localStorage.setItem('loggedInUser', JSON.stringify(statePart.login));
      return statePart;
    default:
      return statePart;
  }
};

export default usersReducer;
