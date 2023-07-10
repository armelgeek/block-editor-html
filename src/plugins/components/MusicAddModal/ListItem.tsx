import React from "react";
import { BorderWidths } from "../../../../theme";
import { createStyle, toast } from "../../../../utils/tools";
import { useTheme } from "../../../../store/theme/hook";
import { useMusicExistsList } from "../../../../store/list/hook";

export default ({
  listInfo,
  onPress,
  musicInfo,
  width,
}: {
  listInfo: LX.List.MyListInfo;
  onPress: (listInfo: LX.List.MyListInfo) => void;
  musicInfo: LX.Music.MusicInfo;
  width: number;
}) => {
  const theme = useTheme();
  const isExists = useMusicExistsList(listInfo, musicInfo);

  const handlePress = () => {
    if (isExists) {
      toast(global.i18n.t("list_add_tip_exists"));
      return;
    }
    onPress(listInfo);
  };

  return (
    <div style={{ width }}>
      <button
        style={{
          backgroundColor: theme["c-button-background"],
          borderColor: theme["c-primary-light-400-alpha-300"],
          opacity: isExists ? 0.4 : 1,
        }}
        onClick={handlePress}
      >
        <p
          style={{
            color: theme["c-button-font"],
          }}
        >
          {listInfo.name}
        </p>
      </button>
    </div>
  );
};
