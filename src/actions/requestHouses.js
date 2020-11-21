import axios from 'axios';
import { URL, PLACES } from '../helpers/constants';

export const LOAD_HOUSES = 'LOAD_HOUSES';
export const RECEIVE_HOUSES = 'RECEIVE_HOUSES';
export const ERROR_FETCHING_HOUSES = 'ERROR_FETCHING_HOUSES';

export const housesLoad = (redirect = 0, history = null) => async dispatch => {
  try {
    dispatch({
      type: LOAD_HOUSES,
    });
    const urlCall = URL + PLACES;
    axios.get(urlCall,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(response => {
      const dataReturn = response.data;
      dispatch({
        type: RECEIVE_HOUSES,
        payload: dataReturn,
      });
      if (redirect > 0) {
        history.push(`/house/${redirect}`);
      }
    },
    error => {
      dispatch({
        type: ERROR_FETCHING_HOUSES,
        payload: error.response.data,
      });
    });
  } catch (error) {
    dispatch({
      type: ERROR_FETCHING_HOUSES,
      payload: error,
    });
  }
};
