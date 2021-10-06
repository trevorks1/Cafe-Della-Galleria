import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Grid, Card, Box, CardContent } from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

import './LandingPage.css';

// CUSTOM COMPONENTS

// Material-UI styles
const muiStyles = (theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontsize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

class LandingPage extends Component {
  state = {
    heading: 'Welcome to Cafe Della Galleria!',
  };

  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">
        <h1 className="heading-lp">My Portfolio</h1>
        <Box mt={4}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <p>
                    About
                  </p>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(muiStyles)(LandingPage));
