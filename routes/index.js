const express = require("express");
const router = express.Router();

// @route   GET /
// @desc    Render welcome page
// @access  Public
router.get("/", (req, res) => {
  res.render("index", { title: "Willkommen" });
});

// @route   GET /dashboard
// @desc    Render dashboard (requires login later)
// @access  Private (TODO: Add auth middleware)
router.get("/dashboard", (req, res) => {
  // TODO: Add auth middleware
  // if (!req.isAuthenticated()) {
  //     req.flash('error_msg', 'Bitte melden Sie sich an.');
  //     return res.redirect('/auth/login');
  // }
  res.render("dashboard", { title: "Dashboard" }); // Müssen wir noch erstellen
});

module.exports = router;
