import React, { memo, useState, useRef, useMemo, useEffect } from "react";

import Header from "./components/Header";
// import Aside from './components/Aside'
// import Main from './components/Main'
import Player from "./Player";
import Pic from "./Pic";
import Lyric from "./Lyric";

// global.iskeep = false
export default memo(({ componentId }: { componentId: string }) => {

  return (
    <>
      <Header />
      <div style={{ display:'flex', flexDirection: "row" }}>
        <div style={{
            width:"50%"
        }}>
          <Pic componentId={componentId} />
        </div>
        <div>
          <Lyric />
        </div>

      </div>
      <Player />
    </>
  );
});
