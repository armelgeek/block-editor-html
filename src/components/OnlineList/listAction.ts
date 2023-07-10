import { LIST_IDS } from "../../config/constant";
import { addListMusics } from "../../core/list";
import { playList } from "../../core/player/player";
import {
  addTempPlayList,
  clearStudioPlayList,
} from "../../core/player/tempPlayList";
import settingState from "../../store/setting/state";
import { getListMusicSync } from "../../utils/listManage";
import { shareMusic } from "../../utils/tools";

export const handlePlay = (musicInfo: LX.Music.MusicInfoOnline) => {


  clearStudioPlayList();
  global.lx.isStudioPlay = false;
  void addListMusics(
    LIST_IDS.DEFAULT,
    [musicInfo],
    settingState.setting["list.addMusicLocationType"]
  ).then(() => {
    const index = getListMusicSync(LIST_IDS.DEFAULT).findIndex(
      (m) => m.id == musicInfo.id
    );
    if (index < 0) return;
    void playList(LIST_IDS.DEFAULT, index);
  });
};
export const handlePlayLater = (
  musicInfo: LX.Music.MusicInfoOnline,
  selectedList: LX.Music.MusicInfoOnline[],
  onCancelSelect: () => void
) => {
  clearStudioPlayList();
  global.lx.isStudioPlay = false;
  if (selectedList.length) {
    addTempPlayList(selectedList.map((s) => ({ listId: "", musicInfo: s })));
    onCancelSelect();
  } else {
    addTempPlayList([{ listId: "", musicInfo }]);
  }
};

export const handleShare = (musicInfo: LX.Music.MusicInfoOnline) => {
  shareMusic(
    settingState.setting["common.shareType"],
    settingState.setting["download.fileName"],
    musicInfo
  );
};
