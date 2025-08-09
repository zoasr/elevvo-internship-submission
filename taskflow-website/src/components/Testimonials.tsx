import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Testimonials = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: "-100px" });

	const testimonials = [
		{
			quote:
				"TaskFlow has revolutionized my workflow. I'm more organized and productive than ever before. The interface is so intuitive and beautiful!",
			name: "Sarah K.",
			title: "Freelance Designer",
			image: "https://i.pravatar.cc/150?img=1",
		},
		{
			quote:
				"Our team's collaboration has improved tenfold since adopting TaskFlow. It's the perfect tool for keeping everyone on the same page.",
			name: "Michael B.",
			title: "Project Manager",
			image: "https://i.pravatar.cc/150?img=2",
		},
		{
			quote:
				"I've tried every task manager out there, and TaskFlow is the only one that has truly stuck. It's simple, powerful, and a joy to use.",
			name: "Jennifer L.",
			title: "Software Engineer",
			image: "https://i.pravatar.cc/150?img=3",
		},
	];

	return (
		<section ref={ref} className="py-20 bg-gray-50 dark:bg-slate-600 border-b-2 border-amber-600/20 dark:border-amber-200/20" id="testimonials">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-6">
						Loved by{" "}
						<span className="text-amber-600 dark:text-amber-600">Productivity Enthusiasts</span>
					</h2>
					<p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto">
						Hear what our users have to say about their experience with
						TaskFlow.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<motion.div
							key={crypto.randomUUID()}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							className="flex flex-col justify-between items-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-[box-shadow,_translate] duration-300"
						>
							<div className="text-2xl text-gray-600 mb-6 relative">
								<span className="absolute -top-4 left-0 text-4xl text-amber-300 dark:text-amber-300 font-bold opacity-50">
									“
								</span>
								<p className="relative z-10 text-lg">{testimonial.quote}</p>
							</div>

							<div className="flex items-center self-start md:self-center">
								<img
									src={testimonial.image}
									alt={testimonial.name}
									className="w-12 h-12 rounded-full mr-4"
								/>
								<div>
									<p className="font-bold text-gray-900">{testimonial.name}</p>
									<p className="text-gray-500">{testimonial.title}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
