import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [annotations, setAnnotations] = useState([]);
  const [input, setInput] = useState(
    "India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world."
  );
  
  const handleMouseUp = () => {
    const selectedText = window.getSelection().toString();
    const annotationFindIndex = annotations.findIndex((object) => {
      return object.text === selectedText;
    });

    const startIndexOfSelectedText = () => {
      if (annotationFindIndex !== -1) {
        const searchFrom =
          input.indexOf(selectedText) + 7 + selectedText.length;
        return input.indexOf(selectedText, searchFrom);
      }
      return input.indexOf(selectedText);
    };
    const endIndexOfSelectedText =
      startIndexOfSelectedText() + selectedText.length;
    const fetchingTheSelectedText = input.substring(
      startIndexOfSelectedText(),
      endIndexOfSelectedText
    );
    const replaceTextSpan = `<span style='background-color:red'>${fetchingTheSelectedText}</span>`;

    const newInput =
      input.substring(0, startIndexOfSelectedText()) +
      replaceTextSpan +
      input.substring(endIndexOfSelectedText, input.length);
    setInput(newInput);
    if (selectedText !== "" && annotationFindIndex === -1) {
      const temp = {
        text: selectedText,
        id: nanoid(),
        type: "DEFINE",
      };
      setAnnotations((annotations) => [...annotations, temp]);
    }
  };

  useEffect(() => {}, [annotations]);
  return (
    <div className="App">
      <label htmlFor="inputQuery">Please Enter the text to annotate: </label>

      {
        <div
          onMouseUp={handleMouseUp}
          dangerouslySetInnerHTML={{ __html: input }}
        ></div>
      }
      <table>
        <thead>
          <tr>
            <th>Id(auto)</th>
            <th>Text</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {annotations &&
            annotations.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.text}</td>
                <td>{item.type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
