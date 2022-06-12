import { ComponentSelectors } from "./types";

export default function (
  storySelector: string,
  componentSelectors: ComponentSelectors
): string {
  console.log("log:", { storySelector });
  console.log("log:", { componentSelectors });
  const beforeCss = componentSelectors?.before?.reduce(
    (prev, componentSelector, index) => `${prev}
    ${baseCss(storySelector, componentSelector, "before", index)}`,
    ""
  );
  return componentSelectors?.after?.reduce(
    (prev, componentSelector, index) => ` ${prev}
    ${baseCss(
      storySelector,
      componentSelector,
      "after",
      index + componentSelectors.before.length
    )}
    `,
    beforeCss || ""
  );
}

const baseCss = (
  storySelector: string,
  componentSelector: string,
  psuedoElement: string,
  index: number
) => `
${storySelector} ${componentSelector}::${psuedoElement} {
  content: "${index + 1}";
  width: ${index + 1 <= 9 ? 1 : 2}em;
  border: dashed;
  border-radius: 100%;
  display: inline-block;
  text-align: center;
  font-color: red;
}
`;
