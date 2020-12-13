import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Typography } from '@material-ui/core';
import PortfolioList from '../PortfolioList/PortfolioList';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PortfolioGallery extends Component {
  state = {
    heading: 'Gallery',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PORTFOLIO',
    });
  }

  render() {
    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <h2>{this.state.heading}</h2>
            <PortfolioList></PortfolioList>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h4" component="h3">
              {this.props.store.user.username}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PortfolioGallery);
