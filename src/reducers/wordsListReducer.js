import { WORDS_LIST_FAIL, WORDS_LIST_REQUEST, WORDS_LIST_SUCCESS, SEARCH_TYPE_LENGTH, SEARCH_TYPE_SUBSTRING } from "../constants";

const wordsListReducer = (state = {words: []}, action) => {
 switch (action.type) {
  case WORDS_LIST_REQUEST:
   return { loading: true, words: [] };
  case WORDS_LIST_SUCCESS:
   const { config: { searchType, value }, data } = action.payload;
   let dataFiltered;
   
   switch (searchType) {
    case SEARCH_TYPE_LENGTH:
     dataFiltered = data
     .filter(word => word.length > value);
     break;
    case SEARCH_TYPE_SUBSTRING:
     dataFiltered = data
     .filter(word => {
      const { config: { sens } } = action.payload;
    
      const regexpValueSafetyCheck = /[\\'"]/g;
      const safeValue = value.replace(regexpValueSafetyCheck, '');
      const regexp = new RegExp(`${safeValue}`, `${sens ? '' : 'i'}`);
 
      return regexp.test(word) ? true : false;
     })
     break;
    default:
     dataFiltered = data;
   }

   return { loading: false, words: dataFiltered.sort((a, b) => a.length - b.length) };
  case WORDS_LIST_FAIL:
   return { loading: false, error: action.payload, words: [] };
  default: 
  return state;
 }
}

export { wordsListReducer };