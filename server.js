"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { stock, customers } = require("./data/promo");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints

  .post("/order", (req, res) => {
    console.log(req.body);
    const {
      order, //shirt, sock, bottle
      size, //shirt only: s, m, l, xl
      givenName,
      surname,
      email,
      address,
      city,
      province,
      postcode,
      country,
    } = req.body;
    // console.log("wassup" + order);
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    let response = { status: "success" }; //setting default succes status.
    if (
      customers.find((customer) => {
        return customer.email === email;
      })
    ) {
      response = {
        status: "error",
        error: "repeat-customer", //Existing Custm
      };
    } else if (country !== "Canada") {
      response = {
        status: "error",
        error: "undeliverable", //Out of delivery zone
      };
    } else if (order === "shirt") {
      if (stock.shirt[size] < 1) {
        response = {
          status: "error",
          error: "unavailable", //  when no size
        };
      }
    } else if (order === "socks") {
      if (stock.socks < 1) {
        response = {
          status: "error",
          error: "unavailable", //  when qty =0
        };
      }
    } else if (order === "bottles") {
      if (stock.bottles < 1) {
        response = {
          status: "error",
          error: "unavailable", //  when qty =0
        };
      }
    }
    res.json(response); //what gets resent
  })

  .get("*", (req, res) => res.send("Dang. 404."))
  .listen(8000, () => console.log(`Listening on port 8000`));
