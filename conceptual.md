### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
- axios and promises

- What is a Promise?
- The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value

- What are the differences between an async function and a regular function?
- An async function always returns a promise, you can use await keyword, etc,.

- What is the difference between Node.js and Express.js?
- Node allows you to run js on the server side, Express is a web application framework. Express is built on top of Node.

- What is the error-first callback pattern?
- The error-first callback pattern is a convention used primarily in Node.js to handle asynchronous operations. This pattern dictates that when you call a function with a callback, the callback should be the last parameter, and the callback function itself should have its first parameter reserved for an error object

- What is middleware?
- It is code that runs in the middle of the request / response cycle. In Express, middleware are functions that get access to the req and res objects and can also call the next function.

- What does the `next` function do?
- it passes controll to the next middleware

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
- it should you Promise.all() instead of fecthing the data sequentially.
- it is using hard-coded URL

```js
async function getUsers() {
  const elie = await $.getJSON("https://api.github.com/users/elie");
  const joel = await $.getJSON("https://api.github.com/users/joelburton");
  const matt = await $.getJSON("https://api.github.com/users/mmmaaatttttt");

  return [elie, matt, joel];
}
```
