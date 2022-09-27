import React, {useEffect} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/actions/userActions';
import header from './header.module.css'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const logoutHandler = async () => {
    dispatch(logout());
    navigate('/')
    await axios.get("/api/users/logout");
  }


  useEffect(() => {}, [userInfo]);

  return (
    <>
      <nav className={header.header}>
        <h1 id="title" className={header.h1}><a href="/">Cook Master</a></h1>
        <ul className={header.ul}>
          {!userInfo && <li className={header.li} key='l1'><Link to="/signup">Signup</Link></li>}
          {!userInfo && <li className={header.li} key='12'><Link to="/login">Login</Link></li>}
          {userInfo && <li key='l3'><Link to='/search' onClick>Search Recipe</Link></li>}
          {userInfo && <li key='l4'><Link to='/my-recipes'>My Recipes</Link></li>}
          {userInfo && <li key='l5'><Link to='/' onClick={logoutHandler}>Log out</Link></li>}
        </ul>
      </nav>
    </>
  )
}

export default Header