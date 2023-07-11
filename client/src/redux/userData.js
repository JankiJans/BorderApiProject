// selectors
export const getUserId = ({ userData }) => userData;
// actions
const createActionName = (actionName) => `app/user/${actionName}`;
const UPDATE_DATA = createActionName('UPDATE_ADS');

// action creators
export const updateData = (payload) => ({ type: UPDATE_DATA, payload });

const userData = (statePart = null, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return action.payload;

    default:
      return statePart;
  }
};

export default userData;