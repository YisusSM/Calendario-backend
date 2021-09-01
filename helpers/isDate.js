const moment = require('moment');

const isDate = (value, { req, location, path }) => {
    if (!value) {
        return false;
    }
    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else return false;
}


// const dateStartAndEnd = (value, { req }) => {
    
//     const { start, end } = req.body;
//     const mStart = new Date(start).toLocaleString();
//     const mEnd = new Date(end).toLocaleString();
  
//     if (mStart < mEnd) {
//         return true;
//     } else {
//         return false;
//     }

// }

module.exports = { isDate };


