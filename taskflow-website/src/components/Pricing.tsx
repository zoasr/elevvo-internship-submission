import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Pricing = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: "-100px" });

	const plans = [
		{
			name: "Free",
			price: "$0",
			period: "forever",
			features: [
				"Up to 3 projects",
				"Basic task management",
				"Mobile & web apps",
				"Community support",
				"1GB storage",
			],
			buttonText: "Get Started",
			popular: false,
			buttonStyle: "bg-gray-900 hover:bg-gray-800 text-white",
		},
		{
			name: "Pro",
			price: "$9",
			period: "per month",
			features: [
				"Unlimited projects",
				"Advanced analytics",
				"Priority support",
				"Team collaboration",
				"100GB storage",
				"Custom templates",
				"Time tracking",
			],
			buttonText: "Start Free Trial",
			popular: true,
			buttonStyle: "bg-amber-600 dark:bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 text-white",
		},
		{
			name: "Team",
			price: "$19",
			period: "per user/month",
			features: [
				"Everything in Pro",
				"Advanced team features",
				"Admin dashboard",
				"SSO integration",
				"Unlimited storage",
				"24/7 phone support",
				"Custom integrations",
			],
			buttonText: "Contact Sales",
			popular: false,
			buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
		},
	];

	return (
		<section ref={ref} className="py-20 bg-gray-50 dark:bg-slate-600 border-b-2 border-amber-600/20 dark:border-amber-200/20" id="pricing">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-6">
						Simple, <span className="text-amber-600 dark:text-amber-600">Transparent Pricing</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Choose the plan that's right for you. All plans include our core
						features, with additional capabilities as you grow.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
							transition={{ duration: 0.8, delay: index * 0.2 }}
							className={`relative grid bg-white rounded-2xl p-8 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-[box-shadow,_translate] border-2 ${
								plan.popular
									? "border-amber-500 dark:border-amber-500 transform scale-105"
									: "border-gray-200"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="bg-amber-600 dark:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
										Most Popular
									</span>
								</div>
							)}

							<div className="text-center mb-8">
								<h3 className="text-2xl font-bold text-gray-900 mb-2">
									{plan.name}
								</h3>
								<div className="mb-4">
									<span className="text-5xl font-bold text-gray-900">
										{plan.price}
									</span>
									<span className="text-gray-500 ml-2">/{plan.period}</span>
								</div>
							</div>

							<ul className="space-y-4 mb-8">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-center">
										<svg
											className="w-5 h-5 text-green-500 mr-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>Check</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span className="text-gray-600">{feature}</span>
									</li>
								))}
							</ul>

							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`w-full py-4 px-6 rounded-lg font-semibold text-lg h-fit transition-colors duration-200 shadow-lg hover:shadow-xl ${plan.buttonStyle}`}
							>
								{plan.buttonText}
							</motion.button>
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="text-center mt-16"
				>
					<p className="text-gray-600 dark:text-gray-200 mb-4">
						All plans include a 30-day money-back guarantee
					</p>
					<div className="flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-200">
						<span className="flex items-center">
							<svg
								className="w-4 h-4 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Check</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							No setup fees
						</span>
						<span className="flex items-center">
							<svg
								className="w-4 h-4 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Check</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							Cancel anytime
						</span>
						<span className="flex items-center">
							<svg
								className="w-4 h-4 mr-2"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Check</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							24/7 support
						</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Pricing;
