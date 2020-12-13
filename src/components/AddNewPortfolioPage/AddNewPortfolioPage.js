import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Grid,
} from '@material-ui/core';

class AddNewPortfolioPage extends Component {
  state = {
    heading: 'Adding a new Item',
    form: {
      title: '',
      description: '',
      forsale: true,
      genre: '',
      images: '',
      alt: '',
      url: '',
    },
  };

  handleSave = (event) => {
    this.props.dispatch({
      type: 'SAVE_ART_DETAILS',
      payload: this.state.form,
    });
    this.props.history.push('/portfolio');
  };

  handleChangeFields = (event, propertyName) => {
    this.setState({
      form: {
        ...this.state.form,
        [propertyName]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2>{this.state.heading}</h2>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Title"
              onChange={(event) => this.handleChangeFields(event, 'title')}
              required={true}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Description"
              onChange={(event) =>
                this.handleChangeFields(event, 'description')
              }
              required={true}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Is This For Sale</FormLabel>
              <RadioGroup
                aria-label="forsale"
                name="forsale"
                value={this.state.form.forsale}
                onChange={(event) => this.handleChangeFields(event, 'forsale')}
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
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="genre"
              onChange={(event) => this.handleChangeFields(event, 'genre')}
              required={true}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="image url"
              onChange={(event) => this.handleChangeFields(event, 'images')}
              required={true}
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="image description"
              onChange={(event) => this.handleChangeFields(event, 'alt')}
              require={true}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={this.handleSave}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddNewPortfolioPage);
