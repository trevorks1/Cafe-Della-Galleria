import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid } from '@material-ui/core';
import PublicPortfolioList from '../PublicPortfolioList/PublicPortfolioList';

class PublicArtistGalleryPage extends Component {
  state = {
    heading: 'Artist Gallery',
  };
  componentDidMount() {
    console.log(this.props.match.params.artist_id);
    this.props.dispatch({
      type: 'GET_PORTFOLIO_PUBLIC',
    });
  }

  render() {
    return (
      <div className="container">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>{this.state.heading}</h2>
            <PublicPortfolioList></PublicPortfolioList>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PublicArtistGalleryPage);
