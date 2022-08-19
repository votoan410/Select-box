import React, { useState, useEffect } from "react";

const SelectFn = () => {
  const boxValues = [
    { value: "Select All", checked: false },
    { value: "Kosher", checked: false },
    { value: "No Celery", checked: false },
    { value: "No Egg", checked: false },
  ];
  const [state, setState] = useState(boxValues);
  const [selectedOutput, setSelectedOutput] = useState("");

  useEffect(() => {
    console.log("state updated? ", state);

    let temp = state
      .filter((entry) => entry.checked)
      .map((entry) => entry.value)
      .join(" , ");
    setSelectedOutput(temp);
  }, [state]);

  const handleChange = (event) => {
    // if select all was selected
    if (event.target.value == "Select All") {
      // checked if there is any box checked
      let newArr = state.slice(1);
      const otherChecked = newArr.every((entry) => entry.checked);
      const allChecked = state.every((entry) => entry.checked);
      let selectAllState = [];

      // if all other boxes are checked, set them to false
      if (otherChecked && event.target.checked == true) {
        selectAllState = state.map((obj) => {
          if (obj.value == event.target.value) {
            return { ...obj, checked: true };
          }
          return { ...obj, checked: false };
        });
      }
      // clear if all box  checked
      else if (allChecked) {
        selectAllState = state.map((obj) => {
          return { ...obj, checked: false };
        });
      }
      // otherwise set everything to checked
      else {
        selectAllState = state.map((obj) => {
          return { ...obj, checked: true };
        });
      }

      setState(selectAllState);
    } else {
      const newState = state.map((obj) => {
        if (obj.value == event.target.value) {
          return { ...obj, checked: event.target.checked };
        }
        return obj; //  otherwise return object as is
      });
      setState(newState);
    }
  };

  // a bit redundant, will refractor later
  const handleClear = (event) => {
    if (event.target.value == "clear") {
      const clearAllState = state.map((obj) => {
        return { ...obj, checked: false };
      });
      setState(clearAllState);
    }
  };

  return (
    <>
      {" "}
      <section> Selected value: {selectedOutput}</section>
      <br></br>
      <form>
        {state?.map((entry) => {
          return (
            <>
              <label>
                <input
                  type="checkbox"
                  value={entry.value}
                  checked={entry.checked}
                  onChange={(event) => handleChange(event)}
                />
                {entry.value}
              </label>
              <br></br>
            </>
          );
        })}
      </form>
      <br></br>
      <button value="clear" onClick={(e) => handleClear(e)}>
        Clear All
      </button>
    </>
  );
};

export default SelectFn;

{
  /* <form>
        <label>
          <input
            type="checkbox"
            value="Kosher"
            onChange={(event) => {
           
            }}
          />
          Select all
        </label>
        <br></br>
        <label>
          <input
            type="checkbox"
            value="Kosher"
            onChange={(event) => {
             
            }}
          />
          Kosher
        </label>
        <br></br>
        <label>
          <input
            type="checkbox"
            value="Kosher"
            onChange={(event) => {
           
            }}
          />
          No Celery
        </label>
        <br></br>
        <label>
          <input
            type="checkbox"
            value="Kosher"
            onChange={(event) => {
            }}
          />
          No egg
        </label>
      </form> */
}
