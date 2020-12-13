import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@material-ui/core';

import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    root: {
      maxwidth: 250,
    },
    media: {
      height: 350,
      backgroundSize: 'contain',
    },
  });

class PublicDetailsPage extends Component {
  state = {
    heading: 'Portfolio Details',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PUBLIC_DETAILS',
      payload: this.props.match.params.portfolio_id,
    });
    console.log(this.props.match.params.portfolio_id);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <h2>{this.props.store.publicPortfolioDetails.title}</h2>
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <Card className={classes.root}>
              {this.props.store.publicPortfolioDetails.url === '' ||
              this.props.store.publicPortfolioDetails.url == null ? (
                <CardMedia
                  className={classes.media}
                  image="/images/placeholder-image.png"
                  title="placeholder"
                />
              ) : (
                <CardMedia
                  className={classes.media}
                  image={this.props.store.publicPortfolioDetails.url}
                  title={this.props.store.publicPortfolioDetails.alt}
                />
              )}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  For Sale:
                  {this.props.store.publicPortfolioDetails.forsale === true
                    ? ' Yes'
                    : ' No'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {this.props.store.publicPortfolioDetails.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(
  withStyles(muiStyles)(PublicDetailsPage)
);
