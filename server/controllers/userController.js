const catchAsync = require("../ErrorHandler/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = catchAsync(async (req, res, next) => {});
exports.login = catchAsync(async (req, res, next) => {});
exports.forgetPassword = catchAsync(async (req, res, next) => {});
exports.confirmOTP = catchAsync(async (req, res, next) => {});
exports.passwordReset = catchAsync(async (req, res, next) => {});
exports.updateUser = catchAsync(async (req, res, next) => {});
exports.removeUser = catchAsync(async (req, res, next) => {});
exports.getAllUser = catchAsync(async (req, res, next) => {});
exports.getUserById = catchAsync(async (req, res, next) => {});
