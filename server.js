require("./models/connectMongo");
const express = require("express");
const userController = require("./controllers/userController");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyparser = require("body-parser");

const app = express();

// // Handlebars middleware
// app.engine('handlebars', exphbs( {defaultLayout: 'main'})); //layout has to be called main.layout
// app.set('view engine', 'handlebars');


// // Body Parser Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: false })) // handle form submission

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// endpoint for the userController. This is for USER CRUD operations
app.use("/user", userController);


/* 
these are all sub-endpoints (api) within the /user endpoint
get(/): renders user/addOrEdit (ex. localhost:5000/user/)
post(/): inserts or updates users given the data

get(/list): will retrieve a list of users (ex. localhost:5000/user/list)
get(/:id): pass in an id to get specific user (ex. localhost:5000/user/2)

get(/delete/:id): this will delete user specified by the id (ex. localhost:5000/delete/420)
*/

//Orders and products coming soon!
 
//css connection ( cs:go connection )
app.use(express.static(path.join(__dirname, '/public')));

//views handlebars connections
app.set("views", path.join(__dirname, "/views/"));

//controllers handlebars
app.use(express.static(path.join(__dirname,'/controllers')));


app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
    allowProtoMethodsByDefault: true,
  })
);
app.set("view engine", "hbs");

// Homepage route
app.get('/', (req, res) => {
    res.render('index', {}) 
});

//app.set("views", path.join(__dirname, "/views/layouts"));

//access to myAccount inside layout folder
app.get('/myAccount', function(req, res) {
  res.render('layouts/myAccount');
});

//access to login inside layout folder
app.get('/login', function(req, res) {
  res.render('layouts/login');
});

//access to register inside layout folder
app.get('/register', function(req, res) {
  res.render('layouts/register');
});

//access to about inside layout folder
app.get('/about', function(req, res) {
  res.render('layouts/about');
});

//access to editMyAccount inside layout folder
app.get('/editMyAccount', function(req, res) {
  res.render('layouts/editMyAccount');
});

//access to changeMyPassword inside layout folder
app.get('/changeMyPassword', function(req, res) {
  res.render('layouts/changeMyPassword');
});

// ------------------------------------------
//app.set("views", path.join(__dirname, "../user"));
//access to list inside user folder
app.get('/list', function(req, res) {
  res.render('user/list', {});
});

//access to the addOrEdit.hbs
app.get('/addOrEdit', function(req, res) {
  res.render('user/addOrEdit');
});

//listens in on port 5000
app.listen("5000", () => {
  console.log("Express Server started at port : 5000");
});

// when user goes to root directory
// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/login.html"));
// });

// set static folder (needed so express can handle file types)
//app.use(express.static(path.join(__dirname, "public")));

// // Homepage route
// app.get("/", (req, res) => {
//   res.render("/mainLayouts");
// });

// //test
// app.use("/", (req, res) => {
//   res.send("Hello World! This is the home page.");
// });
// //test
// app.get("/", (req, res, next) => {
//   res.send("Welcome Home");
// });