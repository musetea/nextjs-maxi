import bcrypt from "bcrypt";
const saltRounds = 10;

export const getHash = async (password: string) => {
	return new Promise<string>(async (resolve, rejcet) => {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				rejcet(err);
				return;
			}
			bcrypt.hash(password, salt, function (err, hash) {
				// Store hash in your password DB.
				if (err) {
					rejcet(err);
				}
				resolve(hash);
			});
		});
	});
};

export const checkHashPassword = (password: string, hasPass: string) => {
	return new Promise<boolean>(async (resolve, reject) => {
		bcrypt.compare(password, hasPass).then(function (result) {
			// result == true
			resolve(result);
		});
	});
};
