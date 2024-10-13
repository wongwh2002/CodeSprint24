import React from "react";
import Login from "../components/Login";
import './StartPage.css'; // Import the CSS file for the wave effect

const StartPage = () => {
    const text1 = "The World's ";
    const text2 = "Port of Call ";

    const createSpans = (text) => {
        return text.split('').map((char, index) => {
            if (char === ' ') {
                // Return a space without a span for spaces
                return <span key={index}>&nbsp;</span>; // Use non-breaking space to preserve spacing
            }
            return (
                <span key={index} className="wave-text" style={{ animationDelay: `${index * 0.1}s` }}>
                    {char}
                </span>
            );
        });
    };
    

    return (
        <div className="flex flex-col items-center justify-center bg-[#141A22] w-[100vw] h-[100vh]">
            <div className="w-full">
                <img src='../../psa_logo_white.png' className="pl-32 h-36" alt="Logo" />
            </div>
            <div className="grid grid-cols-2 w-4/5 bg-white rounded-xl overflow-hidden shadow">
                <div>
                    <img src='../../port_image.png' className="col-span-1" alt="Port" />
                </div>
                <div className="flex flex-col text-left col-span-1 p-10 justify-center">
                    <div className="font-bold m-5 mb-10">
                        <div className="text-4xl">{createSpans(text1)}</div>
                        <br />
                        <div className="text-6xl">{createSpans(text2)}</div>
                    </div>
                    <div className="flex justify-end">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartPage;
