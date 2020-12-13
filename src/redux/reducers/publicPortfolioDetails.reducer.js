const publicPortfolioDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PUBLIC_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default publicPortfolioDetailsReducer;
