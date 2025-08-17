const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
document.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.getElementById("theme-toggle");
	const themeIcon = document.getElementById("theme-icon");
	const html = document.documentElement;
	const savedTheme = localStorage.getItem("theme");
	const systemPrefersDark = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches;

	if (savedTheme) {
		html.classList.toggle("dark", savedTheme === "dark");
	} else {
		html.classList.toggle("dark", systemPrefersDark);
	}

	function updateThemeIcon() {
		const isDark = html.classList.contains("dark");
		if (!themeIcon) return;
		themeIcon.className = isDark
			? "fas fa-moon text-lg"
			: "fas fa-sun text-lg";
	}

	updateThemeIcon();

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			const isDark = html.classList.contains("dark");
			html.classList.toggle("dark", !isDark);
			localStorage.setItem("theme", !isDark ? "dark" : "light");
			updateThemeIcon();
		});
	}

	window.addEventListener("scroll", () => {
		const currentScrollY = window.scrollY;
		const navbar = document.querySelector("nav");

		if (!navbar) return;
		if (currentScrollY > 100) {
			navbar.classList.add("shadow-md");
		} else {
			navbar.classList.remove("shadow-md");
		}
	});

	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animate-fade-in-up");
			}
		});
	}, observerOptions);

	document.querySelectorAll(".bg-card").forEach((card) => {
		observer.observe(card);
	});
});

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
let isMenuOpen = false;

function toggleMobileMenu() {
	if (!mobileMenu || !mobileMenuButton) return;

	isMenuOpen = !isMenuOpen;

	mobileMenuButton.setAttribute("aria-expanded", isMenuOpen.toString());

	if (isMenuOpen) {
		mobileMenu.classList.remove("hidden");
		void mobileMenu.offsetWidth;
		mobileMenu.classList.add("block");
		mobileMenu.classList.remove("opacity-0", "scale-95");
		mobileMenu.classList.add("opacity-100", "scale-100");
		document.body.style.setProperty(
			"--scrollbar-width",
			`${scrollWidth}px`
		);
	} else {
		mobileMenu.classList.remove("opacity-100", "scale-100");
		mobileMenu.classList.add("opacity-0", "scale-95");
		setTimeout(() => {
			mobileMenu.classList.add("hidden");
			mobileMenu.classList.remove("block");
			document.body.classList.remove("menu-open");
		}, 200);
	}
}

function handleClickOutside(event: MouseEvent) {
	if (
		mobileMenu &&
		!mobileMenu.contains(event.target as Node) &&
		mobileMenuButton &&
		!mobileMenuButton.contains(event.target as Node) &&
		isMenuOpen
	) {
		toggleMobileMenu();
	}
}

function handleMenuLinkClick() {
	if (isMenuOpen) {
		toggleMobileMenu();
	}
}

if (mobileMenuButton) {
	mobileMenuButton.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleMobileMenu();
	});
}

document.addEventListener("click", handleClickOutside);

const menuLinks = document.querySelectorAll("#mobile-menu a");
menuLinks.forEach((link) => {
	link.addEventListener("click", handleMenuLinkClick);
});
