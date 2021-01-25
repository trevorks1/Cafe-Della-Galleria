import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

// Material-ui
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  amber,
  lightGreen,
  deepOrange,
  lime,
  lightBlue,
  green,
} from '@material-ui/core/colors';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import PublicArtistGalleryPage from '../PublicArtistGalleryPage/PublicArtistGalleryPage';
import PortfolioGalleryPage from '../PortfolioGalleryPage/PortfolioGalleryPage';
import PortfolioDetailsPage from '../PortfolioDetailsPage/PortfolioDetailsPage';
import AddNewPortfolioPage from '../AddNewPortfolioPage/AddNewPortfolioPage';
import PublicDetailsPage from '../PublicDetailsPage/PublicDetailsPage';

import './App.css';

const customTheme = createMuiTheme({
  // theme settings
  palette: {
    type: 'light',
    primary: amber,
    secondary: lightGreen,
    error: deepOrange,
    warning: lime,
    info: lightBlue,
    success: green,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <ThemeProvider theme={customTheme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              <Route
                exact
                path="/artist/details/:portfolio_id"
                component={PublicDetailsPage}
              />

              <Route exact path="/artist" component={PublicArtistGalleryPage} />

              <ProtectedRoute
                exact
                path="/edit"
                component={AddNewPortfolioPage}
              />

              <ProtectedRoute
                exact
                path="/details/:portfolio_id"
                component={PortfolioDetailsPage}
              />

              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/portfolio"
                component={PortfolioGalleryPage}
              />

              <ProtectedRoute
                // with authRedirect:
                // - if logged in, redirects to "/user"
                // - else shows LoginPage at /login
                exact
                path="/login"
                component={LoginPage}
                authRedirect="/portfolio"
              />
              <ProtectedRoute
                // with authRedirect:
                // - if logged in, redirects to "/user"
                // - else shows RegisterPage at "/registration"
                exact
                path="/registration"
                component={RegisterPage}
                authRedirect="/portfolio"
              />
              <ProtectedRoute
                exact
                path="/home"
                component={HomePage}
                authRedirect="/portfolio"
              />

              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default connect()(App);
