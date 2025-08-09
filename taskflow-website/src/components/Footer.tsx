import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	const socialLinks = [
		{
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
						clipRule="evenodd"
					></path>
				</svg>
			),
			href: "#",
		},

		{
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
				</svg>
			),
			href: "#",
		},
		{
			icon: (
				<svg
					fill="currentColor"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					className="w-6 h-6"
					aria-hidden="true"
				>
					<g
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					>
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" />
						<circle cx="4" cy="4" r="2" />
					</g>
				</svg>
			),
			href: "#",
		},
	];

	return (
		<footer ref={ref} className="bg-gray-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8 }}
					className="grid grid-cols-1 md:grid-cols-4 gap-8"
				>
					<div className="md:col-span-1">
						<h2 className="text-3xl font-bold mb-4">
							Task<span className="text-amber-500 dark:text-amber-500">Flow</span>
						</h2>
						<p className="text-gray-400 max-w-sm">
							Organize, prioritize, and accomplish more with TaskFlow. Your
							ultimate productivity partner.
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Product</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#features"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Features
								</a>
							</li>
							<li>
								<a
									href="#pricing"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Pricing
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Integrations
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Changelog
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Company</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Blog
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Legal</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Terms of Service
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-white transition-colors"
								>
									Cookie Policy
								</a>
							</li>
						</ul>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
				>
					<p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
						© {new Date().getFullYear()} TaskFlow, Inc. All rights reserved.
					</p>

					<div className="flex space-x-6">
						{socialLinks.map((link, index) => (
							<a
								key={index}
								href={link.href}
								className="text-gray-500 hover:text-white transition-colors"
							>
								{link.icon}
							</a>
						))}
					</div>
				</motion.div>
			</div>
		</footer>
	);
};

export default Footer;
