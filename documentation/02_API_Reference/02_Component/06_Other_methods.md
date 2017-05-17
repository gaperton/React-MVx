
#### component.asyncUpdate()

Safe version of the `forceUpdate()`. Gracefully handles component disposal and UI update transactions.

Shall be used in place of every manual call to `forceUpdate()`.