import axios from "axios";
import { WORDS_LIST_FAIL, WORDS_LIST_REQUEST, WORDS_LIST_SUCCESS } from "../constants";

const wordsList = (config) => async (dispatch) => {
  try {
    dispatch({ type: WORDS_LIST_REQUEST });
    const { data } = await axios.get("/api/words");
    dispatch({ type: WORDS_LIST_SUCCESS, payload: {
     data,
     config
    } });
  } catch (error) {
    dispatch({ type: WORDS_LIST_FAIL, payload: error.response.data });
  }
};

export { wordsList };
