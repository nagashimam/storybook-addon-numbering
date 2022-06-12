import {
  DecoratorFunction,
  useEffect,
  useGlobals,
  useMemo,
} from "@storybook/addons";
import { addNumberingStyle, clearStyles } from "./helpers";
import numberingCSS from "./numberingCSS";

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  console.log("log:", { context });
  const [{ numberingActive }] = useGlobals();
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  const numberingStyles = useMemo(() => {
    const storySelector = isInDocs
      ? `#anchor--${context.id} .docs-story`
      : ".sb-show-main";
    const css = numberingCSS(storySelector, context.parameters.numbering);
    console.log("log:", { css });

    return css || "";
  }, [context.id]);

  useEffect(() => {
    const selectorId = isInDocs
      ? `addon-numbering-docs-${context.id}`
      : `addon-numbering`;

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
