var path = require('path');

module.exports = {
	renderLogin: (req, res) => {
		res.sendFile('login.html', { root: path.join(__dirname, '../../views')})
	},

	renderRegister: (req, res) => {
		res.sendFile('register.html', { root: path.join(__dirname, '../../views')})
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