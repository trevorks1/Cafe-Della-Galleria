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
} from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class AddNewPortfolioPage extends Component {
  state = {
    heading: 'Portfolio Editing',
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
      <div>
        <h2>{this.state.heading}</h2>
        <TextField
          label="Title"
          onChange={(event) => this.handleChangeFields(event, 'title')}
          required={true}
        ></TextField>
        <TextField
          label="Description"
          onChange={(event) => this.handleChangeFields(event, 'description')}
          required={true}
        ></TextField>
        <FormControl component="fieldset">
          <FormLabel component="legend">Is This For Sale</FormLabel>
          <RadioGroup
            aria-label="forsale"
            name="forsale"
            value={this.state.form.forsale}
            onChange={(event) => this.handleChangeFields(event, 'forsale')}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="genre"
          onChange={(event) => this.handleChangeFields(event, 'genre')}
          required={true}
        ></TextField>
        <TextField
          label="image url"
          onChange={(event) => this.handleChangeFields(event, 'images')}
          required={true}
        ></TextField>
        <TextField
          label="image description"
          onChange={(event) => this.handleChangeFields(event, 'alt')}
          require={true}
        ></TextField>
        <Button onClick={this.handleSave} variant="contained" color="primary">
          Submit
        </Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddNewPortfolioPage);
