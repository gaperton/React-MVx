# React-MVx

MVVM framework based on React and Type-R. It is used as core frontend technology at Volicon/Verizon, and aims to
fix what we believe is the wrong direction in React ecosystem development.

In React-MVx:

- Two-way data binding is first class citizen.
- Domain state management doesn't rely on singletons.
- Local UI state and domain state are managed with the same universal technique.
- State is mutable, observable, JSON serializable, and utilize the full power of OO.
- Both unidirectional data flow with pure render optimization and local UI updates are supported.

This things are achieved with replacement of standard React's state with `Record` subclass,
which is an observable and JSON serializable object with typed attributes. `Record` and `Record.Collection`
can be nested to describe the state of arbitrary complexity.

THIS IS THE TECHNOLOGY PREVIEW. NOT PRODUCTION READY YET. WE'RE WORKING ON IT.

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