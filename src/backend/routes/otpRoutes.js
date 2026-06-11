import express from "express";
import Otp from "../models/Otp.js";

const router = express.Router();

// SEND OTP
router.post("/send-otp", async (req, res) => {
try {
const { mobile } = req.body;

```
const otp = Math.floor(
  100000 + Math.random() * 900000
).toString();

await Otp.deleteMany({ mobile });

await Otp.create({
  mobile,
  otp,
});

console.log(
  "======================="
);
console.log("OTP =", otp);
console.log(
  "======================="
);

res.status(200).json({
  success: true,
  message: "OTP Sent Successfully",
});
```

} catch (error) {
console.error(error);

```
res.status(500).json({
  success: false,
  message: "Server Error",
});
```

}
});

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
try {
const { mobile, otp } = req.body;

```
const record = await Otp.findOne({
  mobile,
  otp,
});

if (!record) {
  return res.status(400).json({
    success: false,
    message: "Invalid OTP",
  });
}

await Otp.deleteMany({ mobile });

res.status(200).json({
  success: true,
  message: "OTP Verified Successfully",
});
```

} catch (error) {
console.error(error);

```
res.status(500).json({
  success: false,
  message: "Server Error",
});
```

}
});

export default router;
