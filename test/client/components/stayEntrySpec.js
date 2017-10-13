



const stay = {
  "_id": "2340k728234jjf87",
  "listingId": "3cv45765nb75467",
  "guestId": "3vg5980u34cvg5",
  "hostId": "3vg598ertuciyu",
  "guestName": "Brian Griffin",
  "startDate": "2016-05-18T16:00:00Z",
  "endDate": "2016-05-18T16:00:00Z",
  "status": "pending",
  "pricePer": 33.99,
  "totalPrice": 76.77
}


  //todo: rendered ok
  //todo: is type 'div'
  //todo: Renders with stay details: className = "stayDetail"
  // Date: ${moment(stay.startDate).calendar()}
  // to ${moment(stay.endDate).calendar()}`}
  // {`Price Per Night: $${stay.pricePer}`}
  // {`Total: $${stay.totalPrice}`}




  //todo: make role 'guest', populate with a new stay. Try to cancel.
  //todo: handle put to '/api/stay/cancel/' + this.props.stay._id , headers: {'authorization': this.token}, status: 'cancelled'

  //todo: make role 'host', populate with a new stay. Try to approve.
  //todo: as role: 'host', handle put to '/api/stay/approve/' + this.props.stay._id,, headers: {'authorization': this.token}, status: 'confirmed'

  //todo: make role 'host', populate with a new stay. Try to reject.
  //todo: as role: 'host', handle put to /api/stay/reject/ + stayId, headers: {'authorization': this.token}, status: 'rejected'






//Review not yet implimented

//todo: make role 'host', populate with a new stay, set status to 'complete'. Try to review.
//todo: make role 'guest', populate with a new stay, set status to 'complete'. Try to review.