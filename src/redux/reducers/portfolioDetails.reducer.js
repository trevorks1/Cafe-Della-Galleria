const portfolioDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PORTFOLIO_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default portfolioDetailsReducer;
