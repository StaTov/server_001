/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

<<<<<<< HEAD
const info = (...params: any[]) => {
=======

const info = (...params: unknown[]) => {
>>>>>>> 2758586ca991d8400fc7cc9dd68f8797092f89c5
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

<<<<<<< HEAD
const error = (...params: any[]) => {
=======
const error = (...params: unknown[]) => {
>>>>>>> 2758586ca991d8400fc7cc9dd68f8797092f89c5
    if (process.env.NODE_ENV !== 'test') {
        console.error(...params);
    }
};

export default { info, error };