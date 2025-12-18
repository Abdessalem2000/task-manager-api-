// src/units/index.js

const { StatusCodes } = require('http-status-codes');

// 1. تعريف الخطأ الأساسي (Custom API Error)
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// 2. تعريف خطأ عدم المصادقة (401)
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED); // 401
  }
}

// 3. تصدير الأخطاء
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  // ... يمكنك إضافة المزيد من الأخطاء هنا لاحقاً
};