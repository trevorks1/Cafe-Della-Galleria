import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {} from '@material-ui/core';
import PortfolioList from '../PortfolioList/PortfolioList';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PortfolioGallery extends Component {
  state = {
    heading: 'Gallery Images',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PORTFOLIO',
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <PortfolioList></PortfolioList>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PortfolioGallery);
