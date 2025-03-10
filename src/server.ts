import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.databaseURI as string);
    app.listen(config.port, () => {
      console.log(`Server Running  on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
