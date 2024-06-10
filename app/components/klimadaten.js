import React, { Component } from 'react';
import { FaThermometerHalf } from 'react-icons/fa';
import "../styles/klimadaten.scss";
import { motion } from 'framer-motion';

class Klimadaten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: null,
    };
  }

  componentDidMount() {
    this.fetchTemperature();
    this.temperatureInterval = setInterval(this.fetchTemperature, 5000); // Fetch every 5 seconds
  }

  componentWillUnmount() {
    clearInterval(this.temperatureInterval);
  }

  fetchTemperature = () => {
    /*
    fetch('https://api.example.com/temperature') // Replace with your server endpoint
      .then(response => response.json())
      .then(data => {
        this.setState({ temperature: data.temperature });
      })
      .catch(error => {
        console.error('Error fetching temperature:', error);
      });
    */

    // Simulate fetching a random temperature
    const randomTemperature = (Math.random() * 40).toFixed(2); // Generate a random temperature between 0 and 40°C
    this.setState({ temperature: randomTemperature });
  };

  render() {
    const { temperature } = this.state;

    return (
      <div className="flex items-center justify-center h-screen klimadaten">
        <div className="flex items-center space-x-2 temperatureDisplay">
          <FaThermometerHalf className="text-4xl text-red-500" />
          <motion.span
            className="text-2xl font-semibold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0 }}
            key={temperature} // key prop forces re-render and animation
          >
            {temperature !== null ? `${temperature}°C` : 'Loading...'}
          </motion.span>
        </div>
      </div>
    );
  }
}

export default Klimadaten;