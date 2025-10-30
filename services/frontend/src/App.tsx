import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './pages/Products';
import Segments from './pages/Segments';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/segments" component={Segments} />
      </Switch>
    </Router>
  );
};

export default App;