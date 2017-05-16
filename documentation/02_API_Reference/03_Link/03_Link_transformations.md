###  link.equals( value )

```javascript
<Checkbox checkedLink={ stringLink.equals( 'optionX' ) } />
<Checkbox checkedLink={ stringLink.equals( 'optionY' ) } />
```

Create boolean equality link which value is `true` whenever `link.value === value`, and `false` otherwise.

When an equality link is assigned with `true` the parent link value is set with `value`, and with `null` otherwise.

Useful for radio groups.

### link.props

```javascript
<input type="text" {...nameLink.props} />
```

Converts the link to the standard `{ value, onChange }` props to be easily consumed by standard `<input />` control.

### link.action( ( prevValue, event ) => newValue )

```javascript
// simple click event handler...
<button onClick={ boolLink.action( x => !x ) } />

// manual binding to input control:
const setValue = ( x, e ) => e.target.value;
...
<input  value={ link.value }
        onChange={ link.action( setValue ) } />
```

Convert the link to the UI event handler `event => void` which will transform the link using the given function.

`link.action` takes transform function, and produce a new function which takes single `event` argument.
When it's called, `event` and link `value` are passes as transform parameters, and link will be updated 
with returned value.

This is particularly useful in (but not restricted to) UI event handlers.

### link.check( predicate : value => boolean, errorMsg? )

Checks whenever the predicate is truthy on linked value, and if it's not, assigns `link.error` with `errorMsg`.
Does nothing if `link.error` is already populated.

This method may be used for additional validation in `render()`, and to populate the validation error for the custom links created with `Link.value()`.

You typically don't need `link.check` for links created with `linkAt()` methods, because the validation happens inside of records.
