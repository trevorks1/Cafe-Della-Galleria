import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
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

class PortfolioListItem extends Component {
  handleGoToDetails = (event) => {
    let pagePath = `/details/${this.props.portfolio.id}`;
    if (this.props.store.user.id == null) {
      pagePath = `/artist/details/${this.props.portfolio.id}`;
    }
    this.props.history.push(pagePath);
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.root}>
          <CardActionArea onClick={this.handleGoToDetails}>
            {this.props.portfolio.url === '' ||
            this.props.portfolio.url == null ? (
              <CardMedia
                className={classes.media}
                image="/images/placeholder-image.png"
                title="placeholder"
              />
            ) : (
              <CardMedia
                className={classes.media}
                image={this.props.portfolio.url}
                title={this.props.portfolio.alt}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                {this.props.portfolio.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                For Sale: {this.props.portfolio.forsale === true ? 'Yes' : 'No'}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={this.handleGoToDetails}
            >
              See Details
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(
  connect(mapStoreToProps)(withStyles(muiStyles)(PortfolioListItem))
);
