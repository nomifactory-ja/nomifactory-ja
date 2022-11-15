import * as gulp from "gulp";
import zipNomifactoryJa from "./tasks/zip";
import buildResourcePack from "./tasks/build";
import makeArtifactNames from "./tasks/makeArtifactNames";

export const build = gulp.series(buildResourcePack);

export { zipNomifactoryJa, buildResourcePack, makeArtifactNames };
