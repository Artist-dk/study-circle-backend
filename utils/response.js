function success(res, data, statusCode = 200) {
  res.status(statusCode).json({ success: true, data });
}

function created(res, data) {
  success(res, data, 201);
}

function error(res, error, statusCode = 500) {
  res.status(statusCode).json({ success: false, error: error.message || error });
}

function notFound(res, message) {
  error(res, message, 404);
}

function unauthorized(res, message) {
  error(res, message, 401);
}

module.exports = {
  success,
  created,
  error,
  notFound,
  unauthorized,
};