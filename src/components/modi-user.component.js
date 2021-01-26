import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const User = props =>(
	<ul className="list-group">
		<li className="list-group-item">
			<p>{props.User.username}</p>
			<span className="badge"><a href="#" onClick={()=>{props.deleteUser(props.User._id)}}>삭제</a></span>			
		</li>
	</ul>
)

export default class ModiUser extends Component{
	constructor(props){
		super(props);

		this.deleteUser = this.deleteUser.bind(this);

		this.state = {users:[]};
	}

	componentDidMount(){
		axios.get('http://localhost:5000/users/')
			.then(response => {
				this.setState({users: response.data});
			})
			.catch((error)=>{
				console.log(error);
			})
	}

	deleteUser(id){
		axios.delete('http://localhost:5000/users/'+id)
			.then(res =>console.log(res.data));
		this.setState({
			users:this.state.users.filter(el=> el._id !== id)
		})
		
	}

	UserList(){
		return this.state.users.map(curuser => {
			return <User
				User = {curuser}
				deleteUser = {this.deleteUser}
				key = {curuser._id}/>;
		})
	}

	render(){
		return (
			<div>
				<h3>User List</h3>
				{this.UserList()}
			</div>
		)
	}
}