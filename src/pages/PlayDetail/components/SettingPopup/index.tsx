import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
//import { useI18n } from '../../../../lang'

import SettingVolume from "./settings/SettingVolume";
import SettingPlaybackRate from "./settings/SettingPlaybackRate";
import SettingLrcFontSize from "./settings/SettingLrcFontSize";
import SettingLrcAlign from "./settings/SettingLrcAlign";

export interface SettingPopupProps extends Omit<any, "children"> {
  direction: "vertical" | "horizontal";
}

export interface SettingPopupType {
  show: () => void;
}

export default forwardRef<SettingPopupType, SettingPopupProps>(
  ({ direction, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const popupRef = useRef<any>(null);
    // console.log('render import export')
    //const t = useI18n()

    useImperativeHandle(ref, () => ({
      show() {
        if (visible) popupRef.current?.setVisible(true);
        else {
          setVisible(true);
          requestAnimationFrame(() => {
            popupRef.current?.setVisible(true);
          });
        }
      },
    }));

    return visible ? (
      <div ref={popupRef} title={"play_detail_setting_title"} {...props}>
        <div>
          <SettingVolume />
          <SettingPlaybackRate />
          <SettingLrcFontSize direction={direction} />
          <SettingLrcAlign />
        </div>
      </div>
    ) : null;
  }
);
