import React, { useEffect } from "react";
// import { View, StyleSheet } from 'react-native'
import { useDimensions } from "../../utils/hooks";

import Vertical from "./Vertical";

export default ({ componentId }: { componentId: string }) => {
  const { window } = useDimensions();

  return (
    <>
      <Vertical componentId={componentId} />
    </>
  );
};
