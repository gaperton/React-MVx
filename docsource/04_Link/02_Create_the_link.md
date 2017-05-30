All records and collections may create links to its elements.
Component has the shorthand methods to create links to its state record elements.

You can create custom link object encapsulating complex data binding logic with `Link.value`.

### record.linkAt( attr )

Create the link to the record's attribute. Semantically it's the reference to the attribute.

```javascript
const nameLink = user.linkAt( 'name' );
```

### collection.linkAt( prop )

Create the link to the custom collection property. Property's setter *must* modify some record's attributes or change the collection.

### component.linkAt( key )

Create the link to the attribute of the conponent's state. Works similar to `component.state.linkAt( key )`.

### record.linkAll()

Link all (or listed) records' attributes.

```javascript
// Link all attributes...
const { name, email, age } = user.linkAll();

// Link specified attributes...
const { name, email } = user.linkAll( 'name', 'email' );
```

### component.linkAll()

Link all (or listed) attributes of the component's state. Works similar to `component.state.linkAll()`.

### collection.linkContains( record )

Create the boolean link which is `true` whenever the record is contained in the collection.

Setting the link to `false` will remove record from the collection, setting it to true will add it.

### Link.value( value, set )

Create custom link with the given `value` and `set` function. Use the `link.check` method to populate the validation error.
