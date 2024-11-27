import express from "express";

const router = express.Router();
router.get("/", (req, res) => {
  const name = req.query.name || "Guest";
  res.render("home", { title: "Home Page", name });
});

router.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

export default router;
