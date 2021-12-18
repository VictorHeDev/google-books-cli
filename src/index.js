require('dotenv').config();
const fetch = require('node-fetch');
// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);
const prompt = require('prompt');

prompt.start();

prompt.get(['title'], async (err, result) => {
  console.log('CLI input received: ');
  console.log('title:' + result.title);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${result.title}&key=${process.env.API_KEY}`
  );

  const books = await response.json();
  const items = books.items;

  for (let i = 0; i < 5; i++) {
    console.log(items[i].volumeInfo.title);
  }

  // console.log(items);
});

// rl.question('What book title do you want to search for?', async (res) => {
//   const response = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=${process.env.API_KEY}`
//   );
//   // console.log(process.env);
//   console.log(await response.json());
//   // console.log(`Your name is: ${res}`);
//   rl.close();
// });
