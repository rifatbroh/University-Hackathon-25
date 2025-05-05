
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />  
            <div className="hero mt-16">
                <Hero />
            </div>

        </div>
    );
};

export default Home;