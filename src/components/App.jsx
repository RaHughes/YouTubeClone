import { render } from '@testing-library/react';
import React, { Component } from 'react'; 

class App extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return(
            <h1>YouTube Clone</h1>
        )
    }
}

export default App; 