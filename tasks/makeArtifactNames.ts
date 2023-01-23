import buildConfig from "../buildConfig";
import { appendFileSync } from "fs";

function getDatetimeStr(datetime: Date): string {
	const year = datetime.getFullYear();
	const month = (datetime.getMonth() + 1).toString().padStart(2, "0");
	const day = datetime.getDate().toString().padStart(2, "0");
	const hour = datetime.getHours().toString().padStart(2, "0");
	const minute = datetime.getMinutes().toString().padStart(2, "0");
	const second = datetime.getSeconds().toString().padStart(2, "0");

	const datetimeStr = `${year}${month}${day}${hour}${minute}${second}`;

	return datetimeStr;
}

export default async function makeArtifactNames(): Promise<void> {
	const datetime = new Date();
	const datetimeStr = getDatetimeStr(datetime);
	const body = makeArtifactNameBody(`${buildConfig.name}-${datetimeStr}-for-${buildConfig.currentTarget}`);

	if (process.env.GITHUB_OUTPUT) {
		appendFileSync(process.env.GITHUB_OUTPUT, `artifact-name=${body}\n`);
		console.log(`artifact-name=${body}`);
	} else {
		console.log(`::set-output name=artifact-name::${body}`);
	}
}

function makeArtifactNameBody(baseName: string): string {
	// If the tag is provided by CI, simply just glue it to the base name.
	if (process.env.GITHUB_TAG) {
		return `${baseName}-${process.env.GITHUB_TAG}`;
	}
	// RC.
	else if (process.env.RC_VERSION) {
		return `${baseName}-${process.env.RC_VERSION.replace(/^v/, "")}-rc`;
	}
	// If SHA is provided and the build isn't tagged, append both the branch and short SHA.
	else if (process.env.GITHUB_SHA && process.env.GITHUB_REF && process.env.GITHUB_REF.startsWith("refs/heads/")) {
		const shortCommit = process.env.GITHUB_SHA.substr(0, 7);
		const branch = /refs\/heads\/(.+)/.exec(process.env.GITHUB_REF);
		return `${baseName}-${branch[1]}-${shortCommit}`;
	} else {
		return baseName;
	}
}
