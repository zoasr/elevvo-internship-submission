import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Features = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: "-100px" });

	const features = [
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Smart Analytics</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
			),
			title: "Smart Analytics",
			description:
				"Get detailed insights into your productivity patterns with advanced analytics and reporting tools. Track your progress and identify areas for improvement with beautiful, easy-to-understand charts and metrics.",
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Lightning Fast</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			),
			title: "Lightning Fast",
			description:
				"Experience blazing-fast performance with our optimized task management system. Sync across all your devices instantly and work offline with automatic synchronization when you're back online.",
		},
		{
			icon: (
				<svg
					className="w-8 h-8"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Secure & Private</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
					/>
				</svg>
			),
			title: "Secure & Private",
			description:
				"Your data is protected with enterprise-grade security and end-to-end encryption. We never sell your data and you maintain complete control over your privacy with local and cloud storage options.",
		},
	];

	return (
		<section ref={ref} className="py-20 bg-white dark:bg-slate-600 border-b-2 border-amber-600/20 dark:border-amber-200/20" id="features">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-200 mb-6">
						Powerful Features for{" "}
						<span className="text-amber-600 dark:text-amber-600">Peak Productivity</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-slate-200 max-w-3xl mx-auto">
						TaskFlow combines simplicity with powerful features to help you stay
						organized, focused, and productive every day.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={crypto.randomUUID()}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl group duration-300 hover:-translate-y-2 transition-[translate,_box-shadow]"
						>
							<div className="w-16 h-16 bg-amber-600 dark:bg-amber-600 text-white rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-700 transition-colors duration-300">
								{feature.icon}
							</div>

							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								{feature.title}
							</h3>

							<p className="text-gray-600 leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="text-center mt-16"
				>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
					>
						Explore All Features
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
