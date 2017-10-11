# Sit-n-paws API

## Database collections

### Stay in stays collection

```JSON
{
  "_id": "2340k728234jjf87",
  "listingId": "3cv45765nb75467",
  "guestId": "3vg5980u34cvg5",
  "startDate": "2016-05-18T16:00:00Z",
  "endDate": "2016-05-18T16:00:00Z",
  "status": "pending, confirmed, closed, cancelled",
  "hostRating": "",
  "guestRating": "",
  "pricePer": "",
  "totalPrice": ""
}



```

### API request to create initial booking:

`/stays` POST

### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __listingId__ |  The listingID as stored in the listings collection | String | "vw45346b7b3467" |
| __guestId__  |  guestID as stored in the users collection   | String | "asfueihf375y4" |
| __startDate__  |  Date to start the stay in UTC format  |  String  | "2016-05-18T16:00:00Z" |
| __endDate__  |  Date to end the stay in UTC format  |  String  | "2016-05-18T16:00:00Z" |



```JSON
{
  "listingId": "v3456yv456v46",
  "guestId": "f34c56345635f4634",
  "startDate": "2016-05-18T16:00:00Z",
  "endDate": "2016-05-18T16:00:00Z"
}

```
### Response

```JSON
{
  "stayId": "v3456yv456v46",
  "status": "pending"
}

```
