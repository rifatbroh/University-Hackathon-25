const bcrypt = require('bcryptjs');

const password = 'hablu123';
bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    console.log(hash); // Use this output for HABLU_PASSWORD_HASH in the .env file
});
