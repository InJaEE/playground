import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="ko">
				<Head>
					<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
					<meta name="description" content="INJAE's PLAYGROUND" />
					<meta property="og:url" content="https://www.injae.kr" />
					<link
						rel="stylesheet"
						href="//cdn.jsdelivr.net/highlight.js/8.7/styles/tomorrow-night-eighties.min.css"
					/>
					<script src="//cdn.jsdelivr.net/highlight.js/8.7/highlight.min.js"></script>
					<script>hljs.initHighlightingOnLoad();</script>
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
