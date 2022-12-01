const mongoose = require("mongoose")
const Places = require("../models/Place.model")
// Require the models,  Example: (-- const Book = require("../models/Book.model") --)
const User = require("../models/User.model")
const users = [
  {
    email: 'test1@example.com',
    password: '$2b$10$a2YDiiDijLphmQqecAM6Meocvv5l/9AtH/XEwxS5HN/7FEb.LMiLO',
    // 12345Tmb
    name: 'test1',
    userName: 'test1'
  },
  {
    email: 'test2@example.com',
    password: '$2b$10$a2YDiiDijLphmQqecAM6Meocvv5l/9AtH/XEwxS5HN/7FEb.LMiLO',
    name: 'test2',
    userName: 'test2'
  },
  {
    email: 'test3@example.com ',
    password: '$2b$10$a2YDiiDijLphmQqecAM6Meocvv5l/9AtH/XEwxS5HN/7FEb.LMiLO',
    name: 'test3',
    userName: 'test3'
  },
]
const places = [
  {
    name: "Billy Brunch",
    type: "Cafeteria",
    address: "Carrer de Bailèn, 115, 08009 Barcelona ",
    description: "Owners really nice",
    pictures: ["https://res.cloudinary.com/dfajfbnkr/image/upload/v1669810477/Pawsome/305304226_494262039377215_3947761137471617294_n_x6k3xq.jpg"],
    socialMedia: ["https://www.instagram.com/billybrunch/?hl=es"]
  },
  {
    name: "Granja M.Viader",
    type: "Cafeteria",
    address: "Carrer d'en Xuclà, 4, 08001 Barcelona",
    pictures: ["https://res.cloudinary.com/dfajfbnkr/image/upload/v1669817641/Pawsome/viader3_z327gi.jpg", "https://res.cloudinary.com/dfajfbnkr/image/upload/v1669817641/Pawsome/viader2_u81yeh.jpg"],
    sociaMedia: ["https://www.instagram.com/granjaviader/?hl=es"],
  },
  {
    name: "LeccaBaffi",
    type: "Restaurant",
    address: "Carrer de València, 341, 08009 Barcelona",
    pictures: ["https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819099/Pawsome/leccabaffi-barcelona-ristorante-pizzeria-1_sipwyv.jpg","https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819099/Pawsome/48381765_1053406081514412_2645034022735970304_n_bgyxly.jpg"],
    socialMedia: ["https://www.instagram.com/leccabaffibcn/?hl=es"]
  },
  {
    name: "La Nena",
    type: "Cafeteria",
    address: "Carrer de Ramón y Cajal, 36, 08012 Barcelona",
    pictures: ["https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819413/Pawsome/la_nena_ieioqz.jpg", "https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819412/Pawsome/la_nena2_yrkico.jpg"],
    socialMedia: ["https://www.instagram.com/granjalanena/?hl=es"],
  },
  {
    name: "Caelum",
    type: "Cafeteria",
    address: "Carrer de la Palla, 8, 08002 Barcelona",
    socialMedia: ["https://www.instagram.com/caelumbcn/?hl=es"],
  },
  {
    name: "Casa Batlló",
    type: "Museum",
    address: "Passeig de Gràcia, 43, 08007 Barcelona",
    pictures:["https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819636/Pawsome/casa_batllo_mzcalx.png", "https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819635/Pawsome/casa_batllo_sueooc.jpg","https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819635/Pawsome/azotea-590x359_ru0pjx.jpg"],
    socialMedia: ["https://www.casabatllo.es/"],
  },
  {
    name: "Poble Espanyol",
    type: "Museum",
    address: "Av. Francesc Ferrer i Guàrdia, 13, 08038 Barcelona",
    socialMedia: ["https://upload.wikimedia.org/wikipedia/commons/4/41/Poble_Espanyol_-_Torres_de_%C3%81vila.jpg"],
  },
  {
    name: "Playa de Llevant",
    type: "Beach",
    address: "Passeig Marítim del Bogatell, 145, 08005 Barcelona, Madrid",
    pictures: ["https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819899/Pawsome/platja-de-llevant-amb-gossos_xbjxxw.jpg", "https://res.cloudinary.com/dfajfbnkr/image/upload/v1669819899/Pawsome/886483311091316_ewctok.jpg"]
  },
]
const MONGO_URI = "mongodb://localhost:27017/project3"
const createSeeds = async function () {
  try {
    const connect = await mongoose.connect(MONGO_URI)
    console.log(`Connected to database: ${connect.connections[0].name}`)
    // ------------------- Users seeds ---------------------
    const deleteAll = await User.deleteMany()
    console.log("Db clean")
    const createAll = await User.create(users)
    console.log("Users created")
    // ------------------- User seeds ----------------------
    // ------------------- Place seeds ---------------------
    const deleteAllPlaces = await Places.deleteMany()
    console.log("Db clean")
    const createAllPlaces = await Places.create(places)
    console.log("Users created")
    // ------------------- Place seeds ----------------------
    const dbClose = await mongoose.connection.close()
    console.log("Connection closed")
  } catch (err) {
    console.log(`Error creating the seeds: ${err}`)
  }
}
createSeeds()





















