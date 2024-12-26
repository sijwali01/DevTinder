const adminAuth = (req, res, next) => {
    const token = "abc";
    const isAdminAuthorized = token === "abc";
    if (!isAdminAuthorized) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
        res.send('hello Admin ')
      next();
    }
}

module.exports = adminAuth;