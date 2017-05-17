Here are the most important link members. All the link members are read-only and should not be modified directly.

```javascript
// Link's shape
{
    value : /* the value */,
    set( newValue ){ /* the function to change it */},
    error : /* validation error */
}
```

#### link.value

Holds linked value. This value is immutable.

#### link.error

Holds the validation error (typically the text error message) which might be consumed and displayed by data-bound countrol.

An `error` is populated automatically on link creation when using `linkAt()` or `linkAll()` methods, and is produced by declarative
validators from `.has.check()` attributes annotations.

#### link.set( newValue )

Tells the state container to update the value.

```javascript
<button onClick={ () => boolLink.set( !boolLink.value ) } />
```

#### link.update( prevValue => newValue )

Update link value using the given value transform function.

```javascript
<button onClick={ () => boolLink.update( x => !x ) } />
```
