const bcrypt = require('bcryptjs');

const encrypt = {};

encrypt.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const passwordhashed = await bcrypt.hash(password, salt);
    return passwordhashed;
}

encrypt.comparePassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error);
    }
}

module.exports = encrypt;