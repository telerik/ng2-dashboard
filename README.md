The original README.md with plenty of technical details is moved to [ng-class-readme](https://github.com/telerik/ng2-dashboard/blob/master/ng-class-readme.md).

# Kendo UI for Angular 2 Proof of Concept — Northwind Dashboard

The goal of this project is to rebuild the [Northwind Dashboard demo](http://demos.telerik.com/aspnet-mvc/html5-dashboard-sample-app/) application with the following set of technologies:

* Angular 2
* NativeScript
* Kendo UI for Angular 2
* The [Kendo Bootstrap Theme](https://github.com/telerik/kendo-bootstrap)

In addition to the web interface, we will build a native mobile application that provides a similar set of functionality. An additional screen that showcases a form is necessary.

## Motivation

In addition to something to show to prospects, we need to validate that the product combo we have in mind looks good, feels right, and works as expected. We know that it works in general, but such verification is likely to reveal rough edges and inconsistencies.

## Things we Care For

The current implementation should be considered as a reference, however we don’t need a hundred percent match. What matters is:

- Shared services;
- Consistency in the data binding for web and mobile;
- Consistent looks that share a common color scheme through the Bootstrap Sass variables;

Consistent API (property names, etc) is nice, but not critical for the initial release.
