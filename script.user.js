// ==UserScript==
// @name        WordPress UI Tweaks
// @icon        data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 888.9 888.9' fill='%2332373c'%3E%3Cpath d='M0 0a333.3 333.3 0 1 1 0-666.7A333.3 333.3 0 0 1 0 0m0-20c42.3 0 83.3-8.3 122-24.6a313.4 313.4 0 0 0 99.6-67.2 313.3 313.3 0 0 0 67.1-99.6 311.3 311.3 0 0 0 24.6-122c0-42.2-8.2-83.3-24.6-121.9a313.3 313.3 0 0 0-67.1-99.6A313.3 313.3 0 0 0 122-622 311.3 311.3 0 0 0 0-646.6 311.3 311.3 0 0 0-122-622a313.3 313.3 0 0 0-99.6 67.1 313.4 313.4 0 0 0-67.1 99.6 311.4 311.4 0 0 0-24.6 122c0 42.3 8.2 83.3 24.6 122a313.4 313.4 0 0 0 67.1 99.5A313.4 313.4 0 0 0-122-44.6 311.4 311.4 0 0 0 0-20' clip-path='url(%23b)' transform='matrix(1.33333 0 0 -1.33333 444.4 0)'/%3E%3Cpath d='M0 0c1.2-8.8 1.9-18.3 1.9-28.6 0-28.1-5.3-59.8-21.2-99.5L-104-373.4A277.6 277.6 0 0 1 0 0m-238.9-157.6-83.3-242.1a277.6 277.6 0 0 1 78.4-11.3c32.4 0 63.4 5.5 92.3 15.7a25.3 25.3 0 0 0-2 3.8zm182.7 38.3c0 34.4-12.4 58.2-23 76.6-14 23-27.2 42.3-27.2 65.2 0 25.5 19.3 49.3 46.6 49.3l3.6-.2a276.7 276.7 0 0 1-187.6 73c-97 0-182.4-49.9-232-125.3l17.8-.3c29 0 74 3.5 74 3.5 15 .9 16.8-21.1 1.8-22.9 0 0-15-1.8-31.8-2.6l101.2-301 60.8 182.4L-295.3-3a509.1 509.1 0 0 0-29.1 2.6c-15 .9-13.2 23.8 1.8 23 0 0 45.8-3.6 73.1-3.6 29 0 74 3.5 74 3.5 15 .9 16.8-21.1 1.8-22.9 0 0-15-1.7-31.8-2.6L-105-301.6l28.7 90.8c12.7 39.7 20.2 67.8 20.2 91.6m-465.3-14c0-110 63.9-205 156.5-250l-132.5 363a276.7 276.7 0 0 1-24-113' transform='matrix(1.33333 0 0 -1.33333 769.5 266.8)'/%3E%3C/svg%3E
// @namespace   wtfdesign
// @include     *
// @grant       none
// @version     1.0.20240904
// @author      wtflm
// @description WordPress Developer/Admin UI tweaks
// ==/UserScript==

// Show a login button
(function() {

	// Does it look like a WordPress site?
	if (!document.querySelector(`[src*="${location.host}/wp-content"`)) return false;

	// Are we already logged in?
	if (document.body.classList.contains("logged-in")) return false;

	// Do we happen to already be on the login page?
	if (document.querySelector(`form[action*="wp-login.php"]`)) return false;

`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
<path d="M480-120v-80h280v-560H480v-80h280q33 0 57 24t23 56v560q0 33-23 57t-57 23H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
</svg>
`;

	fetch(`//${location.host}/wp-login.php`)
	.then(response => response.text())
	.then(html => {
		const parser = new DOMParser();
		const loginPage = parser.parseFromString(html, "text/html");
		if (!loginPage.querySelector(`form[action*="wp-login.php"]`)) return false;

		console.log("WordPress login page found.");
		
		const loginLink = document.createElement("a");
		loginLink.innerHTML = `<img alt="Login" src="${GM.info.script.icon}"/>`;
		loginLink.href = `//${location.host}/wp-login.php`;
		loginLink.title = "Login";
		loginLink.style.height = "24px";
		loginLink.style.position = "fixed";
		loginLink.style.inset = "3px 3px auto auto";
		loginLink.style.zIndex = "999";
		document.body.appendChild(loginLink);

	});
}());
