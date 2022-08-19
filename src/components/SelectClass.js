import React, { Component } from "react";

export default class SelectClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxValue: [
        { value: "Select All", checked: false },
        { value: "Kosher", checked: false },
        { value: "No Celery", checked: false },
        { value: "No Egg", checked: false },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(event) {
    // if select all was selected
    if (event.target.value == "Select All") {
      // checked if there is any box checked
      let newArr = this.state.boxValue.slice(1);
      const otherChecked = newArr.every((entry) => entry.checked);
      const allChecked = this.state.boxValue.every((entry) => entry.checked);
      let selectAllState = [];

      // if all other boxes are checked, set them to false
      if (otherChecked && event.target.checked == true) {
        selectAllState = this.state.boxValue.map((obj) => {
          if (obj.value == event.target.value) {
            return { ...obj, checked: true };
          }
          return { ...obj, checked: false };
        });
      }
      // clear if all box  checked
      else if (allChecked) {
        selectAllState = this.state.boxValue.map((obj) => {
          return { ...obj, checked: false };
        });
      }
      // otherwise set everything to checked
      else {
        selectAllState = this.state.boxValue.map((obj) => {
          return { ...obj, checked: true };
        });
      }

      this.setState({ boxValue: selectAllState });
    }
    // individual selection
    else {
      const newState = this.state.boxValue.map((obj) => {
        if (obj.value == event.target.value) {
          return { ...obj, checked: event.target.checked };
        }
        return obj; //  otherwise return object as is
      });
      this.setState({ boxValue: newState });
    }
  }

  handleClear(event) {
    if (event.target.value == "clear") {
      const clearAllState = this.state.boxValue.map((obj) => {
        return { ...obj, checked: false };
      });
      console.log({ boxValue: clearAllState }, " vs ", this.state);
      this.setState({ boxValue: clearAllState });
    }
  }

  render() {
    return (
      <>
        <section className="header">
          Selected value:
          {this.state.boxValue
            .filter((entry) => entry.checked && entry.value !== "Select All")
            .map((entry) => entry.value)
            .join(" , ")}
        </section>
        <br></br>
        <form className="form">
          {this.state?.boxValue.map((entry) => {
            return (
              <>
                <label className="form__entry">
                  <input
                    type="checkbox"
                    value={entry.value}
                    checked={entry.checked}
                    onChange={(event) => this.handleChange(event)}
                  />
                  {entry.value}
                </label>
                <br></br>
              </>
            );
          })}
        </form>
        <br></br>
        <button
          className="button"
          value="clear"
          onClick={(e) => this.handleClear(e)}
        >
          Clear All
        </button>
      </>
    );
  }
}
