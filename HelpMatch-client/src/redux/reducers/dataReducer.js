import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DISLIKE_SCREAM,
  UNDISLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_GROUP_NAME,
  SET_SEARCH,
  SET_SEARCH_LOCATION,
} from '../types';

const initialState = {
  groupName: '',
  shortGroupName: '',
  search: '',
  searchLocation: '',
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GROUP_NAME:
      return {
        ...state,
        groupName: action.payload.name,
        shortGroupName: action.payload.code,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_SEARCH_LOCATION:
      return {
        ...state,
        searchLocation: action.payload,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
    case DISLIKE_SCREAM:
    case UNDISLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };

    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
}
