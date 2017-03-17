# ReactMVC

React's bindings to the Type-R

## New spec for props

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