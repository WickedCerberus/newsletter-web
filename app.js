const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const url = "https://us17.api.mailchimp.com/3.0/lists/ac337d29b5/";
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const apiKey = process.env.API_KEY;

  app.post("/failure", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
  });

  const jsonData = JSON.stringify(data);

  axios
    .post(url, jsonData, {
      headers: { Authorization: "Bearer <TOKEN>" },
      auth: {
        user: "TJ",
        password: apiKey,
      },
    })
    .then(
      (response) => {
        res.sendFile(__dirname + "/success.html");
        console.log(response);
      },
      (error) => {
        res.sendFile(__dirname + "/failure.html");
        console.log(error);
      }
    );
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});
