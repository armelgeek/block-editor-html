import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";

import { useTheme } from "../../../../store/theme/hook";
import { createStyle } from "../../../../utils/tools";
import { BorderWidths } from "../../../../theme";
import { scaleSizeH } from "../../../../utils/pixelRatio";

export type SelectMode = "single" | "range";

export const MULTI_SELECT_BAR_HEIGHT = scaleSizeH(40);

export interface MultipleModeBarProps {
  onSwitchMode: (mode: SelectMode) => void;
  onSelectAll: (isAll: boolean) => void;
  onExitSelectMode: () => void;
}
export interface MultipleModeBarType {
  show: () => void;
  setIsSelectAll: (isAll: boolean) => void;
  setSwitchMode: (mode: SelectMode) => void;
  exitSelectMode: () => void;
}

export default forwardRef<MultipleModeBarType, MultipleModeBarProps>(
  ({ onSelectAll, onSwitchMode, onExitSelectMode }, ref) => {
    // const isGetDetailFailedRef = useRef(false)
    const [visible, setVisible] = useState(false);
    const [animatePlayed, setAnimatPlayed] = useState(true);
    const [selectMode, setSelectMode] = useState<SelectMode>("single");
    const [isSelectAll, setIsSelectAll] = useState(false);
    const theme = useTheme();

    useImperativeHandle(ref, () => ({
      show() {
        handleShow();
      },
      setIsSelectAll(isAll) {
        setIsSelectAll(isAll);
      },
      setSwitchMode(mode: SelectMode) {
        setSelectMode(mode);
      },
      exitSelectMode() {
        handleHide();
      },
    }));

    const handleShow = useCallback(() => {
      // console.log('show List')
      setVisible(true);
      setAnimatPlayed(true);
    }, []);

    const handleHide = useCallback(() => {
      setVisible(false);
      setAnimatPlayed(true);
    }, []);
    const handleSelectAll = useCallback(() => {
      const selectAll = !isSelectAll;
      setIsSelectAll(selectAll);
      onSelectAll(selectAll);
    }, [isSelectAll, onSelectAll]);

    const component = useMemo(() => {
      return (
        <div>
          <div>
            <button
              onClick={() => {
                onSwitchMode("single");
              }}
              style={{
                backgroundColor:
                  selectMode == "single"
                    ? theme["c-button-background"]
                    : "rgba(0,0,0,0)",
              }}
            >
              <p>{"list_select_single"}</p>
            </button>
            <button
              onClick={() => {
                onSwitchMode("range");
              }}
              style={{
               backgroundColor:
                  selectMode == "range"
                    ? theme["c-button-background"]
                    : "rgba(0,0,0,0)",
              }}
            >
              <p>{"list_select_range"}</p>
            </button>
          </div>
          <button onClick={handleSelectAll}>
            <p
              style={{
                color: theme["c-button-font"],
              }}
            >
              {isSelectAll ? "list_select_unall" : "list_select_all"}
            </p>
          </button>
          <button onClick={onExitSelectMode}>
            <p color={theme["c-button-font"]}>{"list_select_cancel"}</p>
          </button>
        </div>
      );
    }, [
      selectMode,
      theme,
      handleSelectAll,
      isSelectAll,
      onExitSelectMode,
      onSwitchMode,
    ]);

    return !visible && animatePlayed ? null : component;
  }
);