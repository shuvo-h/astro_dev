import React from 'react';
import "./layout.css";
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className='container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;