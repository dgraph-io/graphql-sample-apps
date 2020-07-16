import { lazy } from "react";

const Landing = lazy(() =>
  import("../components/templates").then((module) => ({
    default: module.Landing,
  }))
);
const TweetsScreen = lazy(() =>
  import("../components/templates").then((module) => ({
    default: module.TweetsScreen,
  }))
);

const routes = [
  { path: "/", exact: true, component: Landing },
  { path: "/tweet-list", exact: true, component: TweetsScreen },
];

export default routes;
