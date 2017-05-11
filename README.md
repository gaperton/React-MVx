# React-MVx

React-MVx is the MVVM SPA framework with React as View layer, built upon frontend technologies used at Volicon/Verizon for 3 years.

Contrary to the populular React approaches, React-MVx does not try to avoid the distributed mutable application state. Instead, it is focused on bringing stateful components capabilities to their maximum.

React-MVx manages both local UI state and application domain state with the same universal state container provided by [Type-R]() data framework. It supports:

- two-way data binding
- declarative state validation
- nested data structures & observable changes
- painless state synchronization
- automatic JSON serialization

React-MVx application architecture follows scalable MVVM architecture pattern. It features the _unidirectional data flow_ and _pure render_ optimization. But contrary to the popular React state management solutions:

- It doesn't rely on singletons (unless you _really_ need some data to be shared across pages)
- It assists and encourages usage of _locally encapsulated state_ and _OO decomposition_.

THIS IS PUBLIC THE BETA. NOT PRODUCTION READY YET.

## Examples

- [Checklist tree]()([source](/examples/checklistTree))
- [TodoMVC]()([source](/examples/todomvc))
- [UsersList]()([source](/examples/userslist))
- Flux Comparison([source]*/examples/flux-comparison))
- Babel + Webpack [boilerplate]()([source](/examples/babel-boilerplate))

## Documentation

- State Management Basics
    - [Getting started](/docs/simple.md). State management basics with simple stateful component.
    - [Two-way data binding](/docs/databinding.md)
    - [Handling the complex state](/docs/complex-state.md)
- [Complex state]. Records and collections
- 

## Installation & Requirements

Supported browsers: Chrome, Firefox, Safari, IE10+.

Requires `react` and `type-r` as peer dependecies. Installation (assuming that React is installed):

    `npm install react-mvx type-r --save-dev`

The best way to start is to use the [boilerplate](/examples/babel-boilerplate) which already has
babel, webpack 2, and minimal set of required dependencies configured.

TypeScript is unsupported (yet) but may work.

---

MIT License. Used and supported by Volicon and Verizon Digital Media Services.

## Notes for myself. Don't read.

Core functionality:

This one should work for synchronization,
and must accept both function and function name.

Watcher must both fire event on prop replace and maintain the subscribtion
to the relevant change event.

Engine for reactions on raw props changes.
(?) Combine it with pure render?

    Type.has.watcher( name | function )
    
    Type.value( x )
    Type.isRequired

Manage this stuff separately. Relies on the fact what was and what was not replaced.

    Type.has.changeEvents( true )

    Type.has.changeEvents( 'name1 name2' )

    Type.has.events({
        event map
    })

Pure render creates the constucted object for props (like Attributes).
Used for the fast copying. It's needed because we need to grab and preserve _changeToken.

Generic change tracking engine would create unrolled props comparison function. Then, it could utilize object `[ prop ] : [ handlers ]` 