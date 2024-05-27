import React from "react";
import "../styles/assistenzsystem.scss";
import axios from 'axios';

export default class Assistenzsystem extends React.Component
{
    constructor( props ) {
        super( props );
        this.state = {
            messages: this.props.messages,
            oldMessages: [],
        }
    }

    // --- Functions ---
    saveMessages = async () => {
        try {
            const data = this.state.messages;
            await axios.post('/api/saveFile', { data });
            alert('Nachrichten gespeichert!');
            this.setState({ 
                messages: [], 
                oldMessages: [],
            });
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Error saving file. Please try again.');
          }
    }

    showAllMessages = async () => {
        try {
            // If old Messages are already displayd hide them again
            if( this.state.oldMessages.length != 0 ) {
                this.setState({
                    oldMessages: [],
                });
            }
            else {
                const response = await axios.get('/api/readFile');
                // Error while reading the data
                if( response.data.error ) {
                    alert( response.data.error );
                }
                // Data received, display all messages
                else {
                    this.setState({
                        oldMessages: response.data,
                    });
                }
            }

        } catch (error) {
            console.error('Error reading text file:', error);
            setError('Failed to read text file');
        }
    }
    
    // --- Render ---
    render() {
        const { messages, oldMessages } = this.state;

        return(
            <div className="center Assistenzsystem">

                <div className="message-container">
                    {/* Old Messages displayed in grey on button click */}
                    {oldMessages.map((message, index) => (
                        <div key={index} className='message old'>
                            <div>{message.text}</div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    ))}
                    {/* New messages diplayed in blue */}
                    {messages.map((message, index) => (
                        <div key={index} className='message new'>
                            <div>{message.text}</div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    ))}
                </div>

                    <div className="grid grid-cols-2 buttons">
                        <button className="btn" onClick={ this.saveMessages }>Als Gelesen Markieren</button>
                        <button className="btn" onClick={ this.showAllMessages }>Alle Nachrichten Anzeigen</button>
                    </div>

            </div>
        );
    }

}