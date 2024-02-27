import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import Swal from 'sweetalert2';

const Region = (props) => {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [plotData, setPlotData] = useState(null);
    const [ setAnswerCorrect5] = useState(true);
    const [points, setPoints] = useState(0);


    const handlePlot = () => {
        if (a === '' || b === '' || c === '' || isNaN(a) || isNaN(b) || isNaN(c)) {
            Swal.fire('Missing Values', 'Please enter values for slope and intercept before selecting an option.', 'warning');
            return;
        }
        const x = [-10, 10];
        const y1 = x.map((xVal) => (-a * xVal - c) / b);

        const lineTrace = {
            x: x,
            y: y1,
            mode: 'lines',
            name: 'Line',
        };
        const plotData = [lineTrace];
        if (a * x[0] + b * y1[0] + c < 0 && a * x[1] + b * y1[1] + c > 0) {
            const positiveRegion1 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], 10, 10],
                fill: 'toself',
                fillcolor: 'rgba(0, 255, 0, 0.3)',
                mode: 'none',
                name: 'Region 1',
            };
            plotData.push(positiveRegion1);
            const negativeRegion1 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], -10, -10],
                fill: 'toself',
                fillcolor: 'rgba(255, 0, 0, 0.3)',
                mode: 'none',
                name: 'Region 2',
            };
            plotData.push(negativeRegion1);
        } else {
            const positiveRegion2 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], -10, -10],
                fill: 'toself',
                fillcolor: 'rgba(0, 255, 0, 0.3)',
                mode: 'none',
                name: 'Region 2',
            };
            plotData.push(positiveRegion2);
            const negativeRegion2 = {
                x: [x[0], x[1], x[1], x[0]],
                y: [y1[0], y1[1], 10, 10],
                fill: 'toself',
                fillcolor: 'rgba(255, 0, 0, 0.3)',
                mode: 'none',
                name: 'Region 1',
            };
            plotData.push(negativeRegion2);
        }

        setPlotData(plotData);
    };

    const checkred = async () => {
        if (a === '' || b === '' || c === '' || isNaN(a) || isNaN(b) || isNaN(c)) {
            Swal.fire('Missing Values', 'Please enter values for a,b and c before selecting an option.', 'warning');
            return;
        }
        if (a > 0 && b > 0 && c > 0) {
            setAnswerCorrect5(true);
            setPoints(points + 1);
            await Swal.fire('Correct Answer!', `Your answer is correct!`, 'success');
            setA('');
            setB('');
            setC('');
        } else {
            setAnswerCorrect5(false);
            await Swal.fire({
                icon: 'error',
                title: 'Incorrect Answer!',
                text: `Check the signs of a, b and c and use the Arbitary Point method to determine the answer.`,
                confirmButtonText: 'OK',
            });
        }
    }

    const checkgreen = async () => {
        if (a === '' || b === '' || c === '' || isNaN(a) || isNaN(b) || isNaN(c)) {
            Swal.fire('Missing Values', 'Please enter values for slope and intercept before selecting an option.', 'warning');
            return;
        }
        if (a < 0 || b < 0 || c < 0) {
            setAnswerCorrect5(true);
            setPoints(points + 1);
            await Swal.fire('Correct Answer!', `Your answer is correct!`, 'success');
            setA('');
            setB('');
            setC('');
        } else {
            setAnswerCorrect5(false);
            await Swal.fire({
                icon: 'error',
                title: 'Incorrect Answer!',
                text: `Check the signs of a, b and c and use the Arbitary Point method to determine the answer.`,
                confirmButtonText: 'OK',
            });
        }
    }

    const layout = {
        title: 'Line Plot',
        xaxis: {
            title: 'X-axis',
            range: [-10, 10],
            tickmode: 'linear',
            dtick: 1,
        },
        yaxis: {
            title: 'Y-axis',
            range: [-10, 10],
            tickmode: 'linear',
            dtick: 1,
        },
        showlegend: false,
    };
    
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
                <div className="bg-gray-300 p-4 rounded-md">
                    <div className='p-4'>
                        <h4> Instructions</h4>
                        <p>
                            <ul class="list-disc">
                                <li>You have to select the section of the graph that represents the inequation Ax+By+C{'>'}0.</li>
                                <li>First you have to enter the values of A, B and C respectively and select a point arbitrarily to check the section.</li>
                                <li>Substitute the values of the X and Y co-ordinates in the equation and If the derived value of the expression is less than zero then the point lies in the negative region or else in the positive region.</li>
                            </ul>
                        </p>
                        <div className="">

                            <div id="input" className="">
                                <h1 className="font-bold text-lg text-center"><br />Input</h1>
                                <div className='flex justify-center items-center'>
                                    a:
                                    <input className='bg-white rounded-full mx-2 my-6 px-3'
                                        type="number"
                                        value={a}
                                        placeholder='Enter A'
                                        onChange={(event) => setA(event.target.value)}
                                    />
                                </div>
                                <div className='flex justify-center items-center'>
                                    b:
                                    <input className='bg-white rounded-full mx-2 my-6 px-3'
                                        type="number"
                                        value={b}
                                        placeholder='Enter B'
                                        onChange={(event) => setB(event.target.value)}
                                    />
                                </div>
                                <div className='flex justify-center items-center'>
                                    c:
                                    <input className='bg-white rounded-full mx-2 my-6 px-3'
                                        type="number"
                                        value={c}
                                        placeholder='Enter C'
                                        onChange={(event) => setC(event.target.value)}
                                    />
                                </div>
                                <br />
                                <div className='flex justify-center items-center'>
                                    <button className=" btn btn-lg btn-primary " onClick={handlePlot}>Plot</button>
                                </div>
                                <div className='flex justify-between mt-4' >
                                    <button type="button" className="btn btn-danger" onClick={checkred}>Red</button>
                                    <button type="button" className="btn btn-success" onClick={checkgreen}>Green</button>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-400 p-4 col-span-2 rounded-md">
                    <Plot className="float-left ml-5 px-4 my-4"
                        data={plotData}
                        layout={layout}
                        config={{ displayModeBar: false }}
                        style={{ width: '700px', height: '500px' }}
                    />

                    {plotData && (
                        <div id="graph" className="float-left ml-5 px-4 my-4">
                        </div>
                    )}
                </div>
            </div>

        </>
    );
};

export default Region;
