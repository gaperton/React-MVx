Component implements shorthand methods for creating links to state.
The same API is implemented by every Record class. All the methods below generally forward calls to the `component.state`.

#### component.linkAt( 'key' )

Create the link for the state member `key`. Is a shortcut for `component.state.linkAt()` method.

All records support `linkAt()` method as well.

#### component.linkAll()

Create links for all (or specified) the state members. All records support `linkAll()` method as well.

#### component.links

Direct access to the links cache. Can be used in event handlers to access the links created during the last `render()`.

All links created for records (and for the component's state) are being cached. They are recreated only in case when their value has been changed.