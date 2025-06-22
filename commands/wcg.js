js
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
    const sender = m.sender;

    if (!isOwner) return conn.reply(m.chat, '*❌ Only the bot owner can use this command.*', m);

    if (args[0] === 'stop') 
      if (!wcg.gameActive) return conn.reply(m.chat, '*⚠️ No game is running.*', m);
      wcg =  ...wcg, gameActive: false, players: [], round: 1, wordLength: 3, longestWord: ”, currentTurn: 0 ;
      return conn.reply(m.chat, '*🛑 Game stopped.*', m);
    

    if (wcg.gameActive) return conn.reply(m.chat, '*⚠️ A game is already active.*', m);

    wcg.mode = args[0] === 'hard' ? 'hard' : 'easy';
    wcg.players = [];
    wcg.gameActive = true;
    wcg.round = 1;
    wcg.wordLength = 3;
    wcg.longestWord = ”;
    wcg.currentTurn = 0;

    conn.reply(m.chat, '*🎮 Word Chain Game started! Type `join` to enter. You have 30s.*', m);

    let joinMsg = await conn.sendMessage(m.chat,  text: '*⏳ 30s to join! Type `join`.*' );

    const joinInterval = setInterval(() => 
      conn.sendMessage(m.chat,  text: '*⌛ 10s reminder! Type `join` to enter.*' );
    , 10000);

    setTimeout(() => 
      clearInterval(joinInterval);
      if (wcg.players.length < 2) 
        wcg.gameActive = false;
        return conn.sendMessage(m.chat,  text: '*❌ Not enough players. Game cancelled.*' );
      
      runRound(conn, m);
    , 30000);
  ,async onMessage(m,  conn ) 
    const text = m.body?.toLowerCase();
    const sender = m.sender;

    if (!wcg.gameActive) return;

    if (text === 'join'        !wcg.players.includes(sender)) 
      wcg.players.push(sender);
      return conn.reply(m.chat, `*✅{m.pushName} joined the game!*`, m);
    }

    if (wcg.players[wcg.currentTurn] === sender && wcg.awaitingWord) {
      wcg.awaitingWord = false;
      clearTimeout(wcg.timeout);

      if (!text || typeof text !== 'string') return;

      if (text.length < wcg.wordLength) {
        conn.reply(m.chat, '*⚠️ Too short! Try harder next round.*', m);
      } else {
        const valid = await isValidWord(text);
        if (!valid) {
          conn.reply(m.chat, '*⚠️ Word not found in My dictionary.*', m);
        } else {
          if (text.length > wcg.longestWord.length) wcg.longestWord = text;
        }
      }

      wcg.currentTurn++;
      if (wcg.currentTurn >= wcg.players.length) {
        wcg.round++;
        wcg.currentTurn = 0;
        setTimeout(() => runRound(conn, m), 2000);
      } else {
        setTimeout(() => promptPlayer(conn, m), 2000);
      }
    }
  },
};

async function runRound(conn, m) {
  const time = calculateTime(wcg.round, wcg.mode);
  wcg.wordLength = calculateWordLength(wcg.round);conn.sendMessage(m.chat, { text: `*📘 Round wcg.round: Send a word with at least{wcg.wordLength} letters. Each has times!*` );
  wcg.currentTurn = 0;
  setTimeout(() => promptPlayer(conn, m), 2000);


function promptPlayer(conn, m) 
  const player = wcg.players[wcg.currentTurn];
  conn.sendMessage(m.chat,  text: `*🗣️{player.split('@')[0]} it’s your turn. Send a word!*` });

  wcg.awaitingWord = true;
  wcg.timeout = setTimeout(() => {
    conn.sendMessage(m.chat, { text: `*⏱️ player.split('@')[0] ran out of time. Eliminated!*` );
    wcg.players.splice(wcg.currentTurn, 1);

    if (wcg.players.length < 2) 
      conn.sendMessage(m.chat,  text: `*🏆 Game Over. Winner:{wcg.players[0]?.split('@')[0] || 'None'}*\n*🔠 Longest word: ${wcg.longestWord || 'N/A'}*` });
      wcg.gameActive = false;
    } else {
      if (wcg.currentTurn >= wcg.players.length) wcg.currentTurn = 0;
      runRound(conn, m);
    }
  }, calculateTime(wcg.round, wcg.mode) * 1000);
}
