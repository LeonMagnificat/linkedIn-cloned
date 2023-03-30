import {
  GET_CURRENT_POST,
  GET_POSTS_LIST,
  POSTS_LOADED,
  PROFILE_POSTS_LIST,
} from '../actions'

const initialState = {
  posts: {
    postsList: [],
    currentPost: null,
    postsLoaded: null,
    profilePosts: [],
  },
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_POSTS_LIST:
      return {
        ...state,
        posts: {
          ...state.posts,
          profilePosts: [...state.posts.profilePosts, action.payload],
        },
      }

    case GET_POSTS_LIST:
      return {
        ...state,
        posts: {
          ...state.posts,
          postsList: [action.payload],
        },
      }

    case GET_CURRENT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          currentPost: action.payload,
        },
      }

    case POSTS_LOADED:
      return {
        ...state,
        posts: {
          ...state.posts,
          postsLoaded: action.payload,
        },
      }

    default:
      return state
  }
}

export default postsReducer
