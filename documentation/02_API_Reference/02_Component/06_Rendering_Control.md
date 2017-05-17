#### component.transaction( fun )

Group the sequence of state (and props) updates in the single transaction leading to single UI update.

```javascript
this.transaction( state => {
    state.a++;
    state.b++;
    this.props.collection.reset();
});
```

Read more about transactions in Type-R manual.

#### `static` pureRender = true

Generate and attach the "pure render" optimization mixin. Mixin prevents the subsequent render calls in case if props were unchanged.
Mixin *detects and takes into account inner changes* of records and collections as well.

`static props` declaration is required for `pureRender` to work. Only declared props will be compared.


#### component.asyncUpdate()

Safe version of the `forceUpdate()`. Gracefully handles component disposal and UI update transactions.

Shall be used in place of every manual call to `forceUpdate()`.