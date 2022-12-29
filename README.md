# Pawsome (back-end)

Looking for a pet-friendly beach? How about an awesome museum, shopping center or cafe?

Pawsome is the new great mobile app for helping tourist and people living in Barcelona to find hotels, attractions, and restaurants that welcome pets. 

Find a pet-friendly place in Barcelona more easily than ever. Search hotels near you, and sort by distance, popularity, rating, price.

You can share pics of your pet and you can even create new places and leave reviews of your favorite pet-friendly attractions.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```

## Models

### User

Users in the database have the following properties:

```js
{
  "userName": String,
  "name":String
  "email": String,
  "password": String,
  "createdPlaceId":Array,
  "reviewId":Array,
  "favorite":Array,
  "pet":Array,
  
}
```

---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { name, userName, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/verify    |   | Private |
| GET places   | GET    | /api/home   |   | Public |
| GET favorites in user   | GET     | /api/Favorites  |   | Private |
| DELETE favorites in user   | DELETE    | /api/favoriteID   |   | Private |
| GET My Places in user   | GET     | /api/profile/MyPlaces  |   | Private |
| DELETE My Places  in user   | DELETE    | /api/favoriteID   |   | Private|
| GET My Pet in user   | GET     | /api/pet-profile  |   | Private |
| DELETE My Pet  in user   | DELETE    | /api/pet-profile/petID |   | Private|
---

## Technologies

<p align="center">

<img src="https://img.shields.io/badge/-javascript-F7DF1E?&style=for-the-badge&logo=javascript&logoColor=black" />
<img src="https://img.shields.io/badge/-ReactJS-grey?&style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/-css3-1572B6?&style=for-the-badge&logo=css3&logoColor=white" />

</p>
