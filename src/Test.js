import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:null
        }
    }

    componentDidMount() {
        const url = `http://localhost:8085/getPhoneCity/17649818759`
        axios.get(url,{
            headers: {'Access-Control-Allow-Origin': '*'}
        }).then( response => {
            console.log(response);
        })
    }

    render() {
        return (
            <div>
                <h1>123</h1>
            </div>
        );
    }
}

Test.propTypes = {};

export default Test;
