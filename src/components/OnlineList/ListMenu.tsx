import React, {
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useContext,
} from "react";
//import { useI18n } from "../../lang";
import Menu, { type MenuType, type Position } from "../../components/common/Menu";
import commonState from "../../store/common/state";
import { clearActualPlay } from "../../core/player/tempPlayList";
import song from "../../utils/musicSdk/kw/song";
import { AuthContext } from "../../store/Provider/AuthProvider";
import { storageDataPrefix } from "../../config/constant";
import { getData } from "../../plugins/storage";
import { toast } from "../../utils/tools";
export interface SelectInfo {
  musicInfo: LX.Music.MusicInfoOnline;
  selectedList: LX.Music.MusicInfoOnline[];
  index: number;
  single: boolean;
}
const initSelectInfo = {};

export interface ListMenuProps {
  onPlay: (selectInfo: SelectInfo) => void;
  onPlayLater: (selectInfo: SelectInfo) => void;
  onAdd: (selectInfo: SelectInfo) => void;
  onCopyName: (selectInfo: SelectInfo) => void;
  isOnEditMode: boolean | false;
}
export interface ListMenuType {
  show: (selectInfo: SelectInfo, position: Position) => void;
}

export type { Position };

export default forwardRef<ListMenuType, ListMenuProps>(
  (props: ListMenuProps, ref) => {
    //const t = useI18n();
    const [visible, setVisible] = useState(false);
    const menuRef = useRef<MenuType>(null);
    const { checkAuth } = useContext(AuthContext);
    const selectInfoRef = useRef<SelectInfo>(initSelectInfo as SelectInfo);
    useImperativeHandle(ref, () => ({
      show(selectInfo, position) {
        selectInfoRef.current = selectInfo;
        if (visible) menuRef.current?.show(position);
        else {
          setVisible(true);
          requestAnimationFrame(() => {
            menuRef.current?.show(position);
          });
        }
      },
    }));
    const authCheckPromise = async () => {
      await checkAuth();
    };
    const menus = useMemo(() => {
      return [
        { action: "play", label: "play" },
        { action: "playLater", label: "play_later" },
        // { action: 'download', label: '下载' },
        { action: "add", label: "add_to" },
        // { action: 'copyName', label: t('copy_name') },
      ] as const;
    }, []);
    const editMenu = useMemo(() => {
      return [
        { action: "edit_lyric", label: "edit" },
        { action: "remove_lyric", label: "delete" },
      ] as const;
    }, []);
    const removeLyric = async (id: number) => {
      await authCheckPromise()
        .then(async () => {
          const accessToken = (await getData(
            storageDataPrefix.accessToken
          )) as string;
          await song.remove(id, accessToken);
          global.app_event.userAccountUpdateChange();
        })
        .catch((error) => {
          console.log(error);
          toast("error occur on remove lyric");
        });
    };
    const handleMenuPress = ({ action }: any) => {
      const selectInfo = selectInfoRef.current;
      // console.log(action);
      switch (action) {
        case "play":
          props.onPlay(selectInfo);
          break;
        case "playLater":
          props.onPlayLater(selectInfo);
          break;
        case "add":
          props.onAdd(selectInfo);
          break;
        case "copyName":
          props.onCopyName(selectInfo);
          break;
        case "edit_lyric":
          {
          
          }

          break;
        case "remove_lyric":
          removeLyric(selectInfo.musicInfo.bdid);
          break;
        default:
          break;
      }
    };

    return visible ? (
      <Menu
        ref={menuRef}
        menus={!props.isOnEditMode ? menus : editMenu}
        onPress={handleMenuPress}
      />
    ) : null;
  }
);
