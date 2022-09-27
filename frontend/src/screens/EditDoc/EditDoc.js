import axios from 'axios';
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import AddCollsComp from '../../components/AddCollsComp';
import ErrorMessage from '../../components/ErrorMessage';
import Expire from '../../components/Expire';
import MainComp from '../../components/MainComp/MainCom';
import {updateDocAction} from "../../redux/actions/documentAction";
import QuillComp from '../CreateDoc/QuillComp';


const EditDoc = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [coWorkers, setCoWorkers] = useState("");
    const [error, setError] = useState("");
    const [collaborators, setCollaborators] = useState([]);

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const sumbitHandler = (e) => {

        e.preventDefault();
        if (!title || !content) return;

        dispatch(updateDocAction(id, title, content, collaborators));
        let saveCont = document.getElementById('saved')
        if (saveCont)
        {
            saveCont.innerHTML = "Recipe Saved";
            setTimeout(() => {
                saveCont.innerHTML = "";
            }, 3000);
        }
    }



    useEffect(() => {
        if (!userInfo)
        {
            navigate('/signup');
        }

        const fetching = async () => {
            let {data} = await axios.get(`/api/docs/${id}`)

            setTitle(data.title);
            setContent(data.content);
        }

        fetching();

    }, [navigate, id, userInfo])

    // clean error element after 3 seconds
    useEffect(() => {
        if (error)
        {
            const errInterval = setInterval(() => {
                setError("");
            }, 3000);
            return () => clearInterval(errInterval);
        }
    }, [error])

    const resetHandler = () => {
        setTitle("");
        setContent("");
    }

    const deleteHandler = async () => {
        await axios.delete(`/api/docs/${id}`);
        navigate('/my-recipes');
    }


    return (
        <MainComp title={userInfo && `${userInfo.name}, Edit Document`}>
            {error && <Expire delay="3000"><ErrorMessage>{error}</ErrorMessage></Expire>}
            <div id='saved'></div>
            <form className="create-form" onSubmit={sumbitHandler}>

                <label>Document's Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </label>
                <div className="main-content">
                    <QuillComp
                        setContent={setContent}
                        content={content}
                        required
                    />
                    <div className="collabs-cont">
                        <p><span>Collaboratos</span> </p>
                        <div className="collabs" >
                            {collaborators && collaborators.map((email, i) =>
                                <div className="emails" key={i}>
                                    <p key={i}>{email}{console.log(email)}</p>
                                </div>)}
                        </div>
                    </div>
                </div>

                <AddCollsComp
                    coWorkers={coWorkers}
                    setCollaborators={setCollaborators}
                    collaborators={collaborators}
                    setCoWorkers={setCoWorkers}
                    setError={setError}
                />
                <div className="btn-cont">
                    <button type="submit" id='submitter'>Save</button>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <button className="reset" onClick={resetHandler}>Reset All</button>
                        <button className="reset" onClick={deleteHandler}>Delete Recipe</button>
                    </div>
                </div>
            </form>
        </MainComp>

    )
}

export default EditDoc