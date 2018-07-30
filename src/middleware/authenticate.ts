export default function authenticate () {
  return function (req, res, next) {
    const authToken = req.get('Authorization')

    if (authToken === process.env.authToken) {
      return next()
    }

    return res.status(403).send('Not authorized')
  }
}
