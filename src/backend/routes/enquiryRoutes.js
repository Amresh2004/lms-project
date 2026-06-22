import express from "express";

import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create New Enquiry
|--------------------------------------------------------------------------
*/
router.post("/create", createEnquiry);

/*
|--------------------------------------------------------------------------
| Get All Enquiries (Admin)
|--------------------------------------------------------------------------
*/
router.get("/all", getAllEnquiries);

/*
|--------------------------------------------------------------------------
| Update Enquiry Status
|--------------------------------------------------------------------------
*/
router.put("/update/:id", updateEnquiryStatus);

/*
|--------------------------------------------------------------------------
| Delete Enquiry
|--------------------------------------------------------------------------
*/
router.delete("/delete/:id", deleteEnquiry);

export default router;import express from "express";

import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Create New Enquiry
|--------------------------------------------------------------------------
*/
router.post("/create", createEnquiry);

/*
|--------------------------------------------------------------------------
| Get All Enquiries (Admin)
|--------------------------------------------------------------------------
*/
router.get("/all", getAllEnquiries);

/*
|--------------------------------------------------------------------------
| Update Enquiry Status
|--------------------------------------------------------------------------
*/
router.put("/update/:id", updateEnquiryStatus);

/*
|--------------------------------------------------------------------------
| Delete Enquiry
|--------------------------------------------------------------------------
*/
router.delete("/delete/:id", deleteEnquiry);

export default router;