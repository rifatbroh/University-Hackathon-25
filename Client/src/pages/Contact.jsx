import React from 'react';
import Navbar from '../components/Navbar';
import Form from '../components/Form'
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className="info mt-10">
                <Form />
            </div>
            <Footer />
        </div>
    );
};

export default Contact;