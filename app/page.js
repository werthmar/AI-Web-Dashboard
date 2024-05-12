'use client'
import Image from "next/image";
import { Container } from "postcss";
import React, { useState } from "react";
import LoadingAnimation from "./components/loading";
import Stallmonitor from "./components/stallmonitor";

export default class Page extends React.Component
{
  constructor() {
    super();
    this.state = {
      activeButton: 1,
      loading: false,
    };
  }

  // --- Functions ---------------------------------------------
  handleButtonClick = (buttonId) => {
    this.setState({
     activeButton: buttonId
    });
  };

  // Decide which element to display based on which button is active
  getViewportElement() {
    try {
      const {loading, activeButton} = this.state;
  
      if( loading )
      {
        return( <LoadingAnimation /> );
      }
      else if ( activeButton === 1 )
      {
        return( <Stallmonitor /> );
      }
      else {
        return( <p>Error!</p> );
      }
    }
    catch (error) {
      return error;
    }

  }
  
  // --- Render ------------------------------------------------
  render()
  {
    const {activeButton} = this.state;
    return(    

      <div className="Page flex h-screen">

        {/* Sidebar */}
        <div className="sidebar w-80">
          <Image alt="smartMILK Logo" className="homeButton" src={"/milkIconTest.png"} width={100} height={100} />
          
          <div className="buttons flex flex-col mt-4">
            <button onClick={() => this.handleButtonClick(1)} className={activeButton === 1 ? 'buttonActive' : ''}>Stallmonitor</button>
            <button onClick={() => this.handleButtonClick(2)} className={activeButton === 2 ? 'buttonActive' : ''}>Assistenzsystem</button>
            <button onClick={() => this.handleButtonClick(3)} className={activeButton === 3 ? 'buttonActive' : ''}>Klimadaten</button>
            <button onClick={() => this.handleButtonClick(4)} className={activeButton === 4 ? 'buttonActive' : ''}>Live-Bild</button>
            <button onClick={() => this.handleButtonClick(5)} className={activeButton === 5 ? 'buttonActive' : ''}>Herdeninformationen</button>
            <button onClick={() => this.handleButtonClick(6)} className={activeButton === 6 ? 'buttonActive' : ''}>Einzeltierinformationen</button>
          </div>

        </div>
        
        {/* Main Content */}
        <div className="viewport flex-1">
          {this.getViewportElement()}
        </div>

      </div>
    
    );
  }
    
}
