import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '@/database';
import bcrypt from 'bcrypt';

export default () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
			},
			async (email, password, done) => {
				const admin = await prisma.user.findFirst({
					where: {
						role: 'admin',
					},
				});
				const confirmPassword = await bcrypt.compare(password, admin.password);
				if (confirmPassword) {
					done(null, true);
				} else {
					console.log('#$#$$#$#');
					done(null, false);
				}
			},
		),
	);
};
