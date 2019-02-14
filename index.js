#!/usr/bin/env node

const fs = require('fs');
const validator = require("email-validator");
const env = require("dotenv");
const promptly = require('promptly');
const axios = require('axios')


promptly.prompt("Enter your e-mail. and i'll see if it's real: ").then(myGivenEmail => {


  fs.writeFileSync(".env", "GIVEN_EMAIL = " + myGivenEmail);

  env.config();

  let emailValid = validator.validate(process.env.GIVEN_EMAIL);

  console.log(emailValid);

  if (emailValid) {

    axios.get("https://haveibeenpwned.com/api/v2/breachedaccount/kwintenolaerts@hotmail.com", {
        headers: {
          'User-Agent': 'lerr-tester'
        }
      })
      .then(function(response) {
        // handle success
        console.log(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
  }


});
