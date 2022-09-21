export default (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
