const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});

app.set("view engine", "njk");
app.use(express.urlencoded({ extended: false }));

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query;

  if (!age) {
    return res.redirect("/");
  }

  return next();
};

app.get("/", (req, res) => {
  return res.render("start");
});

app.get("/major", checkAgeQueryParam, (req, res) => {
  // rota para maior de idade
  const { age } = req.query;

  return res.render("major", { age });
});

app.get("/minor", checkAgeQueryParam, (req, res) => {
  // rota para menor de idade
  const { age } = req.query;

  return res.render("minor", { age });
});

app.post("/check", (req, res) => {
  const { age } = req.body;

  if (age >= 18) {
    // condicional para o retorno e redirecionamento
    return res.redirect(`/major?age=${age}`); // para maior de idade
  } else {
    return res.redirect(`/minor?age=${age}`); // para menor de idade
  }
});

app.listen(3000);
