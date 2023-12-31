import mongoose from 'mongoose';
import Role from './role';
import ShippingAddress from './shippingAddress';
import Order from './order';
import Cart from './cart';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: {
            validator: function (value) {
                return value.includes('@');
            }
        }
    },
    password: {
        type: String,
        required: 'Password is required',
    },
    signup_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    last_login_at: {
        type: Date
    },
    shipping_address: {
        type: mongoose.Types.ObjectId,
        ref: "ShippingAddress"
    },
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }],
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    }
})

const User = mongoose.model("User", userSchema);

export default User;