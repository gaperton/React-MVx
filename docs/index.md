---
title: React-MVx 2.0 API Reference

toc_footers:
  - <a href="https://github.com/Volicon/React-MVx">GitHub repository</a>
  - <a href="https://github.com/Volicon/React-MVx/issues">Ask the question or report the bug</a>
  - <a href="http://www.volicon.com/">Supported by <img style="vertical-align: middle" src="images/volicon_verizon_dm.png"/></a>

includes:
  - guides
  - component
  - link
  - databinding
  - releasenotes

search: true
---

# Getting started

## Overview

React-MVx is the MVVM JS application framework built upon three technologies:

- [React](https://reactjs.org/) as a view layer.
- [Type-R](https://volicon.github.com/Type-R) as a data layer and UI state management.
- [NestedLink](https://github.com/Volicon/NestedLink) for two-way data binding.
    
Contrary to the popular React approaches, React-MVx does not try to avoid the distributed mutable application state. Instead, it is focused on bringing stateful components capabilities to their maximum.

React-MVx is built around the idea of _universal state management_ featuring 
the same technique to manage the local component state, application page state,
and the global application state. Core building blocks of the application architecture are:

- React-MVx Component (extended `React.Component`) for the view layer.
- Records and Collection (provided by Type-R data framework) for managing all kinds of an application state.
- Links for two-way data binding.
- Stores (which is the subclass of the Record and can be dynamically created) for resolving record's id-references.

React-MVx Component uses the Record class to manage its local state. Record can consists of other records 
and collections, describing the data structure of arbitrary complexity. All records are serializable by default, has deeply observable changes, and supports the declarative validation. The behavior of record's attributes and component state/props elements is controlled with declarative _type annotations_. 

React-MVx extends React namespace and should be used instead of `react`.
All class Component definitions must be preceeded with the `@define` decorator.

```javascript
import React, { define } from 'react-mvx'

@define class HelloApp extends React.Component {
    static state = {
        count : 0
    };

    render(){
        const { state } = this;
        return (
            <h1 onClick={ () => state.count++ }>
                Hi there! { state.count }
            </h1>;
        );
    }
}
```

### Key features

- *Run-time type asserts*. Application state defined with Type-R is protected from improper assignments, including incompatible JSON coming from the network.
- *Speed*. Collections of 10-20K items are being parsed and processed with sub-second delays.
- *Complex state support*. Component's state is described with Type-R Record and its attributes can be composed of complex types, including other records and collections with indefinite nesting.
- *Automatic serialization*. All state elements are serializable to JSON by default with no additional effort.
- *id-references support*. References by object ids in JSON are resolved automatically, including the situation with multiple collections of records holding cross-references which are being fetched independently.
- *Deeply observable changes*. Updates are executed in transactions allowing the bunch of changes to be made as reactions on other changes, without introducing extra change events and renders.
- *Mutable data structures* with *pure render* support. For some reason, many people believes that it's impossible.
- *Two-way data binding*. Dealing with complex forms is *the* strong side of the React-MVx.
- *Forms validation*. You'll get it for free, just attach the check to the state's attribute.
- *Layered application state*. You can create and dispose as many stores as you want dynamically. In many cases, you don't even need the store - there's no any difference in managing the component's local state and the store.
- *MVVM pattern support*. MVVM scales perfectly, and we believe its support is a must.

## Examples

### Babel + Webpack [boilerplate](/examples/babel-boilerplate)

The place to start your project.

### [Checklist tree](/examples/checklistTree)

Hierarchical checklist with simple group selection rules. Demonstrates:

- recursive data structures
- deeply observable changes
- change even watchers and transactional changes
- pure render on mutable data

### [TodoMVC](/examples/todomvc)

Classic TodoMVC example.

### [UsersList](/examples/userslist)

Editable list of users. Demonstrates the state synchronization pattern.

### [Flux Comparison](/examples/flux-comparison)

Detailed design of the "flux comparison" example with explanation of the unidirectional data flow.

## Installation & Requirements

Supported browsers: Chrome, Firefox, Safari, IE10+.

Requires `react`, `prop-types`, and `type-r` as peer dependencies. Installation (assuming that React is installed):

```
npm install react react-mvx type-r prop-types --save-dev
```

The best way to start is to use the [boilerplate](/examples/babel-boilerplate) which already has
babel, webpack, and the minimal set of required dependencies configured.

TypeScript is unsupported (yet) but may work.

## Developer tools

The [modified version of the React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/ahggoppikhphoggoibnlbpcpegnchiio) with fixes required for React-MVx is available in the Chrome Web Store.

- Fixed an exception when inspecting the props with custom getters in prototype.
- Collections are displayed as an array (system fields hidden).
- Record is displayed as an object (system fields hidden).
- Component's state (which is the Record) is displayed as an object.
