import React from "react";
import '../styles/stallmonitor.scss';
import LoadingAnimation from "./loading";

export default class Stallmonitor extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          width: 1192,
          height: 505,
          padding: 0,
          minX: 0,
          maxX: 10,
          minY: 0,
          maxY: 10,
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

    // for scaling, not used at the moment
    toSVGCoordinates(x, y) {
        const { padding, width, height } = this.state;
        const { minX, minY, maxX, maxY } = this.state;
        const xScale = (width - 2 * padding) / (maxX - minX);
        const yScale = (height - 2 * padding) / (maxY - minY);
        const svgX = padding + (x - minX) * xScale;
        const svgY = height - padding - (y - minY) * yScale;
        return [svgX, svgY];
    }

    render() {
        const { width, height, padding, coordinates, loading } = this.state;

        if( loading )
        {
            return <LoadingAnimation />
        }
        else
        {
            return (
                <div className="stallmonitor center">

                    <h1>LTW Stall</h1>

                    <svg width={width} height={height}>

                        {/* Background Image */}
                        <image href={"Abbildung_LWK_Stall.png"} x={padding} y={padding} width={width - 2 * padding} height={height - 2 * padding} />

                        {/* Draw x-axis */}
                        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="black" />
                        {/* Draw y-axis */}
                        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="black" />
                        {/* Draw top border */}
                        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="black" />
                        {/* Draw right border */}
                        <line x1={width - padding} y1={padding} x2={width - padding} y2={height - padding} stroke="black" />

                        {/* Plot the points and labels */}
                        {coordinates.map((point, index) => {
                            //const [x, y] = this.toSVGCoordinates(point.x, point.y);
                            const x = point.x;
                            const y = point.y;
                            const label = point.label;
                            return (
                                <g key={index}>
                                    <circle cx={x} cy={y} r={8} fill="green" />
                                    <text x={x} y={y + 20} fontSize="12" textAnchor="middle">{ label }</text>
                                </g>
                            );
                        })}

                    </svg>

                </div>
            );
        }
    }

}