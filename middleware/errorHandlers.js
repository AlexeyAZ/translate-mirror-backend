exports.logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
}

exports.clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send(err);
  } else {
    next(err);
  }
}

exports.errorHandler = (err, req, res, next) => {
  res.status(500);
  res.send(err);
}