import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { HTMLLayoutData } from "single-spa-layout/dist/types/isomorphic/constructRoutes";
import microfrontendLayout from "./microfrontend-layout.html";

const list = [];

function pushToList(element: string) {
  console.log(element)
  list.push(element)
  console.log(list)

}

const hmtlLayoutData: HTMLLayoutData = {
  props: {
    list,
    pushToList
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
