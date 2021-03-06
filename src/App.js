import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WebcamRegister from './components/WebcamRegister';
import WebcamSignin from './components/WebcamSignin';
import AfterRegister from './components/AfterRegister';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <WebcamRegister />
          </Route>
          <Route path="/success">
            <AfterRegister />
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
