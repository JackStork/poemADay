import "./App.css";

// Get date to display next to title
const date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let shortDate = `${day}/${month + 1}/${year}`;

function App() {
  return (
    <div className="App">
      <div className="Title">
        <text className="TitleName">Poem a Day</text>
        <text className="TitleDate">{shortDate}</text>
      </div>
      <hr className="TitleLine" />
      <div className="PoemEntry">
        <div className="PoemEntryDetails">
          <div className="PoemEntryDetailsSubject">
            <text className="PoemEntryDetailsSubjectSubject">Subject:</text>
            <text className="PoemEntryDetailsSubjectValue">Death</text>
          </div>
          <div className="PoemEntryDetailsForm">
            <text className="PoemEntryDetailsFormForm">Form:</text>
            <text className="PoemEntryDetailsFormValue">Ghazal</text>
          </div>
        </div>
        <div className="PoemEntryBox">
          <textarea type="text" className="PoemEntryBoxBox" />
          <button className="PoemEntryBoxSubmit" id="PoemEntryBoxSubmit">
            ✓
          </button>
        </div>
      </div>
      <hr className="TitleLine" />
      <div className="Posts"></div>
    </div>
  );
}

export default App;
