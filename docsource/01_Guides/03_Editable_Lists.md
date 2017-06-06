In this tutorial, we will write the first serious application managing the list of users. It illustrates the pattern of editable list.

<mockup with explanations>

# Records, Collections, and the Application State

Inline component's state is not enough for such kind of an application. We need to understand what really happens when we write `static state = { ... }` in the component definition. And it's really simple.

> _All state in React-MVx including the component's local state_ is represented with the `Record` class from the Type-R state management framework.

When you define the component's state, what really happens behind the scene is:

```javascript
import { Record } from 'type-r'
import React from 'react-mvx'

// Type-R Record's subclass is defined...
@define class User extends Record {
		static attributes = {
				name : String.isRequired,
				email : Email.isRequired,
				isActive : true
		}
}

@define class Application extends React.Component {
		static state = User; // Its constructor is passed to the component.
		...
}
```

That's important because we don't need just one user to be the state. We want the _list of users_. And once we have the `User` explicitly defined as Record, this list is referenced as `User.Collection`.

Every record has the default collection type. `Collection` acts mostly as a smart array of records accompanied by an index by `record.id` and `record.cid`, which makes lookups by ids really fast.

Record and Collection together are used to describe the complex state. Record with attributes of record and collection types forms an _aggregation tree_. These nested objects are considered as an integral part of the record; they are created together, and they die together.

Our application's state obviously includes the users collection. Let's add some code to store it in the localStorage. That's easy; all state in React-MVx is serializable.

```javascript
@define class Application extends React.Component {
		static state = {
				users : User.Collection
		};
		
		componentWillMount(){
        const json = JSON.parse( localStorage.getItem( 'users-list' ) || '{}' );
        this.state.set( json, { parse : true } );
		}
		
		componentWillUnmount(){
				localStorage.setItem( 'users-list', JSON.stringify( this.state ) );
		}
		...
}
```

# Rendering the user's list

The user's list component must display the list itself and mark the selected element somehow. And whenever you click on its item, it must signalize to the upper component that the new user is selected. It means that the component must receive the `users` collection and the _link to the selected element_ as props.

> Whenever there is the property which must be modified from the inside of the component, it must be wrapped in a _link_.

```javascript
const UsersList = ({ users, selectedLink }) => (
	<div className="users-list">
		{ users.map( user => (
			<div key={ user.cid }
				className={`users-row ${selectedLink.value === user ? 'selected' : ''}`}
				onClick={ () => selectedLink.set( user ) }>
					{ user.name }
					<span onClick={ () => user.collection.remove() }>X</span>
		  </div>
	  )}
	</div>
);
```



```javascript
render(){
    const { state } = this;
    return (
        <div className="application">
	        <div className="left">
		        <UsersList users={ state.users } />
			    </div>
			    <div className="right">
							TBD Edit user form
			    </div>
        </div>
    );
}
```