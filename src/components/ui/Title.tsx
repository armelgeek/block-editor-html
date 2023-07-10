import React, { memo } from "react";

const Title = memo(({ text }: any) => {
  return (
    <div className="ms_heading">
      <h1>{text}</h1>
    </div>
  );
});
export default Title;
