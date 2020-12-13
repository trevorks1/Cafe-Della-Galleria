import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
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

class PortfolioDetailsPage extends Component {
  state = {
    heading: 'Portfolio Details',
    editForSale: false,
    form: {
      forsale: false,
    },
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_PORTFOLIO_DETAILS',
      payload: this.props.match.params.portfolio_id,
    });
    console.log(this.props.match.params.portfolio_id);
  }

  // handle save
  handleSaveClick = (event) => {
    this.props.dispatch({
      type: 'SAVE_FORSALE',
      payload: {
        ...this.props.store.portfolioDetails,
        ...this.state.form,
        details_id: this.props.match.params.portfolio_id,
      },
    });
    this.setState({
      editForSale: !this.state.editForSale,
    });
  };

  // handle Edit click
  handleEditClick = (event) => {
    this.setState({
      form: {
        forsale: this.props.store.portfolioDetails.forsale,
      },
      editForSale: !this.state.editForSale,
    });
  };

  handleChangeFields = (event, propertyName) => {
    this.setState({
      form: {
        ...this.state.form,
        [propertyName]: event.target.value,
      },
    });
  };

  // Delete handle click
  handleDelete = (event) => {
    this.props.dispatch({
      type: 'DELETE_PORTFOLIO_DETAILS',
      payload: this.props.match.params.portfolio_id,
    });
    this.props.history.push(`/portfolio`);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>{this.props.store.portfolioDetails.title}</h2>
        <Card className={classes.root}>
          {this.props.store.portfolioDetails.url === '' ||
          this.props.store.portfolioDetails.url == null ? (
            <CardMedia
              className={classes.media}
              image="/images/placeholder-image.png"
              title="placeholder"
            />
          ) : (
            <CardMedia
              className={classes.media}
              image={this.props.store.portfolioDetails.url}
              title={this.props.store.portfolioDetails.alt}
            />
          )}
          <CardContent>
            {this.state.editForSale === true ? (
              <>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Is This For Sale</FormLabel>
                  <RadioGroup
                    aria-label="forsale"
                    name="forsale"
                    value={this.state.form.forsale}
                    onChange={(event) =>
                      this.handleChangeFields(event, 'forsale')
                    }
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleSaveClick}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary" component="p">
                  For Sale:
                  {this.props.store.portfolioDetails.forsale === true
                    ? ' Yes'
                    : ' No'}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleEditClick}
                >
                  Edit For Sale
                </Button>
              </>
            )}
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.store.portfolioDetails.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={this.handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(
  withStyles(muiStyles)(PortfolioDetailsPage)
);
