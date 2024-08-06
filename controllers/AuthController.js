const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.resgiter = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        console.log("req.body", req.body);

        const checkEmail = await User.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({
                message: "email da duoc su dung"
            })
        }
        var hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        const newUser = User.create({
            username,
            email,
            password: hashedPassword
        })
        if (!newUser) {
            return res.status(400).json({
                message: "Dang ky that bai"
            })
        }
        return res.status(200).json({
            message: "Dang ky thanh cong"
        })
    } catch (error) {
        return res.status(500).json({
            message: "loi server"
        })
    }
}
exports.login = async (req, res) => {
    try {
        //lấy thông tin email/password
        const { email, password } = req.body;
        //Kiểm tra email có tồn tại trong hệ thống không?
        const user = await User.findOne({ email });
        if (!user) { //nếu ko tồn tại user
            return res.status(400).json({ message: 'Email ko tồn tại' });
        }
        //Kiểm tra password
        const checkedPassword = await bcrypt.compare(password, user.password);
        if (!checkedPassword) {
            return res.status(400).json({ message: 'Sai thông tin đăng nhập' });
        }
        //tạo token
        // jwt.sign(data, secretKey, {expiresIn: })
        //expiresIn: 60*60*24 | expiresIn: '1h'|'1d' 
        const token = jwt.sign({ id: user.id }, '123456', { expiresIn: 60 * 60 });
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token
        })
    } catch {
        res.status(400).json({ message: 'Something went wrong' });
    }
}