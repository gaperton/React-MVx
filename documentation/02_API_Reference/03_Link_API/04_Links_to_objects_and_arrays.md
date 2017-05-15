It's rather unusual scenario that you hold complex raw JS data as a part of your state, because typically the state is
defined as a superposition of nested records and collections.

Links can be used to make purely functional updates of the objects and arrays in records attributes. It's done with
the help of _at-links_, which points to the elements of linked objects and arrays.

### link.at( key )

```javascript
// Update this.state.array[ 0 ].name
this.linkAt( 'array' ).at( 0 ).at( 'name' ).set( 'Joe' );
```

Create an _at-link_ to the member of array or object.

Whenever an _at-link_ is updated, it will lead to proper purely functional update (with shallow copying) of the
container (array or object).

### link.pick( key1, key2, ... )

```javascript
// Bulk create at-links for the linked object
const { name, email } = objLink.pick( 'name', 'email' );
```

Create _at-links_ to the object's members with designated keys, and wrap them in an object.

### link.map( ( itemLink, itemKey ) => any | void )

```javascript
// Render the linked array...
var list = stringArrayLink.map( ( itemLink, index ) => {
    if( itemLink.value ){ // Skip empty elements
        return (
            <div key={ index }>
                <Input valueLink={ itemLink } />
            </div>
        );
    }
});
```

Map and filter through the linked array or object to produce an array.
Mapping function receives _at-link_ to the corresponding element.
Whenever it returns `undefined`, the corresponding element is be skipped.

### link.update( clonedObject => modifiedObject )
 
```javascript
// Update the linked object
<button onClick={ () => objLink.update( obj => {
                                obj.a = 1;
                                return obj;
                            }) } />
```

Update linked object or array.

Plain objects and arrays are shallow copied already, thus it's safe just to update the value in place.

### link.action( ( clonedObject, event ) => Object )
 
Creates action to update enclosed object or array.

Plain objects and arrays are shallow copied already, thus it's safe just to update the value in place.

### link.removeAt( key )

Remove element with a given key from the linked object or array.

### atLink.remove()

Remove element with a given key from the linked object or array.

### Array-specific link methods

Link to arrays proxies Array's `splice()`, `push()`, and `unshift()` methods.

They works in the same way and accepts the same parameters as corresponding Array methods,
but returns `undefined` and leads to the proper purely functional update of the parent object chain.

#### `linkToArray.contains( element ) : Link`

Creates the boolean link to the presence of value in array.

Resulting link value is `true` whenever element is present in array, and `false` otherwise.
Whenever resulting link is assigned with new value, it will flip `element` in the array.

Useful for the large checkbox groups.
