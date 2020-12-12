import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PublicArtistGalleryPage extends Component {
  state = {
    heading: 'Artist Gallery',
  };
  componentDidMount() {
    console.log(this.props.match.params.artist_id);
  }
  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PublicArtistGalleryPage);
