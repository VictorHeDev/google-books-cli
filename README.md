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

Testing:
Jest?
Mocha?

### MVPs:

1. Type in query and it should display a list of 5 books matching that query
   1. 
2. Each item in the list should include the book's author, title, and publishing company
3. A user should be able to select a book from the 5 displayed to save to a "Reading List"
4. Viewing a "Reading List" with all the books the user has selected from their queries--this is a local Reading List that is not attached to Google Book's account
