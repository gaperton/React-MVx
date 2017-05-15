All records and collections may create links to its elements.
Component has the shorthand methods to create links to its state record elements.

You can create custom link object encapsulating complex data binding logic with `Link.value`.

### linkAt( key )

```javascript
const nameLink = user.linkAt( 'name' );
```

- `record.linkAt( attr )` links the record's attribute. Semantically it's the reference to the attribute.
- `collection.linkAt( prop )` links the custom collection property. Property's setter *must* modify some record's attributes or change collections.
- `component.linkAt( key )` works similar to `component.state.linkAt( key )`.

### linkAll()

```javascript
// Link all attributes...
const { name, email, age } = user.linkAll();

// Link specified attributes...
const { name, email } = user.linkAll( 'name', 'email' );
```

- `record.linkAll()` links all records attributes.
- `component.linkAll()` works similar to `component.state.linkAll()`.

### collection.linkContains( record )

Create the boolean link which is `true` whenever the record is contained in the collection.

Setting the link to `false` will remove record from the collection, setting it to true will add it.

### Link.value( value, set )

Create custom link with the given `value` and `set` function. Use the `link.check` method to populate the validation error.
