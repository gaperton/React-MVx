# React-MVx

React-MVx is the MVVM SPA framework with React as View layer, which is built upon frontend technologies used at Volicon/Verizon for 3 years.

Contrary to the popular React approaches, React-MVx does not try to avoid the distributed mutable application state. Instead, it is focused on bringing stateful components capabilities to their maximum.

React-MVx manages both local UI state and application domain state with the same universal state container provided by [Type-R](https://volicon.github.com/Type-R) data framework. It supports:

- two-way data binding
- declarative state validation
- nested data structures & observable changes
- painless state synchronization
- automatic JSON serialization

React-MVx application architecture follows scalable MVVM architecture pattern. It features the _unidirectional data flow_ and _pure render_ optimization. But contrary to the popular React state management solutions:

- It doesn't rely on singletons (unless you _really_ need some data to be shared across pages)
- It assists and encourages usage of _locally encapsulated state_ and _OO decomposition_.

More documentation and tutorials to come.

## Installation & Requirements

Supported browsers: Chrome, Firefox, Safari, IE10+.

Requires `react` and `type-r` as peer dependencies. Installation (assuming that React is installed):

    `npm install react-mvx type-r --save-dev`

TypeScript is unsupported (yet) but may work.

---

MIT License. Used and supported by Volicon and Verizon Digital Media Services.