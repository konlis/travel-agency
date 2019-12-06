/* SELECTORS */

export const getAllFilters = ({filters}) => filters;

/* ACTIONS */

// action name creator
const reducerName = 'filters';
const createActionName = name => `app/${reducerName}/${name}`;

// action types
export const CHANGE_PHRASE = createActionName('CHANGE_PHRASE');
// TODO - add other action types
export const ADD_TAG = createActionName('ADD_TAG');
export const REMOVE_TAG = createActionName('REMOVE_TAG');
export const CHANGE_DUR = createActionName('CCHANGE_DUR');
// action creators
export const changeSearchPhrase = payload => ({ payload, type: CHANGE_PHRASE });
// TODO - add other action creators
export const addSearchTag = payload => ({ payload, type: ADD_TAG });
export const removeSearchTag = payload => ({ payload, type: REMOVE_TAG });
export const changeSearchDuration = payload => ({ payload, type: CHANGE_DUR });

// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case CHANGE_PHRASE:
      return {
        ...statePart,
        searchPhrase: action.payload,
      };
    // TODO - handle other action types
    case CHANGE_DUR:
      //console.log('duration', action);
      
      return {
        ...statePart,
        duration: {
          ...statePart.duration,
          [action.payload.type]: action.payload.value,
        },
      };
    case REMOVE_TAG:
      //console.log('remove action', action);
      
      return {
        ...statePart,
        tags: [
          ...statePart.tags.filter(tag => tag != action.payload.tag)],
      };
    case ADD_TAG:
      //console.log('add action',action);
      
      return {
        ...statePart,
        tags: [
          ...statePart.tags,
          action.payload.tag,
        ],
      };
    default:
      return statePart;
  }
}
