# Sit-n-paws API

## API

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

### API to create and retrieve Listings

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

## Database collections

### Stay in stays collection

#### Fields
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| ***_id*** |  Id representing this specific stay | String | "354673bv46736bv" |
| __listingId__  |  The Id of the associated listing   | String | "5426g3bv4673b4673" |
| __guestId__  |  The Id of the guest who will be staying |  String  | "f354987hnc39870n7c3y5" |
| __startDate__ |  The start date of the stay in UTC | String | "2016-05-18T16:00:00Z" |
| __status__  |  The end date of the stay in UTC | String | "2016-05-18T16:00:00Z" |
| __hostRating__  |  The rating given to the stay by the host |  Number  | 5 |
| __guestRating__  |  The rating given to the stay by the guest |  Number  | 5 |
| __pricePer__  |  The average price per night the guest is paying |  Number  | 76.77 |
| __totalPrice__  |  The total price the guest is paying |  Number  | 76.77 |

```JSON
{
  "_id": "2340k728234jjf87",
  "listingId": "3cv45765nb75467",
  "guestId": "3vg5980u34cvg5",
  "startDate": "2016-05-18T16:00:00Z",
  "endDate": "2016-05-18T16:00:00Z",
  "status": "pending, confirmed, closed, cancelled",
  "hostRating": 5,
  "guestRating": 5,
  "pricePer": 33.99,
  "totalPrice": 76.77
}
```

### Listing in listings collection

#### Fields
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __name__ |  The host's username | String | "brianG123" |
| __zipcode__  |  The zipcode of the listing   | String | "95024" |
| __dogSizePreference__  |  The dog's size preferred by the host |  String  | "Small" |
| __dogBreedPreference__ |  The dog's breed preferred by the host | String | "Beagle" |
| __dogTemperamentPreference__  |  The dog's temperament preferred by the host   | String | "Nice" |
| __dogActivityPreference__  |  The dog's level of activity preferred by the host |  String  | "calm" |
| __homeAttributes__  |  Words to describe the home |  String  | "Apartment" |
| __hostPictures__  |  URL of the image for the Host |  String  | "https://randomuser.me/api/portraits/men/55.jpg" |
| __homePictures__  |  URL of the image for the listing |  String  | "https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg" |
| __cost__  |  The user's address as input by the user |  Number  | 57.99 |

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
   "cost": 57.99
}
```

### User is Users Collection

#### Fields
| param |   description   | data type | examples |
|------------|-----------|------------|-----------|
| __username__ |  The user's username as input by the user | String | "brianG123" |
| __password__  |  The user's password as input by the user   | String | "writer123" |
| __email__  |  The user's email as input by the user |  String  | "brianG@random.edu" |
| __name__ |  The user's name as input by the user | String | "Brian Griffin" |
| __phone__  |  The user's phone number as input by the user   | String | "555-235-1234" |
| __address__  |  The user's address as input by the user |  String  | "31 Spooner Street" |

#### Example user entry
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
