import React, { Component } from 'react';
import axios from 'axios';
import apiURL from '../apiURL'

const Message = props => (
  <tr>
    <td>{props.message.name}</td>
    <td>{props.message.content}</td>
  </tr>
)

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
  }

  componentDidMount() {
    axios.get(apiURL + '/messages')
      .then(response => {
        this.setState({ messages: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  messageList() {
    return this.state.messages.map(currentmessage => {
      return <Message message={currentmessage} key={currentmessage._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Messages</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>name</th>
              <th>message</th>
            </tr>
          </thead>
          <tbody>
            { this.messageList() }
          </tbody>
        </table>
      </div>
    )
  }
}