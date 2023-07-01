import 'dotenv/config';

const PORT = process.env.PORT || 3001;
const password = process.env.PASSWORD_DB || '';

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? `mongodb+srv://StaTov:${password}@studydb.fm8xxzq.mongodb.net/myAppTest?retryWrites=true&w=majority`
    : `mongodb+srv://StaTov:${password}@studydb.fm8xxzq.mongodb.net/myApp?retryWrites=true&w=majority`;

export default { PORT, MONGODB_URI };