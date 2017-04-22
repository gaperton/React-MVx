# The complex state

*The complex state* (being opposed to the _flat state_) is the state composed of nested parts.
In raw React it would look like this:

    state = { // In React-MVx you would need to add 'static' in the beginning
        obj : { x : 1 },
        arr : [ { text : "Hello" } ]
    };

While React-MVx _can_ store plain JS objects and arrays in state attributes, they will _remain_
plain object and arrays. Contrary to `mobx`, it does _nothing_ magical to make plain JS objects observable.
It will detect changes, though, if you will [use value links](https://github.com/Volicon/NestedLink/blob/master/docs/api.md#links-to-object-and-arrays) to modify the content of such an attributes.

    this.state.obj.x = 2; // <- Won't detect the change
    this.linkAt( 'obj' ).at( 'x' ).set( 2 ); // <- It will, and it will update UI.

But working with a raw JS structures is not the major use case it's designed for.
You will rarely need it. Because the strength of the React-MVx lies in the way how it works 
with _classes_.

## Class constructors in state attributes

In React-MVx state all attributes are typed. State definition is not really the set
 of the _default values_, but rather its _type annotation_.

In order to put the class in the state attribute you should use its constructor in place of the default value. 

    static state = {
        time : Date
    }

When the state Record will be created, `new Date()` will be invoked to initialize `this.state.time`.
You may pass the default value to constructor like this (which is the general form of type annotation). `null` as default value won't invoke the constructor but assign an attribute to `null` instead.

    static state = {
        time : Date.value( 6867836478 ),
        updated : Date.value( null ) // <- updated = null
    }

When something other than function is passed, React-MVx treats it as a default value and extracts its constructor (type) from the value. It applies to primitive types as well. Following attribute definitions are equivalent:

    static state = {
        text : '',
        text : String
        text : String.value( '' )
    }

React-MVx uses attribute type information in numerous ways. One of them is the run-time type assertion and convertion. It's guaranteed that the particuar Record's attribute will always has the value of the declared type.

    this.state.textAttr = 5; // will be converted to "5"
    this.state.boolAttr = a && b // guaranteed to be true or false or null

## Nested Records

Back to our example from the beginning, nested Records and Collections classes are used to describe an appication state instead of nested objects and arrays.

    static state = {
        obj : { x : 1 },
        arr : [ { text : "Hello" } ]
    };

First, let's wrap the `obj` state member in a `Record`. To do that, we need to create the
Record subclass, like this:

    @define class MyObj extends Record {
        static attributes = {
            x : 1
        }
    }

Or, just the one-liner which does entirely the same thing...

    const MyObj = Record.defaults({ x : 1 });

Now we have _the constructor_ of the observable object with an attribute `x` which has the default value of 1. All we have to do, is to fix our state definition:

    static state = {
        obj : MyObj, // <- !!!
        arr : [ { text : "Hello" } ]
    };

If we don't need to reference MyObj anywhere else, we could make an inline Record definition:

    static state = {
        obj : Record.defaults({ x : 1 }),
        arr : [ { text : "Hello" } ]
    };

Now, the direct assigment `this.state.obj.x = 2` will be detected by React-MVx and it will update the UI.

## Record's Collections

When we have the `Record` subclass, the its collection's constructor is obtained with `MyRecord.Collection`:

    const Text = Record.defaults({ text : "Hello" });
    ...
    static state = {
        obj : Record.defaults({ x : 1 }),
        arr : Text.Collection
    };

Contrary to the records, collection doesn't behave like the plain array. It behaves almost 
identical to the [Backbone Collection](http://backbonejs.org/#Collection). If you're familiar with Backbone, you already know how to deal with this thing. Refer to the [API Reference]() for the details.

However, the `arr` collection will be created empty because we provide nothing but its constructor.
To fix that, we need to pass its default values.

    static state = {
        obj : Record.defaults({ x : 1 }),
        arr : Text.Collection.value([ { text : "Hello"}, { text : "World!" }])
    };

