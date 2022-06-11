import React, { useCallback } from "react";
import { useGlobals } from "@storybook/api";
import { Icons, IconButton } from "@storybook/components";
import { TOOL_ID } from "./constants";

export const Tool = () => {
  const [{ numberingActive }, updateGlobals] = useGlobals();

  const toggleNumbering = useCallback(
    () =>
      updateGlobals({
        numberingActive: numberingActive ? undefined : true,
      }),
    [numberingActive]
  );

  return (
    <IconButton
      key={TOOL_ID}
      active={numberingActive}
      title="Add numbering to each UI components"
      onClick={toggleNumbering}
    >
      {/*
        Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
        for the full list of icons
      */}
      <Icons icon="listunordered" />
    </IconButton>
  );
};
