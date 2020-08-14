import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../helpers/history';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../components/PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import { NavigationMenu } from '../NavBar/NavigationMenu'
import { NoRoute } from '../NoRoute/NoRoute';
import { Footer } from '../Footer/Footer';
import { EditRoute } from '../EditRoute/EditRoute';

import { RouteList } from '../RouteList/RouteList';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
            <div className="">
                <NavigationMenu />
                <div className="container2">
                    <div className="col-md-12">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute path="/list" component={RouteList} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <PrivateRoute path="/edit/:id" component={EditRoute} />
                                <Route path="***" component={NoRoute} />
                            </Switch>
                        </Router>
                    </div>
                </div>
                <Footer/>
            </div>   
    );
}

export { App };