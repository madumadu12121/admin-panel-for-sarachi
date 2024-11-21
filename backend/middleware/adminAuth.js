const adminAuth = (req, res, next) => {
    const adminToken = req.headers['x-admin-token'];
    if (adminToken === process.env.ADMIN_TOKEN) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized: Admin access required' });
    }
};

module.exports = adminAuth;
