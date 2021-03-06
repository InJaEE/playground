export const isAdmin = (req, res, next) => {
	if (req.user?.isAdmin) {
		next();
	}
	res.returnError(403, '접근이 허용되지 않은 사용자입니다.');
};

export const isAuthor = (req, res, next) => {};
