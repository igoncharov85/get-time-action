const core = require('@actions/core');
const dayjs = require('dayjs');
const dayjsPluginUTC = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(dayjsPluginUTC);
dayjs.extend(timezone);

async function main() {
	try {
		const timezone = core.getInput('timeZone');// default: 0
		const formatStr = core.getInput('format');// default: ''
		console.log('time zone: ', timezone);
		console.log('time format: ', formatStr);

		let str;
		if (Number.isInteger(timezone)) {
			console.log("Offset: ", timezone);
			str = dayjs().utcOffset(timezone).format(formatStr);
			console.log("Via Offset: ", str);
		} else {
			console.log("TZ: ", timezone);
			str = dayjs().tz(timezone).format(formatStr);
			console.log("Via TZ: ", str);
		}

		core.setOutput("time", str);

	} catch (error) {
		core.setFailed(error.message);
	}
}

main();
