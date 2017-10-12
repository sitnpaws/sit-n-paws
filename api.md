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

### API to signup:

`/signup` POST

### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __username__ |  The username as input by the user | String | "brianG123" |
| __password__  |  The user's desired password as input by the user   | String | "writer123" |
| __email__  |  Date to start the stay in UTC format  |  String  | "brianG@random.edu" |

#### Example JSON

##### Request format

```JSON
{
   "username": "brianG123",
   "password": "writer123",
   "email": "brianG@random.edu"
}
```

##### Response format

```JSON
{
   "_": "?",
   "__": "?",
   "___": "?"
}
```

---



```JSON
{
   "username": "brianG123",
   "password": "writer123",
   "email": "brianG@random.edu",
   "name": "Brian Griffin",
   "phone": "555-235-1234",
   "address": "31 Spooner Street"
}
```



---

### Listing in the Database

```JSON
{
   "name": "Say Swinglehurst",
   "zipcode": 94123,
   "dogSizePreference": "small",
   "dogBreedPreference": "ROSIE",
   "dogTemperamentPreference": "Expanded",
   "dogActivityPreference": "fusce",
   "homeAttributes": "Support",
   "hostPictures": "https://randomuser.me/api/portraits/men/55.jpg",
   "homePictures": "https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg",
   "cost": 57
}
```