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
    const [eqHolder1, setEqHolder1] = useState(null);
    const [eqHolder2, setEqHolder2] = useState(null);

    const detected = ['/', '*', '+', '-', '.', '=', 'del'];
    const chars = ['A', 'B', 'C', 'D', 'E', 'F']
    const nums = [1,2,3,4,5,6,7,8,9]

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
                    setCalculations(deleted)
                    setDisplay(charDeleted);
                } 
                else {
                    let deleted = calculations.slice(0, -1);
                    let charDeleted = display.slice(0,-1);

                    setCalculations(deleted);
                    setDisplay(charDeleted);
                }
            } else if (value === "=") {

                let answer = 0;
                let answer1 = 0;
                let exponent = 0;
                let j = 0;
                let operation = "none";
                let equals = 0;
                for(let i = display.length-1; i >= 0; i--){
                    exponent = Math.pow(16, j);                 

                   
                    if(chars.includes(display[i])){
                        answer += handleChar(display[i]) * exponent;
                        console.log("Letter detected")
                        j++;
                    } 
                    
                    else if(nums.includes(display[i]) && !chars.includes(display[i])){          
                        console.log("number detected")
                        answer += display[i] * exponent;
                        j++;
                    }
                    else if(detected.includes(display[i]) && !nums.includes(display[i]) && !chars.includes(display[i])){
                        console.log("Setting h1")
                        equals = answer;
                        answer = 0; 
                        j = 0;   
                        if(display[i] === '+'){
                            operation = "+";
                        } else if (display[i] === '-'){
                            operation = "-";
                        }
                    }
                    console.log("answer: " + answer + "\neq: " + equals)

                }
                
                if(operation === "none"){
                    console.log("none")
                    setResult(answer.toString());
                        setShow(true);
                } else if (operation === "+"){
                    console.log("add")

                    let tempresult = answer + equals;
                    setResult(tempresult.toString());
                    setShow(true);
                } else if (operation === "-"){
                    console.log("min")

                    let tempresult2 = answer - equals;
                    setResult(tempresult2.toString());
                    setShow(true);
                }
                
            } else if (value === "A") {
                setDisplay(display + "A");
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
            } else if (detected.includes(value)){
                setDisplay(display + value)
            }
            
            else {
                console.log("Pressed =")

                setDisplay(display + value);
                setCalculations(calculations + value);
                
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
