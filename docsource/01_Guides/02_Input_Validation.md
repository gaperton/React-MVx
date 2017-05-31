In this tutorial, we will add input validation to the user editing form from the [previous example](01_Data_binding_and_forms.md). That's the client-side "as-you-type" validation preventing the user from submitting invalid data while giving him hints.

![Validated form](validation.png)

# State definition and validation checks

All state attributes in React-MVx has associated run-time types and the metadata. The general form of an attribute definition is `Constructor.value( defaultValue )`. When the `defaultValue` is used as an attribute definition (as it was in [previous example](01_Data_binding_and_forms.md)), its type (Constructor) is taken from the value.

`.value( defaultValue )` can be omitted as well. If an attribute definition is a function, it assumed to be the attribute's `Constructor`. Therefore, the following state definition is equivalent to one in the example.

```javascript
@define class Application extends React.Component {
    static state = {
        name : String, // same as ''
        email : String, // same as ''
        isActive : Boolean.value( true ) // same as true
    };
    ...
}
```

This is important because validation checks are the part of the attribute definition. Which is cool, as it allows us to make custom attribute types with all of the validation checks encapsulated. Let's do this for the email.

Validator itself is the function taking the attribute's value and returning `true` whenever it is valid.

```javascript
// Something simple, just for illustration purposes.
function isValidEmail( x ){
    return !x || x.indexOf('@') >= 0;
}

// That would be the validation error message.
isValidEmail.error = 'Invalid email';
```

Then, we need to attach the validator to the attribute definition. And we've got the Email attribute type which can be used anywhere across the system.

```javascript
const Email = String.has.check( isValidEmail );
```

Now we have all we need to define our state. We will use the built-in validation check `isRequired` which fails at empty values for the state of required form elements. This check is special because it is always executed first.

```javascript
@define class Application extends React.Component {
    static state = {
        name : String.isRequired,
        email : Email.isRequired,
        isActive : true
    };
    ...
}
```

# Displaying validation errors

In React-MVx, the validation happens transparently and automatically. When you create the link, the attribute's validation error is accessible as `link.error`. Nothing special needs to be done to _trigger_ the validation, all you have to do is to display the error.

```javascript
    render(){
        const { name, email, isActive } = this.linkAll();
        return (
            <form onSubmit={ this.onSubmit }>
                <label> Name: 
                    <div className="validated-control">
                        <input type="text" { ...link.props} />
                        { link.error && <div className="error">{ link.error }</div> }
                    </div>
                </label>
                ...
            </form>
        );
    }
```

And we would like to have the Save button disabled in case if the state is not valid for any reason:

```javascript
...
<button type="submit" disabled={!this.state.isValid()}>
    Save
</button>
...
```

That's it. There's one more optional but important thing left to do, though.

# Linked UI controls

The final touch is to wrap the form's input displaying the validation error to the dedicated control, taking the `link` as an argument.

We define our own reusable `Input` form element which displays the validation error in the way we want:

```javascript
const Input = ({ link, ...props }) => (
    <div className="validated-control">
        <input {...props} {...link.props} />
        { link.error && <div className="error">{ link.error }</div> }
    </div>
);
```

With that change, our `render()` method starts looking like this:

```javascript
render(){
    // Link the state...
    const { name, email, isActive } = this.linkAll();
    return (
        <form onSubmit={ this.onSubmit }>
            <label>
                Name: <Input type="text" link={name}/>
            </label>
            <label>
                Email: <Input type="text" link={email}/>
            </label>
            <label>
                Is active: <input type="checkbox" {...isActive.props}/>
            </label>
            <button type="submit" disabled={!this.state.isValid()}>
                Save
            </button>
            <button type="button" onClick={this.onCancel}>
                Clear
            </button>
        </form>
    );
}
```

As you can see, the validation does not affect the markup in React-MVx. Thanks to the _links_, which conveniently transport the validation error from the place where it occurs to the place where it's consumed.

Here are the complete [sources](https://github.com/gaperton/react-mvx-examples/blob/master/src/validation.jsx), and here you can see the example [working](https://gaperton.github.io/react-mvx-examples/dist/validation.html).

# API used in the example

## Record's [attribute definitions](https://volicon.github.io/Type-R/Record/Overview.html)

### `attrDef` name : Type.value( defaultValue )

The general form of type annotation is `Type.value( defaultValue )`, where the `Type` is the corresponding constructor function.

### `attrDef` name : Type

When the function is used as `attrDef`, it's treated as the constructor function.
Any constructor function may be used as an attribute type if it behaves as _converting constructor_ (like `new Date( msecs )`).

### `attrDef` name : defaultValue

When the value other than function is passed, it's treated as the default value and the type is being inferred from the value.
 If you need to pass function as the default value, use `Function.value( theFunction )`.

## [Validation](https://volicon.github.io/Type-R/API_by_feature/Validation.html)

### `attrDef` attr : Type.has.check( predicate, errorMsg? )

Attribute-level validator.

- `predicate : value => boolean` is the function taking attribute's value and returning `true` whenever the value is valid.
- optional `errorMsg` is the error message which will be passed in case if the validation fail.

If `errorMsg` is omitted, an error message will be taken from `predicate.error`. It makes possible to define reusable validation functions.

### `attrDef` attr : Type.isRequired

The special case of attribute-level check cutting out empty values. The attribute value must be truthy to pass, `"Required"` is used as the validation error.

`isRequired` is the first validator to check, no matter in which order validators were attached.


### recordOrCollection.isValid()

Returns `true` whenever an object and its aggregation tree is valid.
