import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
	<tr>
	  <td>{props.Exercise.username}</td>
	  <td>{props.Exercise.description}</td>
	  <td>{props.Exercise.duration}</td>
	  <td>{props.Exercise.date.substring(0,10)}</td>
	  <td>
		<Link to={"/edit/"+props.Exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.Exercise._id) }}>delete</a>
	  </td>
	</tr>
  )
//이 Exercise component는 기능적 react 요소로 실행된다. class랑 다른 점은,
//state와 생명주기 함수가 부족하다는 것이다. 
//만약 prop 인자를 받아서 jsx만을 리턴하는게 목적이라면, 이것을 사용하는게 유용하다.

export default class ExercisesList extends Component{
	
	constructor(props){
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = {exercises:[]};
	}
	
	componentDidMount() {
		axios.get('http://localhost:5000/exercises/')
		 .then(response => {
		   this.setState({ exercises: response.data });
		 })
		 .catch((error) => {
			console.log(error);
		 })
	}

	deleteExercise(id){
		axios.delete('http://localhost:5000/exercises/'+id)
			.then(res => console.log(res.data));
		
		this.setState({
			exercises: this.state.exercises.filter(el=> el._id !== id)
		})
	}

	ExercisesList(){
		return this.state.exercises.map(currentexercise => {
			return <Exercise 
				Exercise = {currentexercise} 
				deleteExercise = {this.deleteExercise}
				key = {currentexercise._id}/>;
		})
	}
	//map 함수를 이용해서 현재 this.state.exercises에 있는 운동들을
	//가져오게 된다. 각각은 exercise component로 반환된다.
	//현재 운동은 페이지에 보여져야 한다.

	render(){
		return (
			<div>
				<h3>Exercise Log</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.ExercisesList()}
					</tbody>
				</table>
			</div>
		)
	}
}