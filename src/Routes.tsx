import "./utils/errorHandle";
import { init as initLog } from "./utils/log";
import "./config/globalData";
import "./App.css";
import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import CreateSong from "./pages/songs/create";
import EditSong from "./pages/songs/edit";
import SongList from "./pages/songs/index";
import { AppProvider } from "./components/app.context";
import Leaderboard from "./pages/Home/Views/Leaderboard";
import SonglistDetail from "./pages/Home/Views/SonglistDetail";
import { getFontSize } from "./utils/data";
import KaraokeEditor from "./pages/Editor";
import MyList from "./pages/Home/Views/Mylist";
import PlayerBar from "./pages/Home/components/PlayerBar";
import PlayDetail from './pages/PlayDetail';
import {Link} from "react-router-dom";
import LoginForm from "./form/LoginForm";
import Profile from "./Profile";
import {AuthProvider} from "./store/Provider/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import {AuthContext} from "./context/AuthContext";
import Karaoke from "./pages/Karaoke";

let isInited = false;
const Routes = () => {
  // @ts-ignore
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleInit = async () => {
    if (isInited) return;
    void initLog();
    global.lx.fontSize = await getFontSize();
    const { default: init } = await import("./core/init");
    try {
      await init();
    } catch (err) {
      console.log("err", err);
      return;
    }
    isInited = true;
  };
  useEffect(() => {
    (async () => {
      await handleInit();
      if (!isInited) return;
    })();
  }, []);
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/login");
  };
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <div style={{
            display:'flex',
            flexDirection:'row'

          }}>
            <Link to={'/'}>Home</Link>
            <Link to={'/karaoke'}>Karaoke</Link>
            <Link to={'/list'}>My list</Link>
            <Link to={'/song/player'}>Player Detail</Link>
            {!state.isAuthenticated ? (
                <>
                  <Link to={"/register"} className="ms_btn reg_btn">
                    <span>register</span>
                  </Link>
                  <Link to={"/login"} className="ms_btn login_btn">
                    <span>login</span>
                  </Link>
                </>
            ) : (
                <>
                  <Link className="ms_btn reg_btn" to="/songs/list">
                    Songs
                  </Link>
                  <Link to="/profile" className="ms_btn reg_btn">
                    Mon compte
                  </Link>
                  <a className="ms_btn login_btn" onClick={handleLogout}>
                    Logout
                  </a>
                </>
            )}
          </div>
            <Switch>
              <Route path="/" exact component={Leaderboard} />
              <Route path="/karaoke" exact component={Karaoke} />
              <Route path="/artist/songs" exact component={SonglistDetail} />
              <Route path="/song/player" exact component={PlayDetail}/>
              <Route path="/list" exact component={MyList}/>
              <Route path="/karaoke/maker" exact component={KaraokeEditor}/>
              <Route path="/login" exact component={LoginForm} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/songs/create" component={CreateSong} />
              <PrivateRoute exact path="/songs/edit/:id" component={EditSong} />
              <PrivateRoute exact path="/songs/list" component={SongList} />
            </Switch>

        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default Routes;
