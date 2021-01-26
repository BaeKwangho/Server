import React, {Component} from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
	constructor(props){
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username:''
		};
	}
	
	onChangeUsername(e){
		this.setState({
			username : e.target.value
		});
	}
	
	onSubmit(e){
		e.preventDefault();

		const newUser = {
			username: this.state.username,
		};

		console.log(newUser);
		//전달. axios.post send http post request to the backend endpoint
		//which is first argument of below line. this endpoint is expecting a
		//json object in the request body so we passed in the newUser object
		axios.post('http://localhost:5000/users/add',newUser)
			.then(res=>console.log(res.data));

		this.setState({
			username: ''
		})
	}
	
	render() {
		return(
			<div>
				<h3>Create User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<input type="text"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}/>
					</div>
					<div className="form-group">
						<input type="submit"
							value="Create User"
							className="btn btn-primary"/>
					</div>
				</form>
			</div>
		)
	}
}