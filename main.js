"use strict";
import { execFileSync } from "child_process";
import fs from "fs";
import scribe from "scribe.js-ocr";
import util from "util";

function scribeCategory(mime_type) {
	if (mime_type === "application/pdf") return "pdfFiles";
	if (mime_type.startsWith("image/")) return "imageFiles";
	if (mime_type === "text/xml") return "ocrFiles";  // HOCR

	throw new Error(`Unrecognized guessed mime type: ${mime_type}`);
}

const cli = {
	"lang": {short: "l", type: "string", multiple: true, default: ["eng"]},
	"format": {type: "string", default: "hocr"}
}

async function main() {
	const {values} = util.parseArgs({options: cli});
	console.error(values)

	const file = fs.readFileSync(0);
	const mime_type = execFileSync("file", ["--brief", "--mime-type", "-"], {input: file}).toString().trim();
	const category = scribeCategory(mime_type);

	console.error("mime type:", mime_type)
	console.error("category:", category)

	let result;

	try {
		await scribe.init({font: true});
		await scribe.importFiles({[category]: [file.buffer]})
		await scribe.recognize({langs: values.lang})
		result = await scribe.exportData(values.format)
	}
	finally {
		await scribe.terminate()
	}

	fs.writeFileSync(1, result)
}

await main()
