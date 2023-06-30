import { routeLists } from '@/config/constant';
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const routes = [
  { path: routeLists.app, component: Home, exact: true },
  { path: routeLists.login, component: Login, exact: true },
];
function Routes() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  );
}
export default Routes;