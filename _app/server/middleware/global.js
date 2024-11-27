// Middleware to set global variables for all EJS templates
const globalVariables = (req, res, next) => {
  res.locals.appName = process.env.SITE_NAME;
  res.locals.startYear = "2024";
  res.locals.year = new Date().getFullYear();
  next();
};

export default globalVariables;
