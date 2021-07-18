import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WebcamRegister from './components/WebcamRegister';
import WebcamSignin from './components/WebcamSignin';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register/:customerid">
            <WebcamRegister />
          </Route>
          <Route path="/sign-in">
            <WebcamSignin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
