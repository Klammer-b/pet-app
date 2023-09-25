const { Schema, model } = require('mongoose');

const regexpList = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [regexpList.email, 'Email must be valid'],
    },
    role: {
      type: String,
      enum: ['admin', 'guest'],
      default: 'guest',
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = model('users', userSchema);

module.exports = UserModel;
