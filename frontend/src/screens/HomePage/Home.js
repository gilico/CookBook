import React, {useEffect} from 'react'
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import MainComp from '../../components/MainComp/MainCom';
import './Home.css'

function Home() {
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        if (!userInfo)
        {
            navigate('/signup');
        }
    }, [navigate, userInfo]);
    return (
        <MainComp title={`Hello, ${userInfo?.name}`}>
            <div className='home-main-box'>
                <div className='box-main'><Link to='/search'><span>Search Recipe</span></Link></div>
                <div className='box-main'><Link to='/my-recipes'><span>My Recipes</span></Link></div>
            </div>
        </MainComp>
    )
}

export default Home