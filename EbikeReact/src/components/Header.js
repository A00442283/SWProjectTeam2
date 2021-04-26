import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/NavMenu.css';
import {loginAtom, priceTrackAtom} from "../globalState/atom";
import {useRecoilState} from "recoil";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import HomeIcon from '@material-ui/icons/Home';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

export default function Header() {
  const [priceTrack,setPriceTrack] = useRecoilState(priceTrackAtom);
  const [user, setUser] = useRecoilState(loginAtom);
  return (
        <>
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><PermIdentityIcon/> {user.firstName? `${user.firstName} ${user.lastName}` : "Guest"}</NavbarBrand>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/"><HomeIcon/> Home</NavLink>
                </NavItem>
                {/*<NavItem>*/}
                {/*  <NavLink tag={Link} className="text-dark" to="/PeopleAdmin"> CustomerFetchTest</NavLink>*/}
                {/*</NavItem>*/}
                {user ? <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/pricing"><LoyaltyIcon/> {user.isMember? `Membership - ${user.isMember}` : "No Membership"}</NavLink>
                </NavItem> : ""}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/SignIn"><MeetingRoomIcon/>{user.personId ? 'SignOut' : 'Login'}</NavLink>
                </NavItem>
                {/*<NavItem>*/}
                {/*  <NavLink tag={Link} className="text-dark" to=""><AddShoppingCartIcon/> {priceTrack}$</NavLink>*/}
                {/*</NavItem>*/}
              </ul>
          </Container>
        </Navbar>
      </header>
        </>
    )
  }
