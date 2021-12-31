# 📚 Welcome to google-books-cli 📚

This is a command line application that will allow the user to query for 5 books using the Google Books API and save/remove them to a personal bookshelf.

### 🏁 Getting started 🏁

These instructions assume that you have already downloaded Git and Node. These are some specific versions I am using:

- [git](https://git-scm.com/downloads)
- [npm 8.1.0](https://docs.npmjs.com/)
- [node v17.0.1](https://nodejs.org/en/)

### 💻 Initial Setup 💻

1. To clone this repo, simply open up your terminal and type in: `git clone git@github.com:VictorHeDev/google-books-cli.git` (or copy and paste)
2. Use your CLI and `cd` into the new directory that was downloaded. For example: `cd google-books-cli`
3. Install the dependencies by running `npm install` or `npm i`
4. Run the application by typing `node .` when you are located in the root directory
   1. If you would like to use it anywhere, you can globally install it: `sudo npm install -g .` and then run `books`

### 💾 Dependencies Used 💾

`Axios`: used to simplify HTTP requests and parse JSON
`Boxen`: used to style Welcome message and Reading List message
`Chalk`: used to make the CLI colorful, pretty, and more pleasant to use
`Dotenv`: used to hide API key (which later I found out I didn't need to make GET requests)
`esm`: used to write ES6 code
`Figlet`: used with Boxen to create pretty ASCI art text
`Inquirer`: (very difficult to spell) used to interact with the CLI and display multiple choice responses instead of having to type directly into the interface
`Jest`: first time trying this JavaScript testing suite

### ⛹🏻‍♂️ MVPs ⛹🏻‍♂️

1. Type in query and it should display a list of 5 books matching that query
   1. First create the initial file structure and research which dependencies I might want to add:
   2. Make an API key in order to use the Google Books API and hide it away into a .env file that will not be pushed to GitHub
   3. Create a welcome message
   4. I can use the Axios library in order to abstract away having to parse the JSON data that is being sent back
   5. I specifically need to save the information about the book's title, author(s), and publisher
2. A user should be able to select a book from the 5 displayed to save to a "Reading List"
   1. What ways can I save this?
      1. Array: which will disappear once the user closes out of the app -- not ideal
      2. In some sort of .txt, .csv, or .json file?
3. Viewing a "Reading List" with all the books the user has selected from their queries--this is a local Reading List that is not attached to Google Book's account
   1. Need to use Inquirer to pull up the list
   2. Need to parse through the list and display it in the CLI

### 💣 Helpful Resources 💣

##### 📜 Documentation 📜

- [Node Documentation](https://nodejs.org/dist/latest-v17.x/docs/api/)
- [Axios](https://www.npmjs.com/package/axios)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Jest](https://jestjs.io/docs/getting-started)
- [Google Books Api](https://developers.google.com/books/docs/v1/getting_started)

##### Additional

- [Weather CLI](https://dev.to/aritik/build-a-weather-cli-tool-using-nodejs-inquirer-and-weatherapi-2f5n)
- [Google Translate CLI](https://dev.to/rushankhan1/build-a-cli-with-node-js-4jbi)
- [Todo List CLI](https://www.digitalocean.com/community/tutorials/how-to-build-command-line-applications-with-node-js)
- [Joke & Quote CLI](https://www.section.io/engineering-education/create-a-nodejs-cli/)
- [Figlet fonts](https://delightlylinux.wordpress.com/2014/05/30/produce-fancy-text-with-figlet/#:~:text=Custom%20Fonts,downloaded%20from%20the%20ftp%20site.)
- [More weather](https://codeburst.io/build-a-command-line-interface-cli-application-with-node-js-59becec90e28)
- [GitHub CLI](https://lo-victoria.com/automate-github-build-a-cli-app-with-nodejs-1)
- [How to use Chalk](https://motion-software.com/blog/color-the-nodejs-terminal-using-chalk-js-or-its-alternative)
- [More Chalk](https://alligator.io/nodejs/styling-output-command-line-node-scripts-chalk/)

### 🧱 Notable issues or roadblocks 🧱

- Having to write JavaScript using ES5 syntax instead of usual ES6 (especially for import/export)
- Choosing a CLI tool -- chose between prompt.js, inquirer.js, commander.js
  - Choosing between a flag interface or a prettier CLI with space and arrow keys
  - Ultimately chose inquirer because I thought it would be the most fun to learn and has the best UI. I like how you can have many different options of inputs to choose from. Namely, I knew that I wanted a main menu interface, a way to select one or multiple books, and even though it wasn't totally necessary I wanted an option to reset the reading list.
- Edge cases and bugs such as parsing what is actually returned from the Google Books API
- Had to downgrade the chalk.js dependency version so I can use the require syntax in the top of the file (see their GitHub repo for more info)
  - Ran into issues using esm and writing tests in jest. I like using the ES6 import/exports, but I also wanted to implement TDD in this project
- Also had to downgrade the boxen version to use require and not import

### 📝 TODO & Notes 📝

- Use chalk.js to create thematic logs
  - [x] Red for errors
  - [x] Green for success messages
- Write validator for query
  - [x] Needs to check for alphanumeric and spaces
  - [x] Regex: /^[a-z0-9]+$/i // used for loop instead for speed
  - [ ] Check to see multiples of the same book are already in the reading list before adding
- Book output
  - Figure out what to do and the colors needed
  - [x] set printType to "books" because we don't want box set collections
- Reading List
  - [x] If reading list is blank when checked, let the user know to add in more books
  - [x] Title by Author(s) published by Publisher format
    - [x] If Author(s) or Publisher is undefined, return an N/A
- Address code review feedback
- [ ] Delete commented out code and overall cleanup of code
- [ ] Edit the checkForValidTitle function to accept certain punctuation characters like: ! ? - : . ,
- [ ] Small bug related to entering a search term where one or more of the returned books do not have any listed authors - try using 'foo'
- [ ] If entered a string of random characters which returns no results, an error message is shown but the prompt to select books from a list is still there. Strange user experience behavior
- [ ] 
