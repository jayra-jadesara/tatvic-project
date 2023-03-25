import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import globalConstant from './globalConstant';
import { createBrowserHistory } from "history";
import Login from './components/Login';
import Dashboard from './components/home/Dashboard';
import ScoreCard from './components/home/ScoreCard';
import Wikipedia from './components/home/Wikipedia';

export const history = createBrowserHistory();

const App = () => {
  return (
    <>
      <Router history={history}>
        <Dashboard>
          <Routes>
            <Route path={globalConstant.CREDENTIAL_FORM} element={<Login />}></Route>
            <Route path={globalConstant.DASHBOARD} element={<Wikipedia />}></Route>
            <Route path={globalConstant.SCORECARD} element={<ScoreCard />}></Route>
          </Routes>
        </Dashboard>
      </Router>
    </>
  );
};

export default App;