import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

function App() {
	return (
		<div className="min-h-screen bg-white font-sans">
			<Hero />
			<Features />
			<Testimonials />
			<Pricing />
			<Footer />
		</div>
	);
}

export default App;
