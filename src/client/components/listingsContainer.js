import React from 'react';
import PropTypes from 'prop-types';
import ListingView from './listingView';
export default class ListingsContainer extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="wrapper">
        {this.props.listings.map((listing, i) => {


            return (
              <ListingView listing={listing} key={listing.name} />
<<<<<<< HEAD
            )
<<<<<<< HEAD

        })}
=======
          }
        )}
=======
            )}
        })}
>>>>>>> updated working sit-n-paws
>>>>>>> updated working sit-n-paws
      </div>
    );
  };
}

ListingsContainer.propTypes = {listings: PropTypes.array.isRequired};
