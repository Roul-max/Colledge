export const errorHandler = (err, req, res, next) => {
  console.error("=== GLOBAL ERROR HANDLER ===");
  console.error("Path:", req.path);
  console.error("Method:", req.method);
  console.error("Body:", JSON.stringify(req.body, null, 2));
  console.error("Error name:", err.name);
  console.error("Error message:", err.message);
  console.error("Error stack:", err.stack);

  const isBadRequest = err.name === 'ValidationError' || err.name === 'CastError';
  const statusCode = err.statusCode || err.status || (isBadRequest ? 400 : 500);
  const message = err.message || "Internal Server Error";
  
  return res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
};
