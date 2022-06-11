import React from "react";

import { Page } from "./Page";
import * as HeaderStories from "./Header.stories";

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    numbering: {
      before: [
        "article div.wrapper > div:first-child",
        "article div.wrapper div button.storybook-button.storybook-button--small.storybook-button--secondary",
      ],
      after: [
        "button.storybook-button.storybook-button--small.storybook-button--primary",
      ],
    },
  },
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
