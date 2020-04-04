# Record and Collection

React-MVx relies of [Type-R](https://volijs.github.io/Type-R/) framework to manage a multi-layer application state.

- [Record](https://volijs.github.io/Type-R/#record) class is used to manage component's state.
- The subset of the [Record attributes type annotation](https://volijs.github.io/Type-R/#definition) is used to define props and context.
- [Store](https://volijs.github.io/Type-R/#store) class is used to represent component's store (also called "local store"), which is typically used in the root component of SPA page associated with a route. The state of the children components uses upper component's stores to resolve id-references.
- Type-R [global store](https://volijs.github.io/Type-R/#-static-store-global) may be used as a store for the data shared by application pages. This store is used to resolve id-references in case if local stores lookup failed.

<aside class="warning">
The meaning of the Store in Type-R and React-Mvx is very different to that in other frameworks. The sole reason you need the store is to have collections of records which are being used to resolve id-references. If you don't have <a href="https://volijs.github.io/Type-R/#id-references">id-references</a> in JSON, you don't need stores. Use state instead.
</aside>
