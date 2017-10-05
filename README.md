# Kendo UI for Angular + NativeScript DashBoard app

This project includes a web application, built with Kendo UI for Angular components, and a NativeScript app that shares the data service with the web app. It is built on top of TeamMaestro's `angular-native-seed` template:

# Angular NativeScript Seed

Build truly web and native applications using NativeScript and Angular. This seed allows your project to share code between the environments; having complete control over dependencies.

## Highlights
- i18n Translations
- Lazy Loaded Modules
- Angular CLI // Webpack // Testing
- Target Phone and Tablet Templates Individually
- Docker build provided using NGINX to serve web content and load balance reverse proxied backends. (See nginx folder for setup instructions)

## Get Started

1. Clone this repository by using your favorite Git client or by executing `git clone https://github.com/telerik/ng2-dashboard.git`.
1. Enter the project directory by running `cd ng2-dashboard`.

Web is setup from the root.

```
npm install
npm start
```

Mobile is setup from the `nativescript` folder.

```
cd nativescript
npm install
npm run android.phone
```

Each platform is run respective to it's folder. View available commands here:

- [Seed Commands](https://github.com/TeamMaestro/angular-native-seed/wiki/Seed-Commands)

## Credits

This project is based on the [Angular NativeScript Seed](https://github.com/TeamMaestro/angular-native-seed) by TeamMaestro.
