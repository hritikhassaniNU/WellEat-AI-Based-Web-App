import jwt from 'jsonwebtoken';

/**
 * Middleware for authenticating requests using JWT (JSON Web Tokens).
 * Ensures that a valid token is provided in the `Authorization` header.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @param {function} next - The next middleware function in the stack.
 */
export default function auth(req, res, next) {
  try {
    // extract the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    // verify the token using the secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user's ID to the request object for downstream use
    req.user = verified.id;

    // call the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}
