// controllers/userController.js
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    const {  name,email, password } = req.body;
    console.log(req.body);
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
        });

        // Save user to the database
        await user.save();

        // Send response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                name:user.name,
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { name, profession, salary, isInvesting } = req.body;
    const userId = req.params.id;

    try {
        // Find user by ID and update
        const user = await User.findByIdAndUpdate(
            userId,
            { name, profession, salary, isInvesting },
            { new: true, runValidators: true }  // new: return updated document, runValidators: validate on update
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the updated user data as response
        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.name,
                profession: user.profession,
                salary: user.salary,
                isInvesting: user.isInvesting,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            user:{
                id:user._id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// // Get current user (protected route)
// exports.getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json({
//             name: user.name,
//             email: user.email,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
