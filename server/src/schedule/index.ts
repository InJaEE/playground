import schedule from 'node-schedule';
// import { crawlEplPlayerData } from '@/crawler/epl.crawler';
import { deleteNoneExistsImage } from '@/schedule/blog.schedule';

export default () => {
	schedule.scheduleJob('0 * * * * * ', () => {
		// crawlEplPlayerData();
		console.log('Schedule run! 0 * * * * * ', new Date().getSeconds());
	});
	schedule.scheduleJob('1 * * * * * ', () => {
		console.log('Schedule run! 1 * * * * * ', new Date().getSeconds());
	});
	schedule.scheduleJob('2 * * * * * ', () => {
		console.log('Schedule run! 2 * * * * * ', new Date().getSeconds());
	});
	schedule.scheduleJob('3 * * * * * ', () => {
		console.log('Schedule run! 3 * * * * * ', new Date().getSeconds());
	});
	schedule.scheduleJob('4 * * * * * ', () => {
		console.log('Schedule run! 4 * * * * * ', new Date().getSeconds());
	});
	schedule.scheduleJob('5 * * * * * ', () => {
		console.log('Schedule run! 5 * * * * * ', new Date().getSeconds());
	});
	schedule.scheduleJob('30 * * * * * ', () => {
		// deleteNoneExistsImage();
		console.log('Schedule run! 30 * * * * *');
	});
};
