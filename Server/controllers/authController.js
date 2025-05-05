const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const habluEmail = process.env.HABLU_EMAIL;
    const habluPasswordHash = process.env.HABLU_PASSWORD_HASH;

    if (email !== habluEmail) {
        return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, habluPasswordHash);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.status(200).json({
        message: 'Login successful',
        token,
    });
};
