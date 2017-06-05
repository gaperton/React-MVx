# How does it compare agains X?

Architecturally, React-MVx has more in common with the traditional frameworks like EmberJS or BackboneJS rather than with any of the popular react solutions.

React-MVx is based on MVVM (Model, View, ViewModel) architectural pattern and *two-way data binding*, while uses the *unidirectional data flow* and React Component as View. Internally, it's the glue layer for the post-backbone [Type-R state management framework]() which was developed to substitute BackboneJS in Volicon/Verizon [Observer]() product line while offering the gradual transition to React.

 | React-MVx | mobx | redux
-|----|--------|------------
Unidirectional data flow | ✓ | | ✓
Pure render optimization | ✓ | | ✓
Mutable state with observable changes | ✓ | ✓ | 
Same way to manage local and global state | ✓ | ✓ |
Transactional changes | ✓ | ✓ |
Two-way data binding | ✓ |  |  

Having some similarities with `mobx`, it has a number of important differences in the way it handles the state. The most important ones are that _all attributes are typed at runtime_, the state is represented with nested structures forming _aggregation trees_ (with a possible cross-references between different trees), and all data structures are serializable by default (cross references are serialized as id-s).

 | React-MVx | mobx | redux
-|----|--------|------------
Nested data in aggregation trees | ✓ |  | ✓
JSON serializable by default | ✓ | | 
Cross-references in state | ✓ | ✓ | 
Serializable cross-references | ✓ | | 
Run-time type asserts and conversions | ✓ | | 

State management mechanics in React-MVx is mostly automatic and is controlled with the declarative _attribute definitions_. The majority of features are designed and optimized to work recursively on the elements of the _aggregation tree_.

 | React-MVx | mobx | redux
-|----|--------|------------
Leak-free aggregation tree disposal | ✓ | | ✓
Aggregation tree cloning  | ✓ | | ✓
Aggregation tree validation | ✓ |  | 
Aggregation tree state synchronization | ✓ |  

While React-MVx is unopinionated on how you structure the application state, it favors the state encapsulation and the _layered distributed state_ to singletons. _"Stores"_ are optional and used to resolve cross-references by id in JSON only, and they can be created dynamically.

You are encouraged to have the _local_ store for every SPA page with the lifetime similar to one of the page, keeping in global store only the data which are truly global. You are free to use the local components state enjoying the declarative state synchronization.

No matter how large your SPA is, React-MVx emphasis on state encapsulation and decomposition will keep your state in order.