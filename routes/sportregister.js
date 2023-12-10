const express = require("express");

const router = express.Router();

const sessionController = require("../controllers/sessionController");

// Session Routes
router.get("/sessions", sessionController.session_list);

router.post("session/create", sessionController.session_create_post);

router.post("session/:id/update", sessionController.session_update_post);

router.post("session/:id/delete", sessionController.session_delete_post);

module.exports = router;
