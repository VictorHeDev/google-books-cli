# Welcome to google-books-cli

This is a command line application that will allow the user to query for 5 books using the Google Books API and save/remove them to a personal bookshelf.

### Getting started

These instructions assume that you have already downloaded Git and Node. These are some specific versions I am using:

npm 8.1.0
node v17.0.1

1. To clone this repo, simply open up your terminal and type in: `git clone git@github.com:VictorHeDev/google-books-cli.git` (or copy and paste)
2. Use your CLI and `cd` into the new directory that was downloaded. For example: `cd google-books-cli`
3. Install the dependencies by running `npm install` or `npm i`

### Dependencies used:

Axios: used to simplify HTTP requests and parse JSON
Chalk: used to make the CLI colorful, pretty, and more pleasant to use
Inquirer: (very difficult to spell) used to interact with the CLI and display multiple choice responses instead of having to type directly into the interface


Testing:
Jest?
Mocha?

### MVPs:

1. Type in query and it should display a list of 5 books matching that query
   1. First create the initial file structure and research which dependencies I might want to add:
   2. Make an API key in order to use the Google Books API and hide it away into a .env file that will not be pushed to GitHub
   3. Create a welcome message
   4. I can use the axios library in order to abstract away having to parse the JSON data that is being sent back
   5. I specifically need to save the information about the book's title, author(s), and publisher
2. A user should be able to select a book from the 5 displayed to save to a "Reading List"
   1. What ways can I save this?
      1. Array: which will disappear once the user closes out of the app -- not ideal
      2. In some sort of .txt, .csv, or .json file?
3. Viewing a "Reading List" with all the books the user has selected from their queries--this is a local Reading List that is not attached to Google Book's account
   1. Need to use Inquirer to pull up the list
   2. Need to parse through the list and display it in the CLI
