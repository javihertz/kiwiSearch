import React, { Component } from 'react';
import InputSuggestions from './InputSuggestions.jsx'
import '../KiwiApp.css';
import Calendar from 'react-calendar';


class SearchFlight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            from: "",
            to: "",
            date: "",
            dateError: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
        this.setInputValueOnClick = this.setInputValueOnClick.bind(this);
    }
    state = {
        date: new Date(),
      }
      
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmitForm(this.state.from, this.state.to, new Date(this.state.date).toLocaleDateString());        
    }

    onChange = date => {
        this.setState({ date })
    }

    setInputValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setInputValueOnClick(e, name) {
        this.setState({
            [name]: e.target.innerHTML
        });
    }

    render() {
        const { hasError } = this.props;
        const { dateError } = this.state;
        const errorMessage = <p style={{ color: 'red',}}>One of the fields entered does not meet the search requirements</p>;
        return (
            <div className="row SearchFlight">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <form onSubmit={this.onSubmit} className="flight-form">
                        <div className="col-md-6">
                            <InputSuggestions title="Origin" name="from"
                                setValue={this.setInputValue}
                                inputState={this.state.from}
                                onClickInput={this.setInputValueOnClick}
                                placeholder="city" />
                        </div>
                        <div className="col-md-6">
                            <InputSuggestions title="Destination"
                                name="to"
                                setValue={this.setInputValue}
                                inputState={this.state.to}
                                onClickInput={this.setInputValueOnClick}
                                placeholder="city" />
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Date to travel</label>

                                <Calendar
                                    name="date"
                                    onChange={this.onChange}
                                    value={this.state.date}
                                    formatMonth
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn form-btn"> Search </button></div>
                    </form>
                </div>
                {hasError ? errorMessage : ''}
                {dateError ? dateError : ''}
            </div>
        );
    }
}

export default SearchFlight;

