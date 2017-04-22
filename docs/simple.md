# State management basics

It's not a secret that the standard React component state is not very suitable and pleasant
thing work. But it doesn't have to be so. The first and the most important thing React-MVx does
 is that it replaces React state with the universal state container which is called `Record`.

It's 'universal' because it's used to handle all the state in the application, no matter is it
the local UI state, domain state, or the shared state in the global store. Technically, the "store"
in React-MVx is the subclass of the `Record` just as local UI state is.
And the best part about the global store is that in the majority of cases you don't need it.

## Simple stateful component

React-MVx extends React namespace so you need to use it _instead_ of React.

```jsx
import { define, Component } from 'react-mvx'
```

Definition of the React-MVx component *must* be preceded with `@define` decorator.

```jsx
@define
export class MyComponent extends Component {
    render(){
        return ( /* jsx */ )
    }
}
```

Then we define the state. In the simplest case, the state definition looks similar
to the standard React state initialization, but you need to preced it with `static`.

Contrary to the React state, *all* state attributes you're going to use *must* be declared.
We will have just one state member - the counter.

```jsx
@define class MyComponent extends Component {
    static state = {
	count : 0
    };

    render(){
        return ( /* jsx */ )
    }
}
```

And then, you just access `this.state` as if it would be the plain object.
 
```jsx
	render(){
	    const { state } = this;
		
		return (
			<div onClick={ () => state.count++ }>
				{ state.count }
			</div>
		);
	}
```

Fairly simple. It was one of the major design guidelines for the React-MVx - trivial things must look trivial.

Now, it's time to understand what really happens behind the scene inside of the `@define` decorator and how this example works.

## Under the hood

First, `@define` looks for the `state` static variable. If it present,
it creates the `Record` subclass with attributes specification taken from this variable. So,
 something like this happens behind the scene:

```jsx
@define class MyState extends Record {
    static attributes = {
        count : 0    
    }
}

@define class MyComponent extends Component {
    static state = MyState;

    render(){
        return ( /* jsx */ )
    }
}
```

`Record` is the base class for the universal state container. It behaves as normal class,
but whatever is listed in its `static attributes` member will become its observable and serializable properties.

Then, `@define` will attach special mixin to your component which will create
an instance of the MyState _before_ mount, will start listening to its changes
and updating the UI _after_ the first render (and will dispose it when the component will be unmounted).

It works as if you would have the following code in your component:

```jsx
componentWillMount(){ // Works before your componentWillMount will be called.
    this.state = new MyState();
}

componentDidMount(){ // Works before your componentDidMount is called.
    this.state.on( 'change', () => this.forceUpdate() );
}
```

Therefore, you may read and write the members of you state directly. 
Any write operation will emit `change` event and trigger the UI update.

## Differences to the React state

An obvious difference is that you can assign `this.state` properties directly.

The more subtle difference is that the changes to the state are applied _immediately_, while the subsequent UI update may happen _asynchronously_.

And the most important practical difference is that contrary to React, *you have to declare all attributes of the state*. Or it won't work.
