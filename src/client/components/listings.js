// libraries
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// app components
import Search from './search.js';
import ListingEntry from './listingEntry.js';

export default class Listings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listings: [] }
    this.handleSearch = this.handleSearch.bind(this);
  }

  // Search - live search by zipcode
  handleSearch(term) {
    axios.get(`/api/listings/${term}`, {headers: {'authorization': this.props.getToken()}})
      .then(resp => {
        console.log('listings search response: ', response);
        this.setState({ listings: resp.data});
      }).catch(err => console.log('Listings search error: ', err));
      // holding onto this until i can get to testing -> const url = `/listings/${term}`; request.get(url, (err, res) => {  if (err) {  console.log(err); } else { this.setState({ listings:res.body }); } });
  }

  render() {
    return (
      <div className="listings-wrapper">
        <div className="search">
          <Search onChange={this.handleSearch}/>
        </div>
        <div className="wrapper">
          {this.state.listings.map((listing, i) => (<ListingEntry listing={listing} key={listing.name} />))}
          {this.state.listings.length === 0 ? <div className="messageBox"><h2><em>Please Try A Different Zipcode</em></h2></div> : ''}
        </div>
      </div>
    );
  };
}
