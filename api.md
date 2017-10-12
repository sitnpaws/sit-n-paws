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
| __username__ |  The username as input by the user | String | "brianG123" | __Depricated__ |
| __password__  |  The user's desired password as input by the user   | String | "writer123" |
| __email__  |  The user's email address as input by the user |  String  | "brianG@random.edu" |

#### Example JSON

##### Request format

```JSON
{
   "email": "brianG@random.edu",
   "password": "writer123"
}
```

##### Response format

```JSON
{
   "success": true
}
```

### Listings

`/listings` POST

#### Parameters

| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __name__ |  The user's name as input by the user | String | "brianG123" |
| __zipcode__  |  The user's zipcode as input by the user   | String | "writer123" |
| __dogSizePreference__  |  The user's preferred size of dog to host as input by the user |  String  | "small" |
| __dogBreedPreference__ |  The user's preferred breed of dog to host as input by the user | String | "All" |
| __dogTemperamentPreference__  |  The user's preferred temperament of dog to host as input by the user   | String | "chill" |
| __dogActivityPreference__  |  The user's preferred activity level of dog to host as input by the user |  String  | "fast" |
| __homeAttributes__ |  Type of living space as described by the user | String | "apartment" |
| __cost__  |  The cost per night as decided by the user   | Number | 45.99 |


#### Example Request format
```JSON
{
   "name": "Angus Bafford",
   "zipcode": 94106,
   "dogSizePreference": "small",
   "dogBreedPreference": "All",
   "dogTemperamentPreference": "chill",
   "dogActivityPreference": "fast",
   "homeAttributes": "apartment",
   "cost": 45
}
```
#### Example Response format

```JSON
{
   "success": true
}
```

---

### Profile

`/profile` POST

#### Parameters
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __username__ |  The user's username as input by the user | String | "brianG123" |
| __password__  |  The user's password as input by the user   | String | "writer123" |
| __email__  |  The user's email as input by the user |  String  | "brianG@random.edu" |
| __name__ |  The user's name as input by the user | String | "Brian Griffin" |
| __phone__  |  The user's phone number as input by the user   | String | "555-235-1234" |
| __address__  |  The user's address as input by the user |  String  | "31 Spooner Street" |

#### Example Request format
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

#### Example Response format

```JSON
{
   "success": true
}
```

---

### Listing in listings collection

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


