import React, { memo, useState, useRef, useMemo, useEffect } from "react";

import Header from "./components/Header";
// import Aside from './components/Aside'
// import Main from './components/Main'
import Player from "./Player";
import Pic from "./Pic";
import Lyric from "./Lyric";
const LyricPage = ({ activeIndex }: { activeIndex: number }) => {
  const initedRef = useRef(false);
  const lyric = useMemo(() => <Lyric />, []);
  switch (activeIndex) {
    // case 3:
    case 1:
      if (!initedRef.current) initedRef.current = true;
      return lyric;
    default:
      return initedRef.current ? lyric : null;
  }
  // return activeIndex == 0 || activeIndex == 1 ? setting : null
};

// global.iskeep = false
export default memo(({ componentId }: { componentId: string }) => {
  // const theme = useTheme()
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <>
      <Header />
      <div style={{ flex: 1, flexDirection: "column" }}>
        <div>
          <Pic componentId={componentId} />
        </div>
        <div>
          <LyricPage activeIndex={pageIndex} />
        </div>

        <Player />
      </div>
    </>
  );
});
