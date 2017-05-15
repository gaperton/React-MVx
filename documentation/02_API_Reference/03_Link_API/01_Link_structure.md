```javascript
// Link's shape
{
    value : /* the value */,
    set( newValue ){ /* the function to change it */},
    error : /* validation error */
}
```

Here are the most important link members.

### value

Holds linked value. This value is immutable.

### error

Holds the validation error (typically the text error message) which might be consumed and displayed by data-bound countrol.

### set( newValue )

```javascript
<button onClick={ () => boolLink.set( !boolLink.value ) } />
```

Tells the state container to update the value (`link.value` is not changed).

### update( prevValue => newValue )

```javascript
<button onClick={ () => boolLink.update( x => !x ) } />
```

Update link value using the given value transform function.