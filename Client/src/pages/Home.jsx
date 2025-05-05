
import Content from "../components/Content";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />  
            <div className="hero mt-16">
                <Hero />
            </div>
            <Content />
            <Footer />
        </div>
    );
};

export default Home;