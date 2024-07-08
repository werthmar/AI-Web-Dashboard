import React from "react";
import '../styles/stallmonitor.scss';
import LoadingAnimation from "./loading";

export default class Stallmonitor extends React.Component
{
    // Legende stehend, liegend, transition
    // neues bild in größer: 3000x...
    // Koordinatensystem dann runterskalieren jeh nach bildschirmgröße

    constructor(props) {
        super(props);
        this.state = {
          width: 3220,
          height: 1614,
          coordinates: [{}],
          loading: true,
        };
    }

    // Load data here / start subscription
    componentDidMount() {
        try {
            
            // subscribe here

            this.setState({
                coordinates: [
                    { x: 1000, y: 200, label: "kuh1" }, // Example point
                    { x: 300, y: 400, label: "kuh2" }, // Example point
                    { x: 671, y: 473, label: "kuh3" }, // Example point
                    { x: 0, y: 0, label: "minimum" }, // Example point
                    { x: 3220, y: 1614, label: "maximum" }, // Example point
                    // Add more points as needed
                  ],
                loading: false,
            });

        } catch (error) {
            console.log(error);
        }
    }

    // Unsubscribe in here
    componentWillUnmount() {

    }


    render() {
        const { width, height, coordinates, loading } = this.state;

        if( loading )
        {
            return <LoadingAnimation />
        }
        else
        {
            return (
                <div className="stallmonitor center">

                    <h1>LWK Stall</h1>

                    <div className="svgContainer">
                        {/*<svg width={width} height={height}> "0 0 3220 1775" */}
                        <svg
                            viewBox= {`0 0 ${width} ${height}`}
                            width="100%"
                            height="100%">

                            {/* Background Image */}
                            <image href={"Stall_LWK.png"} width={width} height={height} />

                            {/* Plot the points and labels */}
                            {coordinates.map((point, index) => {
                                const x = point.x;
                                const y = point.y;
                                const label = point.label;
                                return (
                                    <g key={index}>
                                        <circle cx={x} cy={y} r={30} fill="green" />
                                        <text x={x} y={y + 70} fontSize="45" fontWeight={"bold"} textAnchor="middle">{ label }</text>
                                    </g>
                                );
                            })}

                        </svg>
                    </div>

                </div>
            );
        }
    }

}