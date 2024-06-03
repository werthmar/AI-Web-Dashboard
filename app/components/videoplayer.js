import "../styles/videoplayer.scss";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from "react";

export default function VideoPlayer() {

    const availableStreams = [
        process.env.NEXT_PUBLIC_CAMERA_1,
        process.env.NEXT_PUBLIC_CAMERA_2,
    ]
    const [streamIndex, setStreamIndex] = useState(0);

    // Switch through the available streams
    const onClickNext = () => {
        var nextStream = streamIndex + 1
        if( nextStream > availableStreams.length - 1 ) {
            nextStream = 0
        }
        setStreamIndex( nextStream )
        console.log(nextStream);
    }
    
    const onClickBack = () => {
        var nextStream = streamIndex - 1
        if( nextStream < 0 ) {
            nextStream = availableStreams.length - 1
        }
        setStreamIndex( nextStream )
        console.log(nextStream);
    } 

    return (
        <div className="center videoplayer">
            <video
                controls
                preload="auto"
                width="100%"
                height="50%"
                autoPlay="true"
                key={streamIndex}
            >
                <source src={ availableStreams[ streamIndex ] } type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        
            <div className="flex justify-center space-x-4 buttons">
                <button onClick={onClickBack} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                    <FaArrowLeft size={40} />
                </button>
                <button onClick={onClickNext} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                    <FaArrowRight size={40} />
                </button>
            </div>
        
        </div>
    );
};
