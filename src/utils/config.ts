import 'dotenv/config';

const PORT = process.env.PORT || 3001;

<<<<<<< HEAD
const uri = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const MONGODB_URI = uri || 'missing URI';
=======
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? `mongodb+srv://StaTov:${password}@studydb.fm8xxzq.mongodb.net/myAppTest?retryWrites=true&w=majority`
    : `mongodb+srv://StaTov:${password}@studydb.fm8xxzq.mongodb.net/myApp?retryWrites=true&w=majority`;
>>>>>>> 2758586ca991d8400fc7cc9dd68f8797092f89c5

export default { PORT, MONGODB_URI };