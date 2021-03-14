import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="ko">
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<meta name="description" content="INJAE's PLAYGROUND" />
					<meta property="og:url" content="https://www.injae.kr" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
