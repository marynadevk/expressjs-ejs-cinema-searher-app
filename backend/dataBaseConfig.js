import mongoDb from 'mongodb';

export const CollectionsNames = {
  MOVIES: 'moviesList',
  MOVIE_DETAILS: 'movieDetails',
  PEOPLE: 'people',
}

const MongoClient = mongoDb.MongoClient;
let db;

export const connectToDb = async () => {
  MongoClient.connect(process.env.DB_URL, (err, client) => {
    db = client.db(process.env.DB_NAME);
  });
}

export const fillDatabase = async () => {
    const database = await connectToDb();

    const moviesCollection = database.collection(CollectionsNames.MOVIES);
    await moviesCollection.deleteMany({});
    await moviesCollection.insertMany(movies);

    const peopleCollection = database.collection(CollectionsNames.PEOPLE);
    await peopleCollection.deleteMany({});
    await peopleCollection.insertMany(people);

    const movieDetailsCollection = database.collection(CollectionsNames.MOVIE_DETAILS);
    await movieDetailsCollection.deleteMany({});
    await movieDetailsCollection.insertMany(movieDetails);
}

export const getCollection = (collectionName) => {
  return db.collection(collectionName);
}
