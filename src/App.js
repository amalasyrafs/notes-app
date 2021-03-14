import './App.css';
import { GlobalProvider } from './components/GlobalState';
import NoteList from './components/note-list';

function App() {
  return (
    <GlobalProvider>
      <div className='App'>
        <div className='container'>
          <h1>NOTES APP</h1>
          <h1>LIST OF NOTES:</h1>
          {/* <CreateNote /> */}
          {/* <SearchBar /> */}
          <NoteList />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
