import React from "react";
import { BorderWidths } from "../../../../theme";
import { createStyle } from "../../../../utils/tools";
import { useTheme } from "../../../../store/theme/hook";

export default ({
  listInfo,
  onPress,
  width,
}: {
  listInfo: LX.List.MyListInfo;
  onPress: (listInfo: LX.List.MyListInfo) => void;
  width: number;
}) => {
  const theme = useTheme();

  const handlePress = () => {
    onPress(listInfo);
  };

  return (
    <div style={{ width }}>
      <button
        style={{
          backgroundColor: theme["c-button-background"],
          borderColor: theme["c-primary-light-200-alpha-700"],
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

export const styles = createStyle({
  listItem: {
    // width: '50%',
    paddingRight: 13,
  },
  button: {
    height: 36,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: BorderWidths.normal2,
  },
});
