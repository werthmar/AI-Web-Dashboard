import "../styles/videoplayer.scss";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useRef, useEffect } from "react";
import React from "react";

// export default function VideoPlayer({ video }) {
export default class VideoPlayer extends React.Component
{
    // --- Component Settings ---
    constructor(props) {
        super(props);
        this.state = {
            camera: 0,
            source: this.props.images[0] ? this.props.images[0].source : '',
        }
    }

    // This method is called when the component receives new props
    componentDidUpdate(prevProps) {
        const { camera } = this.state;
        var previousImage = prevProps.images[camera] ? prevProps.images[camera].source : '';

        if( previousImage != this.props.images[camera].source )
        {
            this.setState({
                'source': this.props.images[camera].source,
            });
        }
    }

    // --- Functions ---
    onClickNext = () => {
        const { camera } = this.state;
        const { images } = this.props;
        var newCamera;

        if( camera + 1 == images.length ) {
            newCamera = 0;
        } else {
            newCamera = camera + 1
        }

        this.setState({
            camera: newCamera,
            source: images[newCamera] ? images[newCamera].source : '',
            // images[camera] ? coding + images[camera].source : ''
        });
    }
    
    onClickBack = () => {
        const { camera } = this.state;
        const { images } = this.props;
        var newCamera;
        
        if( camera - 1 < 0 ) {
            newCamera = images.length - 1;
        } else {
            newCamera = camera - 1
        }
        
        this.setState({
            camera: newCamera,
            source: images[newCamera] ? images[newCamera].source : '',
        });
    }

    // --- Render -----------------------------
    render() {

        const { camera, source } = this.state;
        var { images } = this.props;
        const coding = 'data:image/png;base64,'
        
        return (
            <div className="center videoplayer">

                <h1>{ images[camera] ? images[camera].name : 'loading...' }</h1>

                <img src={ coding + source } alt={"Live Bild vom Stall"} /> {/* className="max-w-full h-auto" */}
        
                <div className="flex justify-center space-x-4 buttons">
                    <button onClick={this.onClickBack} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                        <FaArrowLeft size={40} />
                    </button>
                    <button onClick={this.onClickNext} className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700">
                        <FaArrowRight size={40} />
                    </button>
                </div>

            </div>
        );
    }

    /**
     * Old Version with predefined videos
    const availableStreams = [
        { camera: process.env.NEXT_PUBLIC_CAMERA_1, name: process.env.NEXT_PUBLIC_CAMERA_1_NAME },
        { camera: process.env.NEXT_PUBLIC_CAMERA_2, name: process.env.NEXT_PUBLIC_CAMERA_2_NAME },
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

            <h1>{ availableStreams[ streamIndex ].name }</h1>

            <video
                controls
                preload="auto"
                width="100%"
                height="50%"
                autoPlay="true"
                key={streamIndex}
            >
                <source src={ availableStreams[ streamIndex ].camera } type="video/mp4" />
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
    */

    /**
     * Newer version allowing you to add a source in the frontend
     * and uses video sources from the startup programm by default
    

    const [inputValue, setInputValue] = useState('');
    // Check if video is not null and has properties assigned.
    const [videoSource, setVideoSource] = useState( video && Object.keys(video).length > 0 ? video[0].source : '' );
    const [videoTitle, setVideoTitle] = useState( video && Object.keys(video).length > 0 ? video[0].title : 'Loading...' );
    const [streamIndex, setStreamIndex] = useState(0);
    const videoPlayerRef = useRef(null);

    // --- Functions -----------------------------
    
    // Change source buttons
    const onClickNext = () => {
        var nextStream = streamIndex + 1
        if( nextStream > video.length - 1 ) {
            nextStream = 0
        }
        setStreamIndex( nextStream )
        setVideoSource( video[nextStream].source );
        setVideoTitle( video[nextStream].title );
        console.log(nextStream);
    }
    
    const onClickBack = () => {
        var nextStream = streamIndex - 1
        if( nextStream < 0 ) {
            nextStream = video.length - 1
        }
        setStreamIndex( nextStream )
        setVideoSource( video[nextStream].source );
        setVideoTitle( video[nextStream].title );
        console.log(nextStream);
    } 

    // Source submit input
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Additional functionality, such as sending data to a server, can be added here
        setVideoSource( inputValue );
        setVideoTitle( "Neuer Stream" );
    };

    // Video parameters
    useEffect(() => {
        const videoPlayer = videoPlayerRef.current;
        if (videoPlayer) {
            videoPlayer.currentTime = 30;
            videoPlayer.playbackRate = 0.5;
        }
    }, [videoSource]);
    
    // --- Render -----------------------------
    return (
        <div className="center videoplayer">

            <h1>{videoTitle}</h1>

            <video
                controls
                ref={ videoPlayerRef }
                preload="auto"
                width="100%"
                height="50%"
                autoPlay={ true }
                key={ videoSource }
            >
                <source src={ videoSource } type="video/mp4" />
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
        
            <div className="flex items-center justify-center">
                <form onSubmit={handleSubmit} className="w-full max-w-sm rounded shadow-md mt-10">
                    <div className="mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="HTTP Stream URL eingeben"
                        className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    </div>
                    <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-black border rounded-full bg-white hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                    Abspielen
                    </button>
                </form>
            </div>
        
        </div>
    );
    
    */



};
