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
          coordinates: this.props.coordinates,
          loading: this.props.coordinates.length == 0 ? true : false, // Display loading screen as long as there are no coordinates to display
          checked: false,
        };
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    // Load data here / start subscription
    componentDidMount() {
        /**
         * 
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
    */
    }

    
    // This method is called when the component receives new props
    componentDidUpdate(prevProps) {
        // Update coordinate system without affecting checkbox
        if(prevProps.coordinates !== this.props.coordinates) {
            this.setState({
                coordinates: this.props.coordinates,
                loading: false,
             });
        }
    }
    

    // Checkbox onClick
    handleCheckboxChange(event) {
        const isChecked = event.target.checked;
        this.setState({ checked: isChecked });
        if (this.props.onChange) {
          this.props.onChange(isChecked);
        }
    }

    // --- Render -----------------------------------------
    render() {
        const { width, height, coordinates, loading, checked } = this.state;
        const green = 'rgb(34, 197, 94)';
        const red = 'rgb(239, 68, 68)';
        const blue = 'rgb(59, 130, 246)';
        const orange = 'rgb(255, 165, 0)';

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
                            <image href={"Stall_LWK_new.png"} width={width} height={height} />

                            {/* Plot the points and labels */}
                            {coordinates.map((point, index) => {
                                const x = point.x;
                                const y = point.y;
                                const label = point.label;

                                // Display the cow status with color if the checkbox is enabled otherwise just use one color
                                var color;
                                if(checked)
                                {
                                    switch (point.status)
                                    {
                                        case 0:
                                            color = red;
                                            break;
                                        case 1:
                                            color = green;
                                            break;
                                        case 2:
                                            color = blue;
                                            break;
                                    }
                                } else
                                {
                                    color = orange;
                                }

                                return (
                                    <g key={index}>
                                        <circle cx={x} cy={y} r={15} fill={color} />
                                        {/*<text x={x} y={y + 70} fontSize="45" fontWeight={"bold"} textAnchor="middle">{ label }</text>*/}
                                    </g>
                                );
                            })}

                        </svg>
                    </div>

                    <div className="flex justify-center legend">
                        <div className="flex space-x-4">
                            {/** Legend */}
                            <div className="flex items-center" style={{ display: checked? '' : 'none' }}>
                                <div className="w-5 h-5 mr-2 rounded-full" style={{"backgroundColor": red}} />
                                <span>Liegend</span>
                            </div>
                            <div className="flex items-center" style={{ display: checked? '' : 'none' }}>
                                <div className="w-5 h-5 mr-2 rounded-full" style={{"backgroundColor": green}} />
                                <span>Transition</span>
                            </div>
                            <div className="flex items-center" style={{ display: checked? '' : 'none' }}>
                                <div className="w-5 h-5 mr-2 rounded-full" style={{"backgroundColor": blue}} />
                                <span>Stehend</span>
                            </div>
                            {/** Checkbox */}
                            <div className="flex items-center">
                                <label className="inline-flex items-center space-x-2 cursor-pointer">
                                    <input
                                    type="checkbox"
                                    className="checkbox form-checkbox h-5 w-5"
                                    checked={checked}
                                    onChange={this.handleCheckboxChange}
                                    />
                                    <span>Status anzeigen</span>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }

}