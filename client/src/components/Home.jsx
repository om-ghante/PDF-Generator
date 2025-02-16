import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleNext = () => {
      navigate('/login');
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <button 
                className="z-1 p-3 bg-blue w-80 text-white bg-black to-sky-gradient-start from-sky-gradient-end text-white rounded-lg hover:bg-gradient-to-b transition"               
                onClick={handleNext}>
                Get Started
            </button>
        </div>
    )
}

export default Home
