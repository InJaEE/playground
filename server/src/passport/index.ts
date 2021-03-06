import passport from 'passport';
import local from './localStrategy';

export default () => {
	passport.serializeUser(async (isAdmin, done) => {
		done(null, {
			isAdmin,
		});
	});
	passport.deserializeUser((isAdmin, done) => {
		done(null, isAdmin);
	});
	local();
};
