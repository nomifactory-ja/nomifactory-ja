import buildConfig from "../buildConfig";
import { appendFileSync } from "fs";

export default async function makeArtifactNames(): Promise<void> {
	const body = makeArtifactNameBody(`${buildConfig.name}-for-${buildConfig.currentTarget}-lang`);

	if (process.env.GITHUB_OUTPUT) {
		appendFileSync(process.env.GITHUB_OUTPUT, `lang=${body}\n`);
		console.log(`lang=${body}`);
	} else {
		console.log(`::set-output name=lang::${body}`);
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
