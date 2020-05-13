import * as React from 'react';
const cors = require('cors');

module.exports = (app: any) => {
    app.use(cors());
}