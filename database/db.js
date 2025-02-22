import mongoose from 'mongoose';

const Connection = async (URL) => {


  try {
    await mongoose.connect(URL, {
      
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default Connection;


