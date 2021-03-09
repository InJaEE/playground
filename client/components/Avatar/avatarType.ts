// 선택한 HTML 유사 배열에서 value 뽑아내기
// function solution(tagArr) {
// 	return Array.from(tagArr).map(v => v.value);
// }

const top = [
	'NoHair',
	'Eyepatch',
	'Hat',
	'Hijab',
	'Turban',
	'WinterHat1',
	'WinterHat2',
	'WinterHat3',
	'WinterHat4',
	'LongHairBigHair',
	'LongHairBob',
	'LongHairBun',
	'LongHairCurly',
	'LongHairCurvy',
	'LongHairDreads',
	'LongHairFrida',
	'LongHairFro',
	'LongHairFroBand',
	'LongHairNotTooLong',
	'LongHairShavedSides',
	'LongHairMiaWallace',
	'LongHairStraight',
	'LongHairStraight2',
	'LongHairStraightStrand',
	'ShortHairDreads01',
	'ShortHairDreads02',
	'ShortHairFrizzle',
	'ShortHairShaggyMullet',
	'ShortHairShortCurly',
	'ShortHairShortFlat',
	'ShortHairShortRound',
	'ShortHairShortWaved',
	'ShortHairSides',
	'ShortHairTheCaesar',
	'ShortHairTheCaesarSidePart',
];
const accessories = [
	'Blank',
	'Kurt',
	'Prescription01',
	'Prescription02',
	'Round',
	'Sunglasses',
	'Wayfarers',
];
/*
const hatColor = [
	'Black',
	'Blue01',
	'Blue02',
	'Blue03',
	'Gray01',
	'Gray02',
	'Heather',
	'PastelBlue',
	'PastelGreen',
	'PastelOrange',
	'PastelRed',
	'PastelYellow',
	'Pink',
	'Red',
	'White',
];
*/
const facialHair = [
	'Blank',
	'BeardMedium',
	'BeardLight',
	'BeardMagestic',
	'MoustacheFancy',
	'MoustacheMagnum',
];
const facialHairColor = [
	'Auburn',
	'Black',
	'Blonde',
	'BlondeGolden',
	'Brown',
	'BrownDark',
	'Platinum',
	'Red',
];
const clothes = [
	'BlazerShirt',
	'BlazerSweater',
	'CollarSweater',
	'GraphicShirt',
	'Hoodie',
	'Overall',
	'ShirtCrewNeck',
	'ShirtScoopNeck',
	'ShirtVNeck',
];
const colorFabric = [
	'Black',
	'Blue01',
	'Blue02',
	'Blue03',
	'Gray01',
	'Gray02',
	'Heather',
	'PastelBlue',
	'PastelGreen',
	'PastelOrange',
	'PastelRed',
	'PastelYellow',
	'Pink',
	'Red',
	'White',
];
const eyes = [
	'Close',
	'Cry',
	'Default',
	'Dizzy',
	'EyeRoll',
	'Happy',
	'Hearts',
	'Side',
	'Squint',
	'Surprised',
	'Wink',
	'WinkWacky',
];
const eyebrow = [
	'Angry',
	'AngryNatural',
	'Default',
	'DefaultNatural',
	'FlatNatural',
	'RaisedExcited',
	'RaisedExcitedNatural',
	'SadConcerned',
	'SadConcernedNatural',
	'UnibrowNatural',
	'UpDown',
	'UpDownNatural',
];
const mouth = [
	'Concerned',
	'Default',
	'Disbelief',
	'Eating',
	'Grimace',
	'Sad',
	'ScreamOpen',
	'Serious',
	'Smile',
	'Tongue',
	'Twinkle',
	'Vomit',
];
const skin = ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black'];

// get Random Avatar Style
export default () => {
	const computeRandom = (length: number) => {
		return Math.floor(Math.random() * length);
	};
	return {
		topType: top[computeRandom(top.length)],
		accessoriesType: accessories[computeRandom(accessories.length)],
		hairColor: facialHairColor[computeRandom(facialHairColor.length)],
		facialHairType: facialHair[computeRandom(facialHair.length)],
		clotheType: clothes[computeRandom(clothes.length)],
		clotheColor: colorFabric[computeRandom(colorFabric.length)],
		eyeType: eyes[computeRandom(eyes.length)],
		eyebrowType: eyebrow[computeRandom(eyebrow.length)],
		mouthType: mouth[computeRandom(mouth.length)],
		skinColor: skin[computeRandom(skin.length)],
	};
};
