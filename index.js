const axios = require('axios');
const { JSDOM } = require('jsdom');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Codeforces API!🚀 To retrieve user data, use the following endpoint: http://localhost:5000/api/{username}');
})


app.get('/api/:user', async (req, res) => {
  const handle = req.params.user;
  const url = `https://codeforces.com/profile/${handle}`;
  try {
    const response = await axios.get(url);
    const html = response.data;
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const usernameElement = document.querySelector('.main-info .rated-user');
    const username = usernameElement ? usernameElement.textContent.trim() : null;

    const contestRatingElement = document.querySelector('.info li:nth-child(1)');
    let currentContestRating = contestRatingElement ? contestRatingElement.textContent.trim() : null;
    currentContestRating = currentContestRating.replace(/^Contest rating:\s*|\s+/g, '');

    let match = currentContestRating.match(/\(([^)]+)\)/);
    let userRank = match ? match[1].split('.')[1] : null;
    userRank = userRank.replace(/\,\d+/, '');

    const friendOfUser = document.querySelector('.info li:nth-child(3)');
    let numberOfFriends = friendOfUser ? friendOfUser.textContent.trim() : null;
    var newText = numberOfFriends.replace(/^Friend of:\s/, '');
    numberOfFriends = newText;

    const contributionElement = document.querySelector('.info li:nth-child(2) span');
    const contribution = contributionElement ? contributionElement.textContent.trim() : null;

    res.status(200).send({
      username,
      userRank,
      currentContestRating,
      numberOfFriends,
      contribution
    })
  }
  catch (error) {
    res.send('User Details Unable to Scrape or User not found');
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
