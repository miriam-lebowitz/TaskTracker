import React, { Component } from "react";
import { Form } from "react-bootstrap";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.state = { checkboxChecked: false };
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(checked) {
    this.setState({ checkboxChecked: checked });
  }

  createTasks(item) {
    return (
      <div>
        <Form>
          {["checkbox"].map(type => (
            <div key={`custom-${type}`} className="mb-3">
              <Form.Check
                custom
                type={type}
                id={item.id}
                label={item.task}
              />
            </div>
          ))}
        </Form>
      </div>
    );
  }

  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>;
  }
}

export default TodoItems;
