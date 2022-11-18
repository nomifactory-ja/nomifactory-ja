import * as gulp from "gulp";
import zipNomifactoryJa from "./tasks/zip";
import buildResourcePack from "./tasks/build";
import makeArtifactNames from "./tasks/makeArtifactNames";

export const build = gulp.series(
	buildResourcePack,
	// dirty hack to make zip task catch dest directory, was the interval between zip task runs too short?
	(done) => {
		setTimeout(() => {
			done();
		}, 100);
	},
	zipNomifactoryJa,
);

export { zipNomifactoryJa, buildResourcePack, makeArtifactNames };
