import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import PortfolioListItem from '../PortfolioListItem/PortfolioListItem';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class PortfolioList extends Component {
  render() {
    return (
      <div>
        {this.props.store.portfolio.map((item, index) => {
          return <PortfolioListItem portfolio={item} />;
        })}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PortfolioList);
