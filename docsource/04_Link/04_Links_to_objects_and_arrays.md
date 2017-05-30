It's rather unusual scenario that you hold complex raw JS data as a part of your state, because typically the state is
defined as a superposition of nested records and collections.

Links can be used to make purely functional updates of the objects and arrays in records attributes. It's done with
the help of _at-links_, which points to the elements of linked objects and arrays.

# Object and arrays methods

### link.at( key )

Create an _at-link_ to the member of array or object.

Whenever an _at-link_ is updated, it will lead to proper purely functional update (with shallow copying) of the
container (array or object).

```javascript
// Update this.state.array[ 0 ].name
this.linkAt( 'array' ).at( 0 ).at( 'name' ).set( 'Joe' );
```

### link.map( ( itemLink, itemKey ) => any | void )

Map and filter through the linked array or object to produce an array.
Mapping function receives _at-link_ to the corresponding element.
Whenever it returns `undefined`, the corresponding element is be skipped.


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

### link.update( clonedObject => modifiedObject )

Update linked object or array.

Plain objects and arrays are shallow copied already, thus it's safe just to update the value in place.

```javascript
// Update the linked object
<button onClick={ () => objLink.update( obj => {
                                obj.a = 1;
                                return obj;
                            }) } />
```

### link.action( ( clonedObject, event ) => Object )
 
Creates action to update enclosed object or array.

Plain objects and arrays are shallow copied already, thus it's safe just to update the value in place.

### link.removeAt( key )

Remove element with a given key from the linked object or array.

### atLink.remove()

Remove element with a given key from the linked object or array.

## Object-specific methods

### link.pick( key1, key2, ... )

Create _at-links_ to the object's members with designated keys, and wrap them in an object.

```javascript
// Bulk create at-links for the linked object
const { name, email } = objLink.pick( 'name', 'email' );
```

## Array-specific methods

### linkToArray.splice() : void

Similar to `Array.splice()` method, but performs purely functional update.

### linkToArray.push() : void 

Similar to `Array.push()` method, but performs purely functional update.

### linkToArray.unshift() : void

Similar to `Array.unshift()` method, but performs purely functional update.

### linkToArray.contains( element )

Creates the boolean link to the presence of value in array.

Resulting link value is `true` whenever element is present in array, and `false` otherwise.
Whenever resulting link is assigned with new value, it will flip `element` in the array.

Useful for the large checkbox groups.
