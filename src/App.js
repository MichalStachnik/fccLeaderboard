import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    alltime: [],
    recent: [],
    current: 'recent'
  }

  changeView(x){
    this.setState({current: x})
  }

  componentDidMount(){
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then((response) => {
      this.setState({
        recent: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
    .then((response) => {
      this.setState({
        alltime: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    let data = this.state[this.state.current]
    console.log(data)
    return (
      <div>
        <button onClick={() => this.changeView('recent')}>Recent</button>
        <button onClick={() => this.changeView('alltime')}>All Time</button>
        <h1>Displaying {this.state.current}</h1>
        <ol>
          {data.map((user, index) => (
            <li key={index}>
              <p>{user.username}</p>
              <p>Alltime: {user.alltime}</p>
              <p>Recent: {user.recent}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
export default App;
