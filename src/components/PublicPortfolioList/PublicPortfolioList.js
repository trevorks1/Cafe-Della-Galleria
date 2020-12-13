import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PortfolioListItem from '../PortfolioListItem/PortfolioListItem';
import { Grid } from '@material-ui/core';

class PublicPortfolioList extends Component {
  render() {
    return (
      <div className="container">
        <Grid container spacing={3}>
          {this.props.store.publicPortfolio.map((item, index) => {
            return (
              <Grid item xs={3}>
                <PortfolioListItem portfolio={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PublicPortfolioList);
