import app from './App.module.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header/Header';
import MyRecipes from './screens/MyRecipesPage/MyRecipes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignUp from './screens/SignupPage/SignUp';
import NewDoc from './screens/CreateDoc/CreateDoc';
import EditDoc from './screens/EditDoc/EditDoc';
import Home from './screens/HomePage/Home';
import Search from './screens/SearchPage/Search';

function App() {
  return (
    <div className={app.wrapper}>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} exect />
            <Route path='/my-recipes' element={<MyRecipes />} exect />
            <Route path='/search' element={<Search />} exect />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path='/create' element={<NewDoc />} />
            <Route path='/update/:id' element={<EditDoc />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
