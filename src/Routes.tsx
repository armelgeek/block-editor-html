import "./utils/errorHandle";
import { init as initLog } from "./utils/log";
import "./config/globalData";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateSong from "./pages/songs/create";
import EditSong from "./pages/songs/edit";
import SongList from "./pages/songs/index";
import { AppProvider } from "./components/app.context";
import Leaderboard from "./pages/Home/Views/Leaderboard";
import SonglistDetail from "./pages/Home/Views/SonglistDetail";
import { getFontSize } from "./utils/data";
import KaraokeEditor from "./pages/Editor";

let isInited = false;
const Routes = () => {
  const handleInit = async () => {
    if (isInited) return;
    void initLog();
    global.lx.fontSize = await getFontSize();
    const { default: init } = await import("./core/init");
    try {
      await init();
      console.log("inti leka");
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
  return (
    <AppProvider>
        <Router>
            <Switch>
              <Route path="/" exact component={Leaderboard} />
              <Route path="/artist/songs" exact component={SonglistDetail} />
              <Route path="/karaoke/maker" exact component={KaraokeEditor}/>
            </Switch>
        </Router>
    </AppProvider>
  );
};

export default Routes;
