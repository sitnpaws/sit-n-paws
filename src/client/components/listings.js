// libraries
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// app components
import Search from './search.js';
import ListingsContainer from './listingsContainer.js';

export default class ListingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listings: [] }
    this.handleSearch = this.handleSearch.bind(this);
  }

  // Search - live search by zipcode
  handleSearch = (term) => {
    axios.get(`/listings/${term}`, {headers: {'authorization': this.props.getToken()}})
      .then(resp => {
        console.log('listings search response: ', response);
        this.setState({ listings: resp.data});
      }).catch(err => console.log('Listings search error: ', err));

    // const url = `/listings/${term}`; request.get(url, (err, res) => {  if (err) {  console.log(err); } else { this.setState({ listings:res.body }); } });
  }

  render() {
    return (
      <div className="listings-wrapper">
        <div className="search">
          <Search onChange={this.handleSearch}/>
        </div>
        <ListingsContainer listings={this.state.listings} />
      </div>
    );
  };
}
