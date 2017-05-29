import React, {Component} from 'react';
import './App.css';

class Clock extends Component{
	constructor(props){
		super(props);
		this.state = {
			days : 0,
			hours: 0,
			minutes:0,
			seconds: 0
		}
		this.interval_run = '';
	}

	getTimeUntil(deadline){
		const time = Date.parse(deadline) - Date.parse(new Date());
		const days = Math.floor((time/(1000*60*60*24)));
		const hours = Math.floor((time/(1000*60*60)) % 24);
		const minutes = Math.floor((time/1000/60) % 60);
		const seconds = Math.floor((time/1000) % 60);

		this.setState({days : days, hours: hours,minutes : minutes, seconds :seconds});
		if(time < 0){
			clearInterval(this.interval_run);
			this.interval_run = '';
	    	alert('It is already Countdown Finish');
		}
	}

	componentWillMount(){
		this.getTimeUntil(this.props.deadline);
	}

	componentDidMount(){
		this.interval_run = setInterval(()=> this.getTimeUntil(this.props.deadline) , 1000);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.deadline !== this.props.deadline && !this.interval_run){
			this.interval_run = setInterval(()=> this.getTimeUntil(this.props.deadline) , 1000);
		}
	}

	leading0(num){
		if(num < 0){
			return 0;
		}
		else if(num < 10){
			return '0'+num;
		}

		return num;
	}

	render(){
		return (
			<div>
				<div className="Clock-days">{this.leading0(this.state.days)} Days</div>
				<div className="Clock-hours">{this.leading0(this.state.hours)} hours</div>
				<div className="Clock-minutes">{this.leading0(this.state.minutes)} minutes</div>
				<div className="Clock-seconds">{this.leading0(this.state.seconds)} seconds</div>
			</div>
		);
	}
}

export default Clock;