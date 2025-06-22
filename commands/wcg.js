```js
const axios = require('axios');

let wcg = {
  players: [],
  gameActive: false,
  mode: 'easy',
  round: 1,
  wordLength: 3,
  longestWord: '',
  currentTurn: 0,
  owner: '2347016462267@s.whatsapp.net', // replace with your WhatsApp ID
};

function calculateTime(round, mode) {
  if (mode === 'easy') {
    return round <= 2 ? 40 : 40 - Math.floor((round - 2) / 2) * 5;
  } else {
    return Math.max(10, 40 - (round - 1) * 5);
  }
}

function calculateWordLength(round) {
  return 3 + round - 1;
}

async function isValidWord(word) {
  try {
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/word`);
    return res.status === 200;
   catch 
    return false;
  

module.exports = 
  name: 'wcg',
  async execute(m,  conn, text, command, args, isOwner )
