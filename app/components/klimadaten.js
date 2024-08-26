import React, { Component } from 'react';
import { FaThermometerHalf } from 'react-icons/fa';
import "../styles/klimadaten.scss";
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import LoadingAnimation from "./loading";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartDataLabels);

class Klimadaten extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: props.temperature.currentTemperature,
      averageTemperatures: props.temperature.averageTemperatures,
      loading: props.temperature.averageTemperatures == undefined ? true : false, // Display loading screen as long as there are no coordinates to display
    };

  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  // The chart which displayes the average temperatures of the last days 
  TemperatureChart = ( data ) => {
    const chartData = {
      labels: data.map(item => item.day),
      datasets: [
        {
          label: 'Tagestemperatur',
          data: data.map(item => item.dayTemp),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
        },
        {
          label: 'Nachttemperatur',
          data: data.map(item => item.nightTemp),
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
          font: {
              size: 20,
            },
          },
        },
        title: {
          display: true,
          text: 'Durschnittstemperatur der letzten 7 Tage',
          font: {
            size: 24,
          },
        },
        datalabels: {
          display: true,
          color: 'black',
          formatter: (value) => `${value}°C`,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Wochentage',
            font: {
              size: 18,
            },
          },
          offset: true, // prevents points for first day overlapping with y axis
        },
        y: {
          title: {
            display: true,
            text: 'Temperatur (°C)',
            font: {
              size: 18,
            },
          },
          ticks: {
            beginAtZero: true, // Ensures the y-axis starts from zero
          },
        },
      },
      layout: {
        padding: {
          left: 20, // Add padding to the left
          right: 20, // Add padding to the right
          top: 20, // Add padding to the top
          bottom: 20, // Add padding to the bottom
        },
      }

    };
  
    return <Line data={chartData} options={options} className='averageTemperature' />;
  };
  

  render() {
    const { temperature, averageTemperatures, loading } = this.state;

    if( loading )
    {
      return <LoadingAnimation />
    }
    else
    {
      return (
        <div className="flex items-center justify-center h-screen">

          <div className='klimadaten'>



            <div className="flex items-center justify-center space-x-2 temperatureDisplay">
              <h1>Aktuelle Temperatur:</h1>
              <FaThermometerHalf className="text-6xl text-red-500" />
              <motion.span
                className="text-2xl font-semibold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.0 }}
                key={temperature} // key prop forces re-render and animation
              >
                <h1 key={temperature}>{temperature !== null ? `${temperature}°C` : 'Loading...'}</h1>
              </motion.span>
            </div>

            <div className='relative w-full h-full min-h-[400px] min-w-[400px]'>
              {this.TemperatureChart( averageTemperatures )}
            </div>

          </div>

        </div>
      );
    }
  
  }

}

export default Klimadaten;