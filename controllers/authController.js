const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const signUpUser = async (req, res) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username});
    if (userExists) {
        return res.status(400).json({ message: "User Already Exists" });
}

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "user created successfully!" });

};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "invalid password "});
    }

    res.status(200).json({ message: "Login successful"});
};

module.exports = { signUpUser, loginUser };