import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

function Multi(props) {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const colors = useMemo(() => ['blue', 'red', 'orange', 'green'], []);
    const [randomColors, setRandomColors] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    useEffect(() => {
        const availableColors = [...colors];
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const correctAnswer = availableColors[randomIndex];

        setCorrectAnswer(correctAnswer);
        availableColors.splice(randomIndex, 1);

        const randomizedColors = [correctAnswer];
        for (let i = 1; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            randomizedColors.push(availableColors[randomIndex]);
            availableColors.splice(randomIndex, 1);
        }
        setRandomColors(randomizedColors);
    }, [colors]);

    function computeY(x, a, b) {
        return a * x + b;
    }

    const x = Array.from({ length: 100 }, (_, i) => i / 10 - 5);

    const y1 = x.map(xVal => computeY(xVal, parseFloat(a), parseFloat(b)));
    const y2 = x.map(xVal => computeY(xVal, -parseFloat(a), -parseFloat(b)));
    const y3 = x.map(xVal => computeY(xVal, parseFloat(a), -parseFloat(b)));
    const y4 = x.map(xVal => computeY(xVal, -parseFloat(a), parseFloat(b)));

    function handleInputChange(event) {
        const { name, value } = event.target;
        if (name === 'a') {
            setA(value);
        } else if (name === 'b') {
            setB(value);
        }
    }

    async function checkAnswer(color) {
        if (a === '' || b === '') {
            Swal.fire('Missing Values', 'Please enter values of slope and intercept before selecting an option.', 'warning');
        }
        if (color === correctAnswer) {
            props.setAnswerCorrect(true);
            Swal.fire('Correct Answer!', `Your answer is correct!`, 'success');
            setA('');
            setB('');

            const availableColors = [...colors];
            const randomIndex = Math.floor(Math.random() * availableColors.length);
            const newCorrectAnswer = availableColors[randomIndex];
            setCorrectAnswer(newCorrectAnswer);
            availableColors.splice(randomIndex, 1);

            const randomizedColors = [newCorrectAnswer];
            for (let i = 1; i < 4; i++) {
                const randomIndex = Math.floor(Math.random() * availableColors.length);
                randomizedColors.push(availableColors[randomIndex]);
                availableColors.splice(randomIndex, 1);
            }
            setRandomColors(randomizedColors);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Incorrect Answer!',
                text: `Recheck the signs of 'a' and 'b' and then select the right plot. `,
                showCancelButton: false,
                confirmButtonText: 'Okay',
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 p-3 gap-3">
                <div className="bg-gray-300 p-4 rounded-md">
                    {/* Content for the left grid */}
                    <div className='p-4'>
                        <h4> Instructions</h4>
                        <p>
                            <ul class="list-disc">
                                <li>You have to select the right line that represents the equation y{'='}Mx+c.</li>
                                <li>First you have to enter the values of slope{"("}M{")"} and the intercept{"("}c{")"} respectively and select a line which represents the equation out of the four options provided.</li>
                            </ul>
                        </p>
                        <div className="" id="input">
                            <div className="a" ID="INPUT"><br />
                                <label htmlFor="a" className="flex justify-center">Enter the slope: </label>
                                <div className="flex items-center justify-center ">
                                    <input
                                        className="bg-white rounded-full m-2 p-2 text-center"
                                        id="a"
                                        name="a"
                                        type="text"
                                        placeholder="Enter Slope"
                                        value={a}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <br />
                                <label htmlFor="b" className="flex justify-center">Enter the Intercept: </label>
                                <div className="flex items-center justify-center ">

                                    <input
                                        className="bg-white rounded-full m-2 p-2 text-center"
                                        id="b"
                                        name="b"
                                        type="text"
                                        placeholder='Enter Intercept'
                                        value={b}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="flex justify-between">
                                {randomColors.map((color, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        style={{ backgroundColor: color }}
                                        className='p-2 rounded-lg text-white'
                                        onClick={() => checkAnswer(color)}
                                    >
                                        {color.charAt(0).toUpperCase() + color.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <br />
                        </div>
                    </div>


                </div>
                <div className=" main-content bg-gray-400 p-4 col-span-2 rounded-md">
                    <div className=''>
                        < div class="flex m-2 justify-start items-center ">
                            <div id="graph" className="float-left ml-5 px-4 my-4">
                                <Plot
                                    data={[
                                        {
                                            x: x,
                                            y: y1,
                                            type: 'scatter',
                                            mode: 'lines',
                                            name: randomColors[0],
                                            line: { color: randomColors[0] },
                                        },
                                        {
                                            x: x,
                                            y: y2,
                                            type: 'scatter',
                                            mode: 'lines',
                                            name: randomColors[1],
                                            line: { color: randomColors[1] },
                                        },
                                        {
                                            x: x,
                                            y: y3,
                                            type: 'scatter',
                                            mode: 'lines',
                                            name: randomColors[2],
                                            line: { color: randomColors[2] },
                                        },
                                        {
                                            x: x,
                                            y: y4,
                                            type: 'scatter',
                                            mode: 'lines',
                                            name: randomColors[3],
                                            line: { color: randomColors[3] },
                                        },
                                    ]}
                                    layout={{
                                        width: 700,
                                        height: 500,
                                        title: 'Line Plot',
                                        xaxis: { title: 'X Axis' },
                                        yaxis: { title: 'Y Axis' },
                                        showlegend: false,
                                    }}
                                    config={{ displayModeBar: false }}
                                />
                            </div>
                        </div >
                    </div>
                </div>
            </div>

        </>
    );
}
export default Multi
