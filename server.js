const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//Connect to database
connectDB()

// Routes
const appointments = require('./routes/appointments')

const app = express()

// Body parser
app.use(express.json())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/appointments', appointments)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
// const server =
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// //Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`)
//   //Close server and exit process
//   server.close(() => process.exit(1))
// })
