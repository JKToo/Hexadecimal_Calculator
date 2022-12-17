import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Calculator() {
    const [calculations, setCalculations] = useState("");
    const [result, setResult] = useState("");
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState("");
    const [performMath, setMath] = useState("");
    const [holder, setHolder] = useState("")
    const [total, setTotal] = useState(0)
    const [op, setOp] = useState("")
    // const [equations, setEquations] = useState(0)
    const [eqHolder1, setEqHolder1] = useState(0);
    const [eqHolder2, setEqHolder2] = useState(0);

    const detected = ['/', '*', '+', '-', '.', '=', 'del'];
    const chars = ['A', 'B', 'C', 'D', 'E', 'F']

    function handleChar(value){
        switch(value){
            case "A":
                return 10;
            case "B":
                return 11;
            case "C":
                return 12;
            case "D":
                return 13;
            case "E":
                return 14;
            case "F":
                return 15;
        }
    }
    const handleClick = value => {
        if (detected.includes(value) && calculations === '' || detected.includes(value) && detected.includes(calculations.slice(-1))) {
            return;
        }


        if (value === "clear") {
            setCalculations("");
            setResult("0");
            setDisplay("");
            setShow(false);
        }
        else {
            if (value === "del") {
                if(chars.includes(display.slice(-1))){
                    let deleted = calculations.slice(0, -2);
                    let charDeleted = display.slice(0,-1);
                console.log(deleted)
                    setCalculations(deleted)
                    setDisplay(charDeleted);
                } else {
                    let deleted = calculations.slice(0, -1);
                    let charDeleted = display.slice(0,-1);

                console.log(deleted)
                    setCalculations(deleted);
                    setDisplay(charDeleted);
                }
            } else if (value === "=") {

                let temp = 0;
                let temp1 = 0;
                let exponent = 0;
                let j = 0;
                let operation = "none";
                let equations = 0;
                for(let i = display.length-1; i >= 0; i--){
                    exponent = Math.pow(16, j);   

                    if(op !== "" && equations % 2 === 0 && equations !== 0){
                        console.log("Accessing operation loop")
                        if(op === "+"){
                            // let resulting = eqHolder1 + eqHolder2;
                            // setEqHolder1(resulting);
                            // setResult(resulting.toString());
                            equations=1;
                            setOp("")
                        }
                        if(op === "-"){
                            let resulting = eqHolder1 - eqHolder2;
                            setEqHolder1(resulting);
                            setResult(resulting.toString());
                            equations = 1;
                            setOp("")
                        }
                    }

                    else if(chars.includes(display[i])){
                        // console.log("A = " + handleChar(display[i]) + " to the power of " + exponent)
                        temp += handleChar(display[i]) * exponent;
                        j++;
                    } 
                    else if(detected.includes(display[i])){
                        console.log("op detected")
                        j = 0;
                        setTotal(temp);
                        operation = display[i];
                        if (operation ===  "+"){
                                if(eqHolder1 === 0){
                                    setEqHolder1(temp);
                                    setOp("+")
                                    equations++;
                                } else {
                                    setEqHolder2(temp);
                                    setOp("+")
                                    equations++;
                                }
                            }
                                // setResult((total + temp).toString())
                                // setTotal(result)
                                // break;
                            else if (operation === "-"){
                                if(eqHolder1 === 0){
                                    setEqHolder1(total);
                                    setOp("+")
                                    equations++;

                                } else {
                                    setEqHolder2(total);
                                    setOp("+")
                                    equations++;

                                } 
                            }
                                // setResult((total - temp1).toString())
                                // setTotal(result)
                                // break;
                        
                    }
                    else {                
                    temp += display[i] * exponent;
                    // console.log("[0]temp = " + temp + " + " + display[i] + " * " + exponent)
                    j++;
                    }
                }

                

                console.log("After loop: " + temp)
                setHolder(temp.toString())
                setResult(temp.toString());
                setShow(true);
            } else if (value === "A") {
                setDisplay(display + "A");
                console.log("reached")
                value = 10;
                setCalculations(calculations + value);
            } else if (value === "B") {
                setDisplay(display + "B");
                value = 11;
                setCalculations(calculations + value);
            } else if (value === "C") {
                setDisplay(display + "C");
                value = 12;
                setCalculations(calculations + value);
            } else if (value === "D") {
                setDisplay(display + "D");
                value = 13;
                setCalculations(calculations + value);
            } else if (value === "E") {
                setDisplay(display + "E");
                value = 14;
                setCalculations(calculations + value);
            } else if (value === "F") {
                setDisplay(display + "F");
                value = 15;
                setCalculations(calculations + value);
            } else {
                console.log("Pressed =")

                setDisplay(display + value);
                setCalculations(calculations + value);
                if (!detected.includes(value) && value !== "=") {
                  
                    // console.log(holder + " + " + value)
                    // let temp = Number(holder);
                    // let temp2 = Number(value);
                    // setResult(eval(temp + temp2).toString());
                    // setHolder(eval(temp + temp2))
                }
            }
        }

    }

    return (
        <>
            <Card sx={{ maxWidth: 400, minHeight: 600, justifyContent: "center", margin: "auto", marginTop: "20px", backgroundColor: "#323233" }}>
                <Card className="outline" sx={{ maxWidth: 345, justifyContent: "center", margin: "auto", marginTop: "20px", backgroundColor: "#f7f7fc" }}>
                    <h3> {show ? <h3>{result} <hr /></h3> : <h3>0<hr /></h3>}{display || "0"}</h3>
                </Card>

                <Card sx={{ maxWidth: 340, justifyContent: "center", margin: "auto", marginTop: "20px" }}>
                    <div style={{ justifyContent: "center", textAlign: "center", }}>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white",  marginTop: "30px", marginBottom:"5px", width: 280 }} onClick={() => handleClick("clear")}>Clear</Button>

                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("A")} >A</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("B")}>B</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("C")}>C</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("del")}>del</Button>


                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("D")}>D</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("E")}>E</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("F")}>F</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick('+')}>+</Button>

                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("1")} >1</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("2")}>2</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("3")}>3</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick('-')}>-</Button>

                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("4")}>4</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("5")}>5</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("6")}>6</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick('*')}>*</Button>

                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("7")}>7</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("8")}>8</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("9")}>9</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick('/')}>/</Button>

                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick('.')}>.</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px" }} onClick={() => handleClick("0")}>0</Button>
                        <Button style={{ backgroundColor: "rgb(0, 114, 229)", color: "white", margin: "4px", width: 137 }} onClick={() => handleClick("=")}>=</Button>

                    </div>
                    <br />
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    </ButtonGroup>
                </Card>
            </Card>
        </>
    );
}

export default Calculator;
