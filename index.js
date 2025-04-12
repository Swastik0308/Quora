const express = require("express");
const { rename } = require("fs");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");//It generates random id
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "swastikshetty",
    content: "Code",
  },
  {
    id: uuidv4(),
    username: "viratkholi",
    content: "I love playing cricket",
  },
  {
    id: uuidv4(),
    username: "sunilchetri",
    content: "I love playing Football",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  //   console.log(req.body);
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id); //It will find the mathching post with id
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/posts/:id" , (req,res)=>{
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
