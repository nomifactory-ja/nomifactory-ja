import * as gulp from "gulp";
import zipNomifactoryJa from "./tasks/zip";
import buildResourcePack from "./tasks/build";

export const build = gulp.series(buildResourcePack, zipNomifactoryJa);

export { zipNomifactoryJa, buildResourcePack };
