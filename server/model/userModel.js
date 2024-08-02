const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer,photographer,admin"],
      default: "customer",
    },
    profilePicture: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    address: { type: String },
    bio: { type: String },
    social_links: { type: String },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  // this.confirmPassword = undefined;
  next();
});

// for checking the correctness of customer password for logging them in .
customerSchema.methods.correctPassword = async function (
  candidatePassword,
  password
) {
  return await bcrypt.compare(candidatePassword, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
