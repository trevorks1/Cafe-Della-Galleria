const portfolioPublicReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PUBLIC_PORTFOLIO':
      return action.payload;
    default:
      return state;
  }
};

export default portfolioPublicReducer;
