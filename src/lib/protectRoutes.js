module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.redirect('/login');
        }
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/profile');
        }
    }
}