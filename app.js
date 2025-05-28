require("dotenv").config(); // Lädt die .env-Datei

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const helmet = require("helmet");
const csurf = require("csurf");

const app = express();

// PUG Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Security Middleware (Helmet für grundlegende Sicherheitsheader)
app.use(helmet());

// Body parser, static files
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Cookie nur über HTTPS senden (in Produktion)
      maxAge: 1000 * 60 * 60 * 24, // 1 Tag Gültigkeit (Beispiel)
    },
    // Optional: connect-pg-simple für Sessions in der DB
  }),
);

// CSRF Protection Middleware (NACH session!)
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Passport Initialisierung (NACH session!)
// require('./config/passport')(passport); // Wir konfigurieren das später
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages Middleware
app.use(flash());

// Globale Variablen für PUG Templates
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error"); // Passport setzt Fehler oft hier
  res.locals.currentUser = req.user || null; // Aktuellen User oder null
  res.locals.csrfToken = req.csrfToken(); // CSRF Token für Formulare
  next();
});

// === Routen ===
// Platzhalter - wir fügen die echten Routen später hinzu
const indexRouter = require("./routes/index"); // Beispiel - müssen wir noch erstellen
app.use("/", indexRouter);
// app.use('/auth', require('./routes/authRoutes'));

// === Fehlerbehandlung ===
// 404 Handler
app.use((req, res, next) => {
  res
    .status(404)
    .render("error", {
      title: "Nicht gefunden",
      message: "Seite nicht gefunden",
      error: { status: 404 },
    });
});

// Allgemeiner Fehlerhandler
app.use((err, req, res, next) => {
  // CSRF Fehler behandeln
  if (err.code === "EBADCSRFTOKEN") {
    req.flash(
      "error_msg",
      "Formular ungültig oder abgelaufen. Bitte erneut versuchen.",
    );
    return res.redirect(req.headers.referer || "/");
  }

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  console.error(err.stack); // Loggt den Fehler auf der Konsole
  res.status(err.status || 500);
  res.render("error", {
    title: "Fehler",
    message: err.message,
    error: res.locals.error,
  });
});

module.exports = app;
