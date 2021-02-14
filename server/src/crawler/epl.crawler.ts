import axios from 'axios';
import cheerio from 'cheerio';
import prisma from '@/database/';

export async function crawlEplPlayerData() {
	const { data: html } = await axios.get(
		'https://sports.news.naver.com/wfootball/record/index.nhn?category=epl&league=100&tab=player',
	);
	const $ = cheerio.load(html);
	const data = $('table tbody tr');
	const arr = [];
	data.each((index, ele) => {
		//console.log(index, $(ele).find('.name').text());
		const children = $(ele).children();
		arr.push({
			rank: $(ele).find('.num .inner').children('strong').text(),
			name: $(ele).find('.name').text(),
			team: $(ele).find('.team').text(),
			goal: $(children[2]).text().substr(30, 2).replace('\n', ''),
			asist: $(children[3]).text().substr(30, 2).replace('\n', ''),
			score_point: $(children[4]).text().substr(30, 2).replace('\n', ''),
			shooting: $(children[5]).text().substr(30, 3).replace('\n', ''),
		});
	});
	const season = $('.record_h span').first().text();
	try {
		await prisma.sports.create({
			data: {
				data_type: 'epl_player',
				season,
				data_contents: { data: arr },
			},
		});
		console.info('EPL_PLAYER 크롤링 성공!');
	} catch (err) {
		console.error(err);
	}
}

export async function crawlEplTeamData() {}
