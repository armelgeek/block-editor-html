import React from "react";
import { createStyle } from "../../utils/tools";
import { useTheme } from "../../store/theme/hook";
//import { useI18n } from '../../lang'

export default ({
  selectedList,
  isMove,
}: {
  selectedList: LX.Music.MusicInfo[];
  isMove: boolean;
}) => {
  const theme = useTheme();
  // const t = useI18n()
  return (
    <p>
      {isMove
        ? "list_multi_add_title_first_move"
        : "list_multi_add_title_first_add"}{" "}
      <p
        style={{
          color: theme["c-primary-font"],
        }}
      >
        {selectedList.length}
      </p>{" "}
      {"list_multi_add_title_last"}
    </p>
  );
};

const styles = createStyle({
  title: {
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
});
