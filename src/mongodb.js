const mongoose = require('mongoose');

const initMongoDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://enmanuel:cd%25%25in07@cluster0-ohfo7.mongodb.net/test?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    return 'Connected to mongoDB cluster!';
  } catch (err) {
    // Improvement: make this catch useful
    throw err;
  }
};

module.exports = initMongoDB;
