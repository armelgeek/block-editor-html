import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
//import { useI18n } from "../../../../lang";
import { createStyle } from "../../../../utils/tools";
import { useTheme } from "../../../../store/theme/hook";

const Section = ({ title, children }: any) => {
  return (
    <div>
      <p>{title}</p>
      <div>{children}</div>
    </div>
  );
};
export default forwardRef<any, any>(
  ({ title, children, direction, ...props }, ref) => {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    // console.log('render import export')
    //const t = useI18n();

    return visible ? <div>{children}</div> : null;
  }
);