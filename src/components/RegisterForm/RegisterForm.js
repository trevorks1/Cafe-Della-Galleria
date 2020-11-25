import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    mailing_address: '',
    city: '',
    state: '',
    postal_code: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    this.props.dispatch({
      type: 'REGISTER',
      payload: {
        ...this.state,
      },
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email Address:
            <input
              type="email"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleInputChangeFor('email')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="first_name">
            First Name:
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              required
              onChange={this.handleInputChangeFor('first_name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name">
            Last Name:
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              required
              onChange={this.handleInputChangeFor('last_name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="mailing_address">
            Mailing Address:
            <input
              type="text"
              name="mailing_address"
              value={this.state.mailing_address}
              required
              onChange={this.handleInputChangeFor('mailing_address')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="city">
            City:
            <input
              type="text"
              name="city"
              value={this.state.city}
              required
              onChange={this.handleInputChangeFor('city')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="state">
            State:
            <input
              type="text"
              name="state"
              value={this.state.state}
              required
              onChange={this.handleInputChangeFor('state')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="postal_code">
            Postal Code:
            <input
              type="text"
              name="postal_code"
              value={this.state.postal_code}
              required
              onChange={this.handleInputChangeFor('postal_code')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(RegisterForm);
