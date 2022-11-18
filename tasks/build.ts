import { src, dest } from "gulp";
import buildConfig from "../buildConfig";
import through from "through2";
import path from "path";

export default async function buildResourcePack() {
	return src("src/**/*")
		.pipe(replaceNLToNewLine())
		.pipe(replaceTagToSection())
		.pipe(dest(buildConfig.destinationDirectory));
}

function replaceTagToSection() {
	return through.obj((file, enc, cb) => {
		if (path.extname(file.path) == ".lang") {
			file.contents = Buffer.from(file.contents.toString().replace(/<(.)\1>/g, "§$1"));
		}
		return cb(null, file);
	});
}

function replaceNLToNewLine() {
	return through.obj((file, enc, cb) => {
		if (path.extname(file.path) == ".lang") {
			file.contents = Buffer.from(file.contents.toString().replace(/<nl>/g, "%n"));
		}
		return cb(null, file);
	});
}
