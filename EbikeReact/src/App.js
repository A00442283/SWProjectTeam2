import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './Layout';
import './App.css'
import SignIn from "./pages/SignIn";
import PeopleAdmin from "./components/Tables/PeopleAdmin";
import Pricing from "./pages/Pricing";
import Dashboard from "./components/Dashboard/Dashboard";
import Checkout from "./components/Checkout/Checkout";
import BatteriesPage from "./pages/BatteriesPage";
import BikesPage from "./pages/BikesPage";
import BikesAdmin from "./components/Tables/BikesAdmin";
import BatteriesAdmin from "./components/Tables/BatteriesAdmin";
import BatteriesAdminCreate from "./pages/Admin/Batteries/BatteriesAdminCreate";
import BatteriesAdminEdit from "./pages/Admin/Batteries/BatteriesAdminEdit";
import BikesAdminCredit from "./pages/Admin/BikesAdminCredit";
import AccelerationModePage from "./pages/AccelerationModesPage";
import BrakesPage from "./pages/BrakesPage";
import WheelPage from "./pages/WheelPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import Home from "./components/Blog/Home";
import PeopleAdminCredit from "./pages/Admin/PeopleAdminCredit";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route exact path='/SignIn' component={SignIn}/>
                <Route path='/AdminDashboard' component={Dashboard}/>

                <Route exact path='/BikesPage' component={BikesPage}/>
                <Route exact path='/BikesAdmin' component={BikesAdmin}/>
                <Route exact path='/BikesAdminCredit' component={BikesAdminCredit}/>

                <Route path='/PeopleAdmin' component={PeopleAdmin}/>
                <Route path='/PeopleAdminCredit' component={PeopleAdminCredit}/>

                <Route exact path='/Batteries' component={BatteriesPage}/>
                <Route exact path='/BatteriesAdmin' component={BatteriesAdmin}/>
                <Route exact path='/BatteriesAdminCreate' component={BatteriesAdminCreate}/>
                <Route exact path='/BatteriesAdminEdit' component={BatteriesAdminEdit}/>

                <Route exact path='/AccelerationMode' component={AccelerationModePage}/>
                <Route exact path='/Brakes' component={BrakesPage}/>
                <Route exact path='/Wheels' component={WheelPage}/>
                <Route exact path='/Accessories' component={AccessoriesPage}/>
                <Route exact path='/Checkout' component={Checkout}/>
                <Route path='/Pricing' component={Pricing}/>

            </Layout>
            </>
        );
    }
}
