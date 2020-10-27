module.exports = {
	renderLogin: (req, res) => {
		res.render('login')
	},

	login: (req, res) => {
		if(req.user.type === 'admin') {
			res.redirect('/dictionary/admin')
		} else {
			res.redirect('/login')
		}
	},

	renderPanel: (req, res) => {
		res.render('admin-panel')
	}
}