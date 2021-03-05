import passport from 'passport';
import local from './localStrategy';
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from '@/database';
import bcrypt from 'bcrypt';

export default () => {
	passport.serializeUser(async (isAdmin, done) => {
		done(null, {
			isAdmin,
		});
	});
	passport.deserializeUser((isAdmin, done) => {
		done(null, { isAdmin });
	});
	local();
};
