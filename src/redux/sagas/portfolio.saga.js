import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* savePortfolio(action) {
  try {
    const response = yield axios.post(
      '/api/portfolios/portfolio',
      action.payload
    );
    yield axios.post('/api/portfolios/genre', {
      genre_name: action.payload.genre,
      portfolio_id: response.data.id,
    });
    yield axios.post('/api/portfolios/images', {
      alt: action.payload.alt,
      url: action.payload.images,
      portfolio_id: response.data.id,
    });

    yield put({ type: 'SET_PORTFOLIO_DETAIL', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// Get the portfolio with a saga
function* getPortfolio(action) {
  try {
    const response = yield axios.get('/api/portfolios/portfolio');
    yield put({ type: 'SET_PORTFOLIO', payload: response.data });
  } catch (error) {
    console.log('Request failed to retrieve Portfolio.', error);
  }
}

function* portfolioSaga() {
  yield takeLatest('SAVE_ART_DETAILS', savePortfolio);
  yield takeLatest('GET_PORTFOLIO', getPortfolio);
}

export default portfolioSaga;