import zip from "gulp-zip";
import gulp from "gulp";
import upath from "upath";
import buildConfig from "../buildConfig";
import through2 from "through2";

const kebabCase = (string) =>
	string
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase();

async function zipFolder(path: string, zipName: string = upath.basename(path) + ".zip"): Promise<void> {
	return new Promise((resolve) => {
		gulp
			.src(upath.join(path, "**"), { nodir: true, base: path, dot: true })
			.pipe(
				through2.obj((file, enc, cb) => {
					return cb(null, file);
				}),
			)
			.pipe(zip(zipName))
			.pipe(gulp.dest(buildConfig.buildDestinationDirectory))
			.on("end", resolve);
	});
}

function makeZipper(src: string, artifactName: string) {
	const zipFn = () => {
		return zipFolder(upath.join(src), `${kebabCase(artifactName)}-for-${buildConfig.currentTarget}.zip`);
	};

	Object.defineProperty(zipFn, "name", {
		value: `zip${artifactName}`,
		configurable: true,
	});

	return zipFn;
}

export default makeZipper(upath.join(buildConfig.destinationDirectory), "NomifactoryJa");
