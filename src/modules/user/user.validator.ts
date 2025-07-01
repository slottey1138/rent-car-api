import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("กรุณากรอกชื่อผู้ใช้")
    .isLength({ min: 2 })
    .withMessage("ชื่อผู้ใช้ต้องมีอย่างน้อย 2 ตัวอักษร"),
  body("phone").isMobilePhone("any").withMessage("กรุณาระบุหมายเลขโทรศัพท์"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร"),
];

// export const loginValidator = [
//   body("email").isEmail().withMessage("Valid email is required"),
//   body("password").notEmpty().withMessage("Password is required"),
// ];

// export const forgotPasswordValidator = [
//   body("email").isEmail().withMessage("Valid email is required"),
// ];
// export const resetPasswordValidator = [
//   body("token").notEmpty().withMessage("Reset token is required"),
//   body("newPassword")
//     .isLength({ min: 6 })
//     .withMessage("New password must be at least 6 characters"),
// ];
