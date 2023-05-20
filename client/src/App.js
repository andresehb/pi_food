import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landing_page/LandingPage";
import Home from "./components/home/Home";
import CreateRecipe from "./components/createRecipe/CreateRecipe";
import Detail from "./components/detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/recipes" component={CreateRecipe} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
