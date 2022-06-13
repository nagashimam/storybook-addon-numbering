import addons, {
  DecoratorFunction,
  useGlobals,
  useParameter,
} from "@storybook/addons";
import events from "@storybook/core-events";
import { PARAM_KEY } from "./constants";
import { addNumberingStyleToEntireDocument, clearStyles } from "./helpers";
import numberingCSS from "./numberingCSS";
import { ComponentSelectors } from "./types";

// It seems Angular addon-docs doesn't call decorators of other addons
// Instead, we have to listen to GLOBALS_UPDATED and invoke functions by ourselves

// TODO: Fix this hack to enable users to specify different parameters for stories in one story file
// Currently, all stories use the same parameters in docs tab

// TODO: Fix this hack to enable users to apply numbering in docs tab before they do so in canvas tab.
const defaultComponentSelectors: ComponentSelectors = {
  before: [],
  after: [],
};
let currentComponentSelectors: ComponentSelectors = defaultComponentSelectors;

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  currentComponentSelectors = useParameter<ComponentSelectors>(
    PARAM_KEY,
    defaultComponentSelectors
  );
  const [{ numberingActive }] = useGlobals();
  applyStyle(numberingActive);
  return StoryFn();
};

const channel = addons.getChannel();
channel.on(events.GLOBALS_UPDATED, (args) => {
  const numberingActive = args.globals.numberingActive;
  applyStyle(numberingActive);
});

const applyStyle = (numberingActive: boolean) => {
  const selectorId = "addon-numbering";
  if (!numberingActive) {
    clearStyles(selectorId);
    return;
  }

  const storySelector = ".sb-show-main";
  const css = numberingCSS(storySelector, currentComponentSelectors);
  if (css === "") {
    return;
  }
  addNumberingStyleToEntireDocument(selectorId, css);
};
