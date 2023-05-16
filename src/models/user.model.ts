import mongoose, { Schema, model, ObjectId } from 'mongoose';
var bcrypt = require('bcryptjs');

interface USER {
    _id?: ObjectId;
    email: string;
    password?: string;
}

const userSchema = new mongoose.Schema<USER>({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});
userSchema.pre('save', async function (next) {
    let user = this;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword
    }
    next();
});

const userModel = model<USER>('User', userSchema);


const createUser = async (user: USER): Promise<USER> => {
    const newUser = new userModel(user);
    await newUser.save();
    return newUser;
};

const getUserByEmail = async (email: string): Promise<USER | null> => {
    // console.log("find one",await userModel.count() == 0);
    // save default user 
    if (await userModel.count() == 0) {
        const user: USER = {
            email: "admin@dev.com",
            password: "password"
        }
        createUser(user)
    }
    const user: USER | null = await userModel.findOne({ email: email }).exec();
    return user;
};

const getUserById = async (_id: string): Promise<USER | null> => {
    const user: USER | null = await userModel.findOne({ _id: _id }).exec();
    return user;
};

const updateUser = async (user: USER): Promise<USER | null> => {
    const updatedUser: USER | null = await userModel
        .findOneAndUpdate({ email: user.email }, user, {
            new: true,
        })
        .exec();
    return updatedUser;
};

export {
    USER,
    createUser,
    getUserByEmail,
    getUserById,
    updateUser,
};
