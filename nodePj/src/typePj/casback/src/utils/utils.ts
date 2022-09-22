export function createUrlList(url: string) {
	let full: string = ""
	let list: Array<string> = []
	url
		.split("/:")
		.filter((com) => com !== "")
		.forEach((component) => {
			full = full + "/:" + component
			list.push(full)
		})
	return list
}