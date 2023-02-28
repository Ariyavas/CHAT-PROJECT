import express from "express";
import {
  Questionrequest,
  ShowFAQs,
  Answerrequest,
  ShowAns,
} from "../controllers/Controller_Qa";
import { verifytoken } from "../middleware/validateJWTtoken";

const router = express.Router();

router.post("/createquestion", verifytoken, Questionrequest);
router.get("/showquestion", verifytoken, ShowFAQs);
router.post("/createans", verifytoken, Answerrequest);
router.get("showanswer", verifytoken, ShowAns);

export = router;
