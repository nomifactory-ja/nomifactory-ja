import { message, danger, fail } from "danger";

const validFormatTypes = [
	"00",
	"11",
	"22",
	"33",
	"44",
	"55",
	"66",
	"77",
	"88",
	"99",
	"aa",
	"bb",
	"cc",
	"dd",
	"ee",
	"ff",
	"kk",
	"ll",
	"mm",
	"nn",
	"oo",
	"rr",
	"nl",
];

function render(content: string) {
	const i = content.indexOf("=");
	const splits = [content.slice(0, i), content.slice(i + 1)];
	let newContent = splits[1];

	newContent = newContent.replace(/<nl>/g, "<br>");

	newContent = newContent.replace(/<ff>/g, "</b>");
	newContent = newContent.replace(/<rr>/g, "</b>");
	newContent = newContent.replace(/<(.)\1>/g, "<b>");
	return newContent;
}

danger.git.modified_files.forEach((file) => {
	if (!file.endsWith(".lang")) {
		return;
	}

	danger.git.structuredDiffForFile(file).then((diff) => {
		diff.chunks.forEach((chunk) => {
			chunk.changes.forEach((change) => {
				if (change.type === "add") {
					if (change.content.includes(".desc=")) {
						message(render(change.content), file, change.ln);
					}
					const maybeFormats = [change.content.matchAll(/<(.[a-z]\\?)>/g)];
					maybeFormats.forEach((section) => {
						const formatType = section[1];
						// https://minecraft.fandom.com/ja/wiki/%E8%A3%85%E9%A3%BE%E3%82%B3%E3%83%BC%E3%83%89
						if (!validFormatTypes.includes(formatType))
							fail(`不正なタイプのフォーマットが使われています: <${formatType}>`, file, change.ln);
					});
				}
			});
		});
	});
});
