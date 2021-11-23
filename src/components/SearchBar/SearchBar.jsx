import React, { Component } from 'react'; 
import axios from 'axios';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }
    
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSumbit() {
        console.log(this.state.search)
        this.props.startSearch(this.state.search)
    }

    render() { 
        return (
            <div>
            <input name="search"onChange={this.handleChange}></input>
            <button onClick={() => this.handleSumbit(this.state.search)}>Search</button>
            </div>
        )
    }
}

export default SearchBar;