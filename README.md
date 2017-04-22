# React-MVx

React-MVx is the MVVM SPA framework with React as View layer, built upon frontend technologies used at Volicon/Verizon for 3 years.

Contrary to the populular React approaches, React-MVx does not try to avoid the distributed application state.
Instead, it focused on bringing stateful components capabilities to their maximum.

It manages both local UI state and application domain state with the same universal state container, which supports:
- two-way data binding
- declarative state validation
- nested data structures & observable changes
- painless state synchronization
- automatic JSON serialization

React-MVx application architecture:
- Follows familiar and scaleable MVVM architecture pattern.
- Doesn't rely on singletons (unless you _really_ need some data to be shared across pages)
- Welcomes _local encapsulated state_ and OO decomposition.
- Features unidirectional data flow and "pure render" optimization. Yes.

THIS IS THE TECHNOLOGY PREVIEW. NOT PRODUCTION READY YET. WE'RE WORKING ON IT.

## Features


## Examples

## Documentation
    - Architecture Overview
    - Simple Stateful Components
    - Records and Collections

## Installation

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