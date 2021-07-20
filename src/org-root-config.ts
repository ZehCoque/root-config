import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";
import microfrontendLayout from "./microfrontend-layout.html";

const list = ["test1", "test2"];
const hmtlLayoutData: HTMLLayoutData = {
  props: {
    list,
  },
  loaders: {},
};
const routes = constructRoutes(microfrontendLayout, hmtlLayoutData);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
