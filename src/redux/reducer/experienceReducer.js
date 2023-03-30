import { SELECTED_EXPERIENCE, SET_EXPERIENCES_LOADED } from '../actions'

const initialState = {
  experience: {
    content: [],
    experienceLoaded: false,
  },
}

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_EXPERIENCE:
      return {
        ...state,
        experience: {
          ...state.experience,
          content: [action.payload],
        },
      }

    case SET_EXPERIENCES_LOADED:
      return {
        ...state,
        experience: {
          ...state.experience,
          experienceLoaded: action.payload,
        },
      }

    default:
      return state
  }
}

export default experienceReducer
