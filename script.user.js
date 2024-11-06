// ==UserScript==
// @name        WTF WP UI Tweaks
// @icon        data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 16 16'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='.25' y1='-.1' x2='0' y2='.5'%3E%3Cstop stop-color='%23F7B535' offset='0%25'/%3E%3Cstop stop-color='%23E61D72' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='8' cy='8' r='8' fill='url(%23gradient)'/%3E%3Cpath stroke-width='.02' stroke='%23fff' fill='%23fff' d='M8.11 10.48H6.99l-.92-3.17h-.02l-.93 3.17H4L2.67 5.8h1.22l.74 3.11h.02l.83-3.11h1.18l.84 3.11h.02l.75-3.11h1.18zm5.37-3.24q0 .41-.15.7-.16.27-.41.44-.26.18-.6.26-.34.08-.7.08h-.56v1.76H9.93V5.8h1.72q.38 0 .71.08.34.07.58.24.25.17.4.45.14.27.14.67zm-1.13 0q0-.16-.07-.26t-.18-.17q-.11-.06-.26-.08-.13-.02-.29-.02h-.5v1.1h.48q.16 0 .3-.02.15-.03.27-.1.11-.06.18-.16.07-.12.07-.28z' aria-label='WP'/%3E%3C/svg%3E
// @namespace   wtfdesign
// @include     *
// @grant       none
// @version     1.9.0
// @author      wtflm
// @description WordPress Developer/Admin UI tweaks
// ==/UserScript==

// Show a login button
(function() {

	// Don't run in iframes
	if (window.self !== window.top) return false;

	// Are we already logged in?
	if (document.body.classList.contains("wp-admin")) return false;

	// Does it look like a WordPress site?
	if (!document.querySelector(`[src*="${location.host}/wp-content"`)) return false;

	// Do we happen to already be on the login page?
	if (document.querySelector(`form#loginform #wp-submit`)) return false;

	// Upgrade insecure requests resulting from /wp-admin redirects
	document.head.insertAdjacentHTML("beforeend", '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">');

	fetch(`//${location.host}/wp-admin`)
	.then(response => {

		// Login page isn't there or is hidden too well
		if (!response.ok) return false;

		console.log("WordPress login page found.");

		const loginIcon = `
			<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
				<defs>
					<style>
						@keyframes inee {
							33.333% {
								translate: 60% 0;
								animation-timing-function: step-start;
							}
							66.667% {
								translate: -60% 0;
							}
						}
						.loginLink {
							svg {
								vertical-align: unset;
							}
							g path {
								animation: inee 1s linear infinite;
								animation-play-state: paused;
							}
						}
					</style>
				</defs>
				<clipPath id="clip">
					<path d="M120-760h560v560H120z"/>
				</clipPath>
				<g clip-path="url(#clip)">
					<path d="m400-280-55-58 102-102H120v-80h327L345-622l55-58 200 200z"/>
				</g>
				<path d="M480-120v-80h280v-560H480v-80h280q33 0 57 24 23 23 23 56v560q0 33-23 57-24 23-57 23Z"/>
			</svg>
		`;

		const loginLink = document.createElement("a");
		loginLink.className = "loginLink";
		loginLink.innerHTML = loginIcon;
		loginLink.href = `//${location.host}/wp-admin`;
		loginLink.title = "Login";
		Object.assign(loginLink.style, {
			width: "24px",
			height: "24px",
			position: "fixed",
			inset: "3px 3px auto auto",
			zIndex: "9999",
			mixBlendMode: "difference",
		});

		document.body.appendChild(loginLink);
		arrow = loginLink.querySelector(`g path`);
		loginLink.addEventListener("mouseenter", () => arrow.style.animationPlayState = "running");
		loginLink.addEventListener("mouseleave", () => {
			arrow.addEventListener("animationiteration", ev => {
				if (!loginLink.matches(`:hover`)) arrow.style.animationPlayState = "paused";
			});
		}, {once: true});
	});
}());
