import authMid from "./auth.mid.js";

const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) res.status(403).send();
  return next();
};

export default [authMid, adminMid];
