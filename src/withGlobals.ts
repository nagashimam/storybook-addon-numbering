import { DecoratorFunction, useMemo } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import { addNumberingStyle, clearStyles } from "./helpers";
import numberingCSS from "./numberingCSS";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ numberingActive }] = useGlobals();
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  const numberingStyles = useMemo(() => {
    const storySelector = isInDocs
      ? `#anchor--${context.id} .docs-story`
      : ".sb-show-main";

    return numberingCSS(storySelector, context.parameters.numbering);
  }, [context.id]);

  useEffect(() => {
    const selectorId = isInDocs
      ? `addon-outline-docs-${context.id}`
      : `addon-outline`;

    if (!numberingActive) {
      clearStyles(selectorId);
      return;
    }

    addNumberingStyle(selectorId, numberingStyles);

    return () => {
      clearStyles(selectorId);
    };
  }, [numberingActive, numberingStyles, context.id]);

  return StoryFn();
};
