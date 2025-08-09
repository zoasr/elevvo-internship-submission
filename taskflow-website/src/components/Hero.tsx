import { motion } from "framer-motion";

const Hero = () => {
	return (
		<section className="bg-gradient-to-b from-amber-200 dark:from-amber-800 dark:to-slate-600 min-h-screen py-8 md:py-0 flex items-center justify-center px-4 border-b-2 border-amber-600/20 dark:border-amber-200/20">
			<div className="max-w-4xl mx-auto text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
						Task<span className="text-amber-600 ">Flow</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-600 dark:text-gray-100 mb-12 max-w-2xl mx-auto leading-relaxed">
						Streamline your productivity with the ultimate task management tool.
						Organize, prioritize, and accomplish more with TaskFlow.
					</p>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="bg-amber-600 dark:bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-md text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
					>
						Get Started Free
					</motion.button>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="mt-16"
				>
					<div className="bg-white/80 dark:bg-amber-900/20 dark:ring-amber-700/20 dark:ring-2 backdrop-blur-sm rounded-md p-8 shadow-2xl max-w-3xl mx-auto">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="bg-amber-50 dark:bg-amber-600 rounded-md p-4">
								<div className="w-12 h-12 bg-amber-100 dark:bg-amber-300 rounded-md flex items-center justify-center justify-self-center mb-3">
									<svg
										className="w-6 h-6 text-amber-600 dark:text-amber-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Smart Lists</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
								</div>
								<h3 className="font-semibold text-gray-900 dark:text-amber-900 mb-1">
									Smart Lists
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-100">
									Organize tasks efficiently
								</p>
							</div>

							<div className="bg-green-50 dark:bg-green-600 rounded-md p-4">
								<div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center justify-self-center mb-3">
									<svg
										className="w-6 h-6 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Time Tracking</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="font-semibold text-gray-900 dark:text-green-900 mb-1">
									Time Tracking
								</h3>
								<p className="text-sm text-gray-600 dark:text-gray-200">Monitor productivity</p>
							</div>

							<div className="bg-purple-50 dark:bg-purple-500 rounded-md p-4">
								<div className="w-12 h-12 bg-purple-100 rounded-md flex items-center justify-center justify-self-center mb-3">
									<svg
										className="w-6 h-6 text-purple-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Team Collaboration</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
								</div>
								<h3 className="font-semibold text-gray-900 dark:text-purple-900 mb-1">Team Sync</h3>
								<p className="text-sm text-gray-600 dark:text-gray-200">Collaborate seamlessly</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
