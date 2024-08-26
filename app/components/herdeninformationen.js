import React, { Component } from 'react';
import { FaThermometerHalf } from 'react-icons/fa';
import "../styles/herdeninformationen.scss";
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
        distances: props.distance,
        loading: props.distance.length == 0 ? true : false, // Display loading screen as long as there are no coordinates to display
    };

  }

  // The chart which displayes the average temperatures of the last days 
  DistanceChart = ( data ) => {
    const chartData = {
      labels: data.map(item => item.day),
      datasets: [
        {
          label: 'Maximale Distanz',
          data: data.map(item => item.maxDistance),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          datalabels: {
            align: 'end',
            anchor: 'end'
          }
        },
        {
          label: 'Durchschnittliche Distanz',
          data: data.map(item => item.avgDistance),
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
          text: 'Maximale und Durschschnittliche Herdendistanz',
          font: {
            size: 24,
          },
          padding: 40
        },
        datalabels: {
          display: true,
          color: 'black',
          formatter: (value) => `${value}m`,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Wochentage ( Datum )',
            font: {
              size: 18,
            },
          },
          offset: true, // prevents points for first day overlapping with y axis
        },
        y: {
          title: {
            display: true,
            text: 'Distanz ( Meter )',
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
  
    return <Line data={chartData} options={options} className='distanceGraph' />;
  };
  

  render() {
    const { distances, loading } = this.state;

    if( loading )
    {
      return <LoadingAnimation />
    }
    else
    {
      return (
        <div className="flex items-center justify-center h-screen">

          <div className='herdeninformationen items-center justify-center'>

            <div className='relative w-full h-full min-h-[400px] min-w-[400px]'>
              {this.DistanceChart( distances )}
            </div>

          </div>

        </div>
      );
    }
  
  }

}

export default Klimadaten;