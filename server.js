const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extends: false }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//
let data = [
  { email: "mohamedtlili@gmail.com", password: "12345" },
  { email: "aziz@gmail.com", password: "0000" },
];
let token = false;
const logger = (req, res, next) => {
  let { email, password } = req.body;
  let user = data.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password.toLowerCase() === password.toLowerCase()
  );
  if (user) {
    token = true;
    next();
  } else {
    // let err = "WRONG EMAIL OR PASSWORD";
    // res.re(`/login?err=${err}`);
    res.render("login", { error: "WRONG EMAIL OR PASSWORD" });
  }
};

const verifyToken = (req, res, next) => {
  if (token) {
    next();
  } else {
    res.redirect("/login");
  }
};
//routes
app.get("/test", (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  // res.sendFile(path.resolve("public", "index.html"));
  res.render("home");
});
app.get("/about", (req, res) => {
  // res.sendFile(path.resolve("public", "about.html"));
  res.render("about");
});
app.get("/login", (req, res) => {
  let { err } = req.query;
  // res.sendFile(path.resolve("public", "login.html"));
  res.render("login");
});
app.get("/register", (req, res) => {
  // res.sendFile(path.resolve("public", "register.html"));
  res.render("register");
});
app.get("/profil", verifyToken, (req, res) => {
  // res.sendFile(path.resolve("public", "profil.html"));
  res.render("profil");
});
app.get("/error", (req, res) => {
  // res.sendFile(path.resolve("public", "error.html"));
  res.render("error");
});

app.post("/send", logger, (req, res) => {
  res.redirect("/profil");
});
//post
//put
//delete
app.listen(5000, (err) => {
  if (err) throw err;
  console.log("server is runing...");
});
