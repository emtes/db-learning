const mongoose = require('mongoose')

const initMongoDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`,
  { useNewUrlParser: true, useUnifiedTopology: true })
		console.log('Connected to mongoDB cluster!')
	} catch (err) {
		console.error(err)
		throw err
	}
}

