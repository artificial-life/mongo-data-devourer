module.exports = function (getUser) {
	return function (username, password) {
		return getUser({
				username: username
			})
			.then((users) => {
				let user = users[0];
				if (!user) {
					return Promise.reject(new Error('Incorrect username.'));
				}
				if (password != "123456") {
					return Promise.reject('Incorrect password.');
				}
				return {
					success: true,
					user: user
				};
			})
			.catch(err => {
				return {
					success: false,
					reason: err.message
				};
			});
	}
}
