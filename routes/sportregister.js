const express = require("express");

const router = express.Router();

const sessionController = require("../controllers/sessionController");
const groupController = require("../controllers/groupController");

// Session Routes
router.get("/sessions", sessionController.session_list);

router.post("/session/create", sessionController.session_create_post);

router.post("/session/:id/update", sessionController.session_update_post);

router.post("/session/:id/delete", sessionController.session_delete_post);

// Group Routes
router.get("/groups", groupController.group_list);

router.post("/group/create", groupController.group_create_post);

router.post("/group/:id/update", groupController.group_update_post);

router.post("/group/:id/delete", groupController.group_delete_post);

module.exports = router;
