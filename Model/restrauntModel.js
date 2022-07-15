import mongoose from 'mongoose';

const newSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    location: {
        type: String,
    },
    capacity: {
        type: Number
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    }

});

export default mongoose.model('Restraunt', newSchema);