const mongoose = require('mongoose');
const { server } = require('./socket.js');

module.exports = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongodb ga muvaffaqiyatli ulanish hosil qilindi...')
        const port = process.env.PORT || 3000;
        server.listen(port, () => console.log(`http://localhost:${port}`));
    } catch (error) {
        console.log('Mongodb ga ulanishda xatolik...', error);
    }
}