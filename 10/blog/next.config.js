/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase, { defaultConfig }) => {
	// 개발
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			reactStrictMode: true,
			env: {},
		};
	}

	//
	return {
		reactStrictMode: true,
		env: {},
	};
};

module.exports = nextConfig;
