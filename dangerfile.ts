import { message, danger, fail } from "danger";

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
					if (change.content.includes("</")) {
						fail("記載ミスがあります。`</`", file, change.ln);
					}
					if (change.content.includes("<br>")) {
						fail("記載ミスがあります。`<br>`", file, change.ln);
					}
					if (change.content.includes("<a>")) {
						fail("記載ミスがあります。`<a>`", file, change.ln);
					}
				}
			});
		});
	});
});
