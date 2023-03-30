import {
  USER_SELECTED,
  USERS_LOADED,
  CURRENT_USER,
  // EDITED_CURRENT_USER,
  GET_CONTACT,
  GET_CONTACT_EXPERIENCES,
  USER_NOW,
} from "../actions";

const initialState = {
  users: [],
  currentUser: null,
  usersLoaded: false,
  editedUser: null,
  contact: null,
  contactExperiences: [],
  userNow: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };

    case USER_NOW:
      return {
        ...state,
        userNow: action.payload,
      };

    case GET_CONTACT_EXPERIENCES:
      return {
        ...state,
        contactExperiences: [action.payload],
      };
    case USER_SELECTED:
      return {
        ...state,
        users: [action.payload],
      };

    case USERS_LOADED:
      return {
        ...state,
        usersLoaded: action.payload,
      };

    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
