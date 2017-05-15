Record is the serializable class with typed attributes, observable changes, and custom validation checks.
It differs to the `Model` (which is the subclass of the Record) in the way that it do not implement
the REST endpoint functionality. Just the serialization.

```javascript
// ⤹ required to make magic work  
@define class User extends Record {
    // ⤹ attribute's declaration
    static attributes = {
        firstName : '', // ⟵ String type is inferred from the default value
        lastName  : String, // ⟵ Or you can just mention its constructor
        email     : String.value( null ), //⟵ Or you can provide both
        createdAt : Date, // ⟵ And it works for any constructor.
        // And you can attach ⤹ metadata to fine-tune attribute's behavior
        lastLogin : Date.value( null ).has.toJSON( false ) // ⟵ not serializable
    }
}

const user = new User();
console.log( user.createdAt ); // ⟵ this is an instance of Date created for you.

const users = new User.Collection(); // ⟵ Collections are defined automatically. 
users.on( 'changes', () => updateUI( users ) ); // ⟵ listen to the changes.

users.set( json, { parse : true } ); // ⟵ parse raw JSON from the server.
users.updateEach( user => user.firstName = '' ); // ⟵ bulk update triggering 'changes' once
```

Unlike in Backbone, Record is not the key-value hash. It's the static structure with the pre-defined
 set of attributes of known types. You have to create Record's subclass and declare attributes for every 
 Record of different shape in the way close to that for classes in statically typed languages. 
 The simplest form of attribute declaration specifies an attribute's default value and/or 
 its constructor function.
 
> It's not Backbone! <b>Do not</b> try to create Record directly, it won't work. Subclassing the Record class and defining its attributes is mandatory.
