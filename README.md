# Example project for Connected Showroom using single-spa

This project loads a series of Micro Frontends using different frameworks. It is to demonstrate how to set up the Connected Showroom application and unify the U.S. code line and the BR code line.

Below are the documented steps as they are done

---

## Step 1: Create a ss root project

### Run the command `npx create-single-spa`

This will start the process to create the shell application

### Select `single-spa root config`

Usually the is named shell but you can name it what you wish

![image-20230325100105449](README/img/image-20230325100105449.png)

### Select the package manager you wish to use

In this case we are using npm

![image-20230325100857906](README/img/image-20230325100857906.png)

### Select if you wish to use Typescript

In this case we are going with good old JavaScript

![image-20230325101016203](README/img/image-20230325101016203.png)

### Choose if you want to use the layout engine

The layout engine facilitates routing, it also adds some server side rendering capabilities

![image-20230325101604807](README/img/image-20230325101604807.png)

### Select and organization name

This step requires a bit more thought because it can become tricky to change it later. It is not impossible but it is best to simply start with the organization name you want to use and save the effort

![image-20230325101927306](README/img/image-20230325101927306.png)

### Final Step for creating the Shell

Once you hit enter the create-single-spa application will run, it will generate the project and initiate a `npm i` which will install the dependencies

### Setting up husky

Husky is a great tool for enforcing style, linting and other git hooks. Unfortunately the .husky directory usually needs to sit in the same place as the .git directory which is where the git repo settings, history and configurations are. Currently this require a workaround for husky to function correctly.

#### Change the `prepare` script

Inside your project directory, in this case `shell` you need to update the package.json file. The script for husky by default will be `"prepare": "husky install"` It needs to be changed to: `"prepare": "cd .. && husky install shell/.husky"` If you project is nested deeper you need to make sure the `cd` command takes you to the same level as the .git directory.

#### Update the pre-commit script

Inside the `shell/.husky` directory there will be a file called pre-commit. You will need to open this file and edit the script there. In our example the .git directory is one step up, as this project is a mono-repo (all the different projects are in one repository). If your project has the project nested deeper then you will need to provide the appropriate path.

Before:

![image-20230325105118006](README/img/image-20230325105118006.png)

After:

![image-20230325105003038](README/img/image-20230325105003038.png)

#### One last thing

If you are on a POSIX OS (Unix, Linux, MacOS) you will need to also set the file to execute. In the terminal change to the .husky directory and set the file to execute `chmod +x pre-commit`

You may find, depending on your Windows setup you will also need to set the file to allow it to execute. This is an edge case however if you run into an issue where the git hooks do not run when you commit got to the pre-commit file, right click and go to properties. There you can set to allow the file to execute

---

## Step 2: Create a React project

React is a commonly used framework and has taken the lead in the framework wars. The advantages of a low threshold to start and fast time-to-market has made it the most popular framework to date.

### Run the command `npx create-single-spa`

### Select the single-spa application / parcel option

![image-20230325155053650](README/img/image-20230325155053650.png)

### Select the React option

![image-20230325155159551](README/img/image-20230325155159551.png)

### Select the package manager

In this case I selected npm

![image-20230325155251410](README/img/image-20230325155251410.png)

### Select if you want to use Typescript

![image-20230325155349041](README/img/image-20230325155349041.png)

### Enter an organization name

![image-20230325155441314](README/img/image-20230325155441314.png)

### Finally enter a project name

After pressing `ENTER` the project build process will start and npm will install the dependencies.

### Reconfigure husky like you did for the root config if you have a custom placement for .git directory

### Add the React project to the shell

Once the React MFE is set up and running it must be added to the shell. It can also be run stand alone but that is another section

#### Add the MFE to the shell/src/index.ejs import maps

This will make the MFE available to load

![image-20230325173641937](README/img/image-20230325173641937.png)

#### Loading the React MFE

To make the MFE load, we will use the **microfrontend-layout.html** since we chose to use the layout engine when creating the shell. The layout.html can be named anything but we used the default name

![image-20230325174116710](README/img/image-20230325174116710.png)

Here we create a route for the React application, in this case called Deals

![image-20230325174333483](README/img/image-20230325174333483.png)

#### Run the shell application and the React application, in this case deals, enter /deals into the browser and the React app should show

![image-20230325174513062](README/img/image-20230325174513062.png)

---

## Step 3: How to setup a Utilities bundle

A utilities bundle or project is a way to share libraries, styles, or components across applications so they are only ever loaded once.

You can consider a utilities bundle as a gateway to all the other libraries you may use or to share common functions, APIs, etc across all MFEs. Do keep in mind, however, you should try to keep each MFE encapsulated as much as possible. Too much shared code across MFEs or MFEs that know too much about others can lead to dependencies that will make the pattern less effective.

> Keep in mind, the strength of the MFE architecture is each MFE is a separate, independently deployable application.

### Run the command `npx create-single-spa`

![image-20230325163120713](README/img/image-20230325163120713.png)

### Next select the `in-browser utility module (style guide, api, cache, etc)` option

![image-20230325163333084](README/img/image-20230325163333084.png)

### You can choose a framework for this option or select none. I went with none for this guide

![image-20230325163451605](README/img/image-20230325163451605.png)

### Select a package manager, went with npm again to be consistent. If you are using a mono repo this is more important than if you are using separate repos which is the standard setup

![image-20230325163645074](README/img/image-20230325163645074.png)

### Select if you want to use Typescript

![image-20230325163736194](README/img/image-20230325163736194.png)

### Enter organization name as in previous steps

### Enter the project name, I chose utilities

### Set up husky as in previous examples

---

## Step 4: Add the Utilites project to the application

### Add the utilties to the index.ejs file import map

Add the utilities bundle as you would another MFE into the inport maps on the shell ejs file

![image-20230325170833010](README/img/image-20230325170833010.png)

### Set the bundle as an external in the web pack.config.js

This will need to be done for every MFE that is to use the utilities so Webpack will know any references are external so it will look for them and load them using Module Federation.

![image-20230325171259223](README/img/image-20230325171259223.png)

### Export anything you wish to be external in the utilites from main js file

![image-20230325172424915](README/img/image-20230325172424915.png)

A simple function with a console log is exported in this example. It can be anything including various node libraries, JS modules, etc

![image-20230325172730026](README/img/image-20230325172730026.png)

### Import into your project what you want to use from the utilties as you would import normally.

In many IDEs, code completion may not pick up the external library and give you code completion however GitHub CoPilot seems to do a fair job at it.

![image-20230325172828116](README/img/image-20230325172828116.png)

The console log showing in the browser

![image-20230325172938806](README/img/image-20230325172938806.png)

### Notes

- Any utility set up in this manner is in fact a MFE itself, however its purpose is to provide resources
- Only exported members, exported from the root js file found in the src directory will be discoverable.
- When adding the utility to other MFEs, remember to not only add the import internally but also to do the webpack.config.js step, to add it to externals

---

## Step 5: Angular Project

### Create a new Angular project using the `@angular/cli` `ng new vehicles --routing true --style scss --prefix csv`

> **Note** It is important to give the Angular project a prefix that will be unique to that project so Angular components don't overwrite each other

### Next cd into the project directory and then run the Angular schematic `ng add single-spa-angular --project my-cool-app`

> This will change several files.

### Generate environment files if you plan to use them (Angular > 14) using `ng g environments`

This will only partially do what you need for environment files in this use case. It will add the file replacements in angular.json but you will need to add a swap if you wish something to change for production

#### Add the properties you need in the environments files

For setting up single-spa you will need to add a flag production to both environments.development.ts and environments.ts.

```typescript
export const environment = {
  production: true,
};
```

### Manual setup of environment files

You can copy the environment files directory over directly from an older project but you must rename them and them up to be swapped in the development configuration in angular.json

#### environment.ts (in older Angular projects: environment.prod.ts)

```typescript
export const environment = {
  production: true,
};
```

#### environment.development.ts (in older Angular projects: environment.ts )

```typescript
export const environment = {
  production: false,
};
```

### If the project has routing some additional steps need to be taken and files added

#### Configure routes in app-routing.module.ts

- Add `providers: [{ provide: APP_BASE_HREF, useValue: '/' }]` to the @NgModule config
- In the routes, add a route to the EmptyRouteComponent added by the schematic `{ path: '**', component: EmptyRouteComponent }`
- [For more information](https://single-spa.js.org/docs/ecosystem-angular/#routing)

---

## Angular Setup:What changed files and settings changed or were added

When the single-spa-angular schematic is run and finishes correctly these files are changed in a new project. This information can help when it comes to migrating an existing project to a single-spa MFE.

This does not include that files that have to be manually added in the above process

### Files that changed

#### package.json

##### Dependencies

- single-spa
- single-spa-angular

##### devDependencies

- @angular-builders/custom-webpack
- style-loader

##### Scripts added

```JSON
"build:single-spa:vehicles": "ng build vehicles --configuration production",
"serve:single-spa:vehicles": "ng s --project vehicles --disable-host-check --port 5201 --live-reload false"
```

#### angular.json

##### The main file is changed from src/main.ts to src/main.single-spa.ts

![image-20230326162129931](README/img/image-20230326162129931.png)

##### The builders are set to @angular-builders/custom-webpack from @angular-devkit/build-angular

![image-20230326112612731](/Users/seimei/local-projects/JavaScript/single-spa-cs/README/image-20230326112612731.png)

#### In the architect.build.options section two new options are added below the scripts option:

![image-20230326161309100](README/img/image-20230326161309100.png)

##### outputHashing is set to "none" for both production and development configurations

![image-20230326161826763](README/img/image-20230326161826763.png)

##### tsconfig.app.json is changed to also point at src/main.single-spa.ts

![image-20230326162327054](README/img/image-20230326162327054.png)

### New files added

#### extra-web pack.config.js

```javascript
const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
```

#### src/main.single-spa.ts

```typescript
import { enableProdMode, NgZone } from "@angular/core";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Router, NavigationStart } from "@angular/router";

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from "single-spa-angular";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { singleSpaPropsSubject } from "./single-spa/single-spa-props";

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps) => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: "<csv-root />",
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
```

#### src/single-spa/assets-url.ts

```typescript
// In single-spa, the assets need to be loaded from a dynamic location,
// instead of hard coded to `/assets`. We use webpack public path for this.
// See https://webpack.js.org/guides/public-path/#root

export function assetUrl(url: string): string {
  // @ts-ignore
  const publicPath = __webpack_public_path__;
  const publicPathSuffix = publicPath.endsWith("/") ? "" : "/";
  const urlPrefix = url.startsWith("/") ? "" : "/";

  return `${publicPath}${publicPathSuffix}assets${urlPrefix}${url}`;
}
```

#### src/single-spa/single-spa-props.ts

```typescript
import { ReplaySubject } from "rxjs";
import { AppProps } from "single-spa";

export const singleSpaPropsSubject = new ReplaySubject<SingleSpaProps>(1);

// Add any custom single-spa props you have to this type def
// https://single-spa.js.org/docs/building-applications.html#custom-props
export type SingleSpaProps = AppProps & {};
```

#### src/app/empty-route/empty-route.component.ts

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "csv-empty-route",
  template: "",
})
export class EmptyRouteComponent {}
```
