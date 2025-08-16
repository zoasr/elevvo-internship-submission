const sidebarToggleBtn = document.querySelector(".toggle-sidebar");
const main = document.querySelector("main");
const aside = document.querySelector("aside");
const sidebarIcon = document.querySelector(".sidebar-icon");
const closeSidebarBtn = document.querySelector(".close-sidebar");

sidebarToggleBtn.addEventListener("click", () => {
	const currentState = main.getAttribute("data-sidebar-open");
	main.setAttribute(
		"data-sidebar-open",
		currentState === "true" ? "false" : "true",
	);
	aside.setAttribute(
		"aria-expanded",
		currentState === "true" ? "false" : "true",
	);
	sidebarIcon.setAttribute(
		"aria-expanded",
		currentState === "true" ? "false" : "true",
	);
});

closeSidebarBtn.addEventListener("click", () => {
	main.setAttribute("data-sidebar-open", "false");
	aside.setAttribute("aria-expanded", "false");
	sidebarIcon.setAttribute("aria-expanded", "false");
});
