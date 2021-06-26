let currPage = currentPage(window.location.href);

function currentPage(currentURL) {
	let splittedUrl = currentURL.split("/");
	return splittedUrl[splittedUrl.length-1].split('#')[0];
}