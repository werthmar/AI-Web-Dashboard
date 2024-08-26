'use client'
import Image from "next/image";
import { Container } from "postcss";
import React, { useState } from "react";
import LoadingAnimation from "./components/loading";
import Stallmonitor from "./components/stallmonitor";
import Assistenzsystem from "./components/assistenzsystem";
import VideoPlayer from "./components/videoplayer";
import { BsExclamationCircle } from "react-icons/bs";
import Klimadaten from "./components/klimadaten";
import axios from 'axios';
import Einzeltier from "./components/einzeltier";
import Herdeninformationen from "./components/herdeninformationen";
import Impressum from "./components/impressum";

export default class Page extends React.Component
{
    constructor() {
        super();
        this.state = {
            activeButton: 1,
            loading: false,
            messages: [],
            coordinates: [],
            temperature: {},
            distance: [],
            video: {},
            images: '',
            unreadMessage: false,
        };
        this.socket = null;
    }

  // --- WebSocket Stream --------------------------------
    componentDidMount()
    {
        // Initialize WebSocket connection
        this.socket = new WebSocket('ws://localhost:4000');
        
        // Listen for messages
        //this.socket.addEventListener('message', this.handleMessage);
        this.socket.onmessage = (event) => {

        const parsedData = JSON.parse(event.data);
        
        switch (parsedData.type) {
            
            case 'message':
                console.log(`Message received ${parsedData.data}`);
                this.handleMessage(parsedData.data);
                break;

            case 'coordinates':
                console.log(`Coordinates received ${parsedData.data}`);
                this.handleCoordinates(parsedData.data);
                break;
            
            case 'temperature':
                console.log(`Temperature received ${parsedData.data}`);
                this.handleTemperature(parsedData.data);
                break;
            
            case 'distance':
                console.log(`Distance received ${parsedData.data}`);
                this.handleDistance(parsedData.data);
                break;
            
            // Not used at the moment, use image event instead.
            case 'video':
                console.log(`Video received ${parsedData.data}`);
                this.handleVideo(parsedData.data);
                break;
            
            case 'image':
                console.log(`Image received ${parsedData.data}`);
                this.handleImage(parsedData.data);
                break;

            default:
                console.log(`Unknown message type: ${parsedData.type} data: ${parsedData.data}`);
        }
        };

        // Simulate a message after 3 seconds
        //this.simulateMessageAfterDelay();
    }

    componentWillUnmount()
    {
        // Clean up the WebSocket connection
        if (this.socket) {
        //this.socket.removeEventListener('message', this.handleMessage);
        this.socket.close();
        }
    }
    
    handleCoordinates = (coordinates) => {
        this.setState({
            coordinates: coordinates
        });
    }

    handleMessage = (message) => {
        
        // Timestamp the message
        const newMessage = {
        "text": message,
        "timestamp": this.getTimestamp()
        }

        // Update state with the new message
        this.setState((prevState) => ({
        messages: [...prevState.messages, newMessage],
        // Mark the Assistenzsystem button so that the user knows there is a new message
        unreadMessage: true,
        }));
        
        // Perform any additional actions with the new message
    };
  
    handleDistance = (distance) => {
        this.setState({
            distance: distance
        });
    }
    
    handleTemperature = (temperature) => {
        this.setState({
            temperature: temperature
        });
    }

    handleVideo = (video) => {
        this.setState({
            video: video
        });
    }
    
    handleImage = (images) => {
        this.setState({
            images: images
        });
    }

    // Method to manually trigger a message event after a delay
    simulateMessageAfterDelay = () => {
        setTimeout(() => {
        const mockEvent = { data: {text: 'Test message after delay', timestamp: this.getTimestamp()} };
        this.handleMessage(mockEvent);
        }, 6000); // 6-second delay
    };
  
    // --- Functions ---------------------------------------------
    saveMessages = async () => {
        try {
            const data = this.state.messages;
            await axios.post('/api/saveFile', { data });
            alert('Nachrichten gespeichert!');
            this.setState({ 
                messages: [], 
            });
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Error saving file. Please try again.');
        }
    }

    handleButtonClick = (buttonId) => {
        // Disable the unread notification if the user clicks on it
        if( buttonId === 2 )
        {
        this.setState({
            activeButton: buttonId,
            unreadMessage: false,
        });
        } 
        else {
        this.setState({
            activeButton: buttonId
        });
        }
    };

    getTimestamp () {
        // create a timestamp for display
        const now = new Date();
        var timestamp = `
        ${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getFullYear()).padStart(2, '0')} 
        ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}
        `;
        return timestamp;
    }

    // Decide which element to display based on which button is active
    getViewportElement() {
        try {
        const {loading, activeButton, messages, coordinates, temperature, video, images, distance} = this. state;
    
        if( loading )
        {
            return( <LoadingAnimation /> );
        }
        else if ( activeButton === 1 )
        {
            return( <Stallmonitor coordinates={ coordinates } /> );
        }
        else if ( activeButton === 2 )
        {
            return( <Assistenzsystem messages={ messages } key={ messages } saveMessages={ this.saveMessages } /> );
        }
        else if ( activeButton === 3 )
        {
            return( <Klimadaten temperature= { temperature } key={ temperature.currentTemperature } /> );
        }
        else if ( activeButton === 4 )
        {
            return( <VideoPlayer images={ images } /> );
        }
        else if ( activeButton === 5 )
        {
            return( <Herdeninformationen distance={ distance } key= { distance } /> );
        }
        else if ( activeButton === 6 )
        {
            return( <Einzeltier /> );
        }
        else if ( activeButton === 7 )
        {
            return( <Impressum /> );
        }
        else {
            //return( <p>Error!</p> );
            return <LoadingAnimation />;
        }
        }
        catch (error) {
        return error;
        }

    }
  
    // --- Render ------------------------------------------------
    render()
    {
        const {activeButton, unreadMessage} = this.state;
        return(    

        <div className="Page flex h-screen">

            {/* Sidebar */}
            <div className="sidebar w-80">
            
            <Image priority alt="smartMILK Logo" className="homeButton" src={"/smartMILC_Logo.jpg"} width={250} height={250} />
            
            <div className="buttons flex flex-col mt-4">
                <button onClick={() => this.handleButtonClick(1)} className={activeButton === 1 ? 'buttonActive' : ''}>Stallmonitor</button>
                <button 
                onClick={() => this.handleButtonClick(2)} 
                className={`flex items-center justify-center ${unreadMessage ? "buttonNotification" : ""} ${activeButton === 2 ? 'buttonActive' : ''}`}>
                    <span>Assistenzsystem</span>
                    { unreadMessage ? <BsExclamationCircle className="exclamationIcon" color="red" size={40} /> : "" }
                </button>
                <button onClick={() => this.handleButtonClick(3)} className={activeButton === 3 ? 'buttonActive' : ''}>Klimadaten</button>
                <button onClick={() => this.handleButtonClick(4)} className={activeButton === 4 ? 'buttonActive' : ''}>Live-Bild</button>
                <button onClick={() => this.handleButtonClick(5)} className={activeButton === 5 ? 'buttonActive' : ''}>Herdeninformationen</button>
                <button onClick={() => this.handleButtonClick(6)} className={activeButton === 6 ? 'buttonActive' : ''}>Einzeltierinformationen</button>
            </div>

            <a onClick={() => this.handleButtonClick(7)} className="impressum">Impressum</a>

            </div>
            
            {/* Main Content */}
            <div className="viewport flex-1">
            {this.getViewportElement()}
            </div>

        </div>
        
        );
    }
        
}
