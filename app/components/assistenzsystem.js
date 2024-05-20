import React from "react";
import "../styles/assistenzsystem.scss";

export default class Assistenzsystem extends React.Component
{
    constructor( props ) {
        super( props );
        this.state = {
            messages: this.props.messages
        }
    }

    render() {
        const { messages } = this.state;

        return(
            <div className="center Assistenzsystem">

                <div className="message-container">
                    {messages.map((message, index) => (
                        <div key={index} className='message'>
                            <div>{message.text}</div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    ))}
                </div>

                    <div className="grid grid-cols-2 buttons">
                        <button className="btn">Als Gelesen Markieren</button>
                        <button className="btn">Alle Nachrichten Anzeigen</button>
                    </div>

            </div>
        );
    }

}