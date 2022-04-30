const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')

//Connect to database
connectDB()

// Routes
const appointments = require('./routes/appointments')
const auth = require('./routes/auth')

const app = express()

// Body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/appointments', appointments)
app.use('/api/v1/auth', auth)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

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
