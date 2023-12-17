const express = require("express");

const router = express.Router();

const sessionController = require("../controllers/sessionController");
const groupController = require("../controllers/groupController");
const teamController = require("../controllers/teamController");
const sportController = require("../controllers/sportController");
const playerController = require("../controllers/playerController");

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

// Sport Routes
router.get("/sports", sportController.sport_list);

router.post("/sport/create", sportController.sport_create_post);

router.post("/sport/:id/update", sportController.sport_update_post);

router.post("/sport/:id/delete", sportController.sport_delete_post);

// Team Routes
router.get("/teams", teamController.team_list);

router.post("/team/create", teamController.team_create_post);

router.post("/team/:id/update", teamController.team_update_post);

router.post("/team/:id/delete", teamController.team_delete_post);

// Player Routes
router.get("/players", playerController.player_list);

router.post("/player/create", playerController.player_create_post);

router.post("/player/:id/update", playerController.player_update_post);

router.post("/player/:id/delete", playerController.player_delete_post);

module.exports = router;
