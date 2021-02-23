import React from "react";
import {Circle, StyledForm} from "./styles/SailWindStyles";

const App = () => {
    const appTitle = "Welcome to Clyde"

    const clickMeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!e.currentTarget.className) {
            e.currentTarget.className = "animate-spin";
            e.currentTarget.innerHTML = "click to stop";
        } else {
            e.currentTarget.className = "";
            e.currentTarget.innerHTML = "click again to spin";
        }
    };

    return (
        <StyledForm>
            <h1 className={"bg-yellow-100"}>{appTitle}</h1>
            <form>
                <input type='text' placeholder='Full name'/>
                <input type="password" placeholder='Password'/>
                <button onClick={(e) => {
                    clickMeHandler(e);
                }}>Click Me!
                </button>
            </form>
            <Circle>Thank you</Circle>
        </StyledForm>
    );
}

export default App;
