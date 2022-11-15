import zip from "gulp-zip";
import gulp from "gulp";
import upath from "upath";
import buildConfig from "../buildConfig";

const kebabCase = (string) =>
	string
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();

async function zipFolder(path: string, zipName: string = upath.basename(path) + ".zip"): Promise<void> {
	return new Promise((resolve) => {
		console.log(zipName);
		gulp
			.src(upath.join(path, "**"), { nodir: true, base: path, dot: true })
			.pipe(zip(zipName))
			.pipe(gulp.dest(buildConfig.buildDestinationDirectory))
			.on("end", resolve);
	});
}

function makeZipper(src: string, artifactName: string) {
	const zipFn = () => {
		return zipFolder(upath.join(src), `${kebabCase(artifactName)}.zip`);
	};

	Object.defineProperty(zipFn, "name", {
		value: `zip${artifactName}`,
		configurable: true,
	});

	return zipFn;
}

export default makeZipper(upath.join(buildConfig.destinationDirectory), "NomifactoryJa");
