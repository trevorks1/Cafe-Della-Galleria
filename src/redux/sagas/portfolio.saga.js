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

function* getPortfolioDetails(action) {
  try {
    const response = yield axios.get(
      `/api/portfolios/portfolio/details/${action.payload}`
    );
    yield put({ type: 'SET_PORTFOLIO_DETAILS', payload: response.data });
  } catch (error) {
    console.log('Request failed, did not get Portfolio Details', error);
  }
}

function* saveForsaleDetails(action) {
  try {
    yield axios.put(
      `/api/portfolios/update/${action.payload.details_id}`,
      action.payload
    );
    yield put({
      type: 'GET_PORTFOLIO_DETAILS',
      payload: action.payload.details_id,
    });
  } catch (error) {
    console.log('Did not save');
  }
}

// delete SAGA for
function* deletePortfolioDetails(action) {
  try {
    const response = yield axios.delete(
      `/api/portfolios/delete/${action.payload}`
    );
    yield put({ type: 'GET_PORTFOLIO', payload: response.data });
  } catch (error) {
    console.log('Request failed, did not delete Portfolio Details', error);
  }
}

function* getPortfolioPublic(action) {
  try {
    const response = yield axios.get(`/api/public/portfolio/gallery`);
    yield put({ type: 'SET_PUBLIC_PORTFOLIO', payload: response.data });
  } catch (error) {
    console.log('Could not get Public Portfolio Gallery');
  }
}

function* getPortfolioPublicDetails(action) {
  try {
    const response = yield axios.get(
      `/api/public/portfolio/details/${action.payload}`
    );
    yield put({ type: 'SET_PUBLIC_DETAILS', payload: response.data });
  } catch (error) {
    console.log('Could not get Public Details Page');
  }
}

function* portfolioSaga() {
  yield takeLatest('SAVE_ART_DETAILS', savePortfolio);
  yield takeLatest('GET_PORTFOLIO', getPortfolio);
  yield takeLatest('GET_PORTFOLIO_DETAILS', getPortfolioDetails);
  yield takeLatest('DELETE_PORTFOLIO_DETAILS', deletePortfolioDetails);
  yield takeLatest('SAVE_FORSALE', saveForsaleDetails);
  yield takeLatest('GET_PORTFOLIO_PUBLIC', getPortfolioPublic);
  yield takeLatest('GET_PUBLIC_DETAILS', getPortfolioPublicDetails);
}

export default portfolioSaga;
