const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use( (request, response, next) => {
  var now = new Date().toString()
  var log = `${now} ${request.method} ${request.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log')
    }
  })
  console.log(log)
  next()
})

// //omit the next() call to prevent the execution of anything after this middleware call
// app.use((request, response, next) => {
//   response.render('maintenance.hbs')
// })

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (request, response) => {
  //response.send('<h1>hello Express</h1>')
  response.render('home.hbs',{
    welcomeMessage: "Welcome to my page!",
    pageTitle: "Home"
  })
})


app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Bad request'
  })
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.');
})
