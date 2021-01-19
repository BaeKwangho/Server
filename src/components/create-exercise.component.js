import React, {Component} from 'react';

//module
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default class CreateExercise extends Component{

	//setting initial state of the component
	constructor(props){
		super(props);

		//this가 함수들 안에서 정상적으로 작동할 수 있도록, 
		//함수를 this에 bind 해주어야 한다.
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username:'',
			description : '',
			duration:0,
			date: new Date(),
			users:[]
		}
	}

	//people filling out the form must select the user
	//associated with the exercise from a drop down list.

	//결국, mongoDB에서 바로 user list가 불러져야 하지만 일단은.. 하드코딩으로 대체한다.
	//이 함수는 React life cycle의 일부이며 component가 연결된 후 바로 불러지게 된다.
	componentDidMount(){
		this.setState({
			users:['test user'],
			username: 'test user'
		});
	}
	
	//add methods in order to update the state properties
	onChangeUsername(e){
		this.setState({
			username: e.target.value
		});
	}
	onChangeDescription(e){
		this.setState({
			description: e.target.value
		});
	}
	onChangeDuration(e){
		this.setState({
			duration:e.target.value
		});
	}
	//조금 다른 건, 나중에 date picker library를 추가해줄 예정이라 그럼
	//event 변수 자리에 date가 온 것에 유의
	onChangeDate(date){
		this.setState({
			date: date
		});
	}

	//add this to handle the submit event of the form
	onSubmit(e){

		//default HTML form이 전송되는 것을 방지.
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};

		console.log(exercise);

		//홈으로 돌아가는 기능
		window.location = '/';
	}

	render(){
		return (
			<div>
				<h3>Create Exercise component</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						{/*
						어휴 주석 쓰기 힘드네..
						아래 select가 user list를 drop down해주는 역할을 함.
						*/}
						<select ref="userInput"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}>
							{
								this.state.users.map(function(user){
									return <option
										key={user}
										value={user}>{user}
									</option>;
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input 
							type="text"
							required
							className="form-control"
							value={this.state.description}
							onChange={this.onChangeDescription}/>
					</div>
					<div className="form-group">
						<label>Duration: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.duration}
							onChange={this.onChangeDuration}/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}/>
						</div>
					</div>

					<div className="form-group">
						<input
							type="submit"
							value="Create Exercise Log"
							className="btn btn-primary"/>
					</div>
				</form>
			</div>
		)
	}
}


