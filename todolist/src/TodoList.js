import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import { Navbar, NavbarBrand, Toast, Card, CardGroup } from "react-bootstrap";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      items: [],
      alert: false,
      incomplete: 0,
      complete: 0,
      checked: false
    };
    this.addItem = this.addItem.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  addItem(e) {
    if (this._inputElement.value !== "") {
      let newItem = {
        task: this._inputElement.value,
        id: this.state.count,
        complete: false
      };

      this.setState(prevState => {
        return {
          items: prevState.items.concat(newItem),
          count: this.state.count + 1,
          incomplete: this.state.incomplete + 1
        };
      });

      this._inputElement.value = "";
      console.log(this.state.items);

      e.preventDefault();
    } else {
      this.toggleAlert(!this.state.alert);
      e.preventDefault();
    }
  }

  toggleAlert(show) {
    this.setState({ alert: show });
  }

  toggleCheck(checked) {
    if (checked) {
      this.setState({incomplete: this.state.incomplete - 1, complete: this.state.complete + 1, checked: true});
    }
    else {
      this.setState({incomplete: this.state.incomplete + 1, complete: this.state.complete - 1, checked: true});
    }
  }

  render() {
    return (
      <div>
        <Navbar expand="lg" variant="dark" bg="dark" fixed="top">
          <NavbarBrand href="#">Todo List</NavbarBrand>
        </Navbar>
        <div className="todoListMain">
          <div className="header">
            <CardGroup style={{ marginTop: "1rem" }}>
              <Card style={{ width: "18rem" }} bg="success">
                <Card.Body>
                  <Card.Title>Incomplete Tasks:</Card.Title>
                  <Card.Text>{this.state.incomplete}</Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }} bg="warning">
                <Card.Body>
                  <Card.Title>Completed Tasks:</Card.Title>
                  <Card.Text>{this.state.complete}</Card.Text>
                </Card.Body>
              </Card>
              <Card style={{ width: "18rem" }} bg="info">
                <Card.Body>
                  <Card.Title>Total Tasks:</Card.Title>
                  <Card.Text>{this.state.count - 1}</Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
            <form onSubmit={this.addItem}>
              <input
                ref={a => (this._inputElement = a)}
                placeholder="enter task"
                style={{ border: "1px solid black" }}
              ></input>
              <button type="submit">add</button>
            </form>
          </div>
          <TodoItems entries={this.state.items} toggleCheck={this.toggleCheck} inputRef={ref => this._inputElement = ref}/>
          <Toast
            show={this.state.alert}
            onClose={() => this.toggleAlert(false)}
          >
            <Toast.Header>
              <strong className="mr-auto">Error!</strong>
            </Toast.Header>
            <Toast.Body>Please enter a valid task!</Toast.Body>
          </Toast>
        </div>
      </div>
    );
  }
}

export default TodoList;
