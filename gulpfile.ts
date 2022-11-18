import * as gulp from "gulp";
import zipNomifactoryJa from "./tasks/zip";
import buildResourcePack from "./tasks/build";
import makeArtifactNames from "./tasks/makeArtifactNames";

export const build = gulp.series(buildResourcePack);
export const zip = gulp.series(zipNomifactoryJa);

export const publish = gulp.series(build, zip); // not work, help me

export { zipNomifactoryJa, buildResourcePack, makeArtifactNames };
