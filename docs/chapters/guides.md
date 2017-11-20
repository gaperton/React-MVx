# Design patterns

## Stateful Component

### Inline state declaration

```javascript
@define class Test extends React.Component {
    static state = {
        counter : 0
    }

    render(){
        const { state } = this;
        return (
            <div onClick={ () => state.counter++ }>
                { state.counter }
            </div>
        );
    }
}
```

### External state declaration

```javascript
@define class TestState extends Record {
    static attributes = {
        counter : 0
    }
}

@define class Test extends React.Component {
    static State = TestState;

    render(){
        const { state } = this;
        return (
            <div onClick={ () => state.counter++ }>
                { state.counter }
            </div>
        );
    }
}
```

### Transactional state changes

```javascript
@define class Test extends React.Component {
    static state = {
        counter1 : 0,
        counter2 : 0
    }

    onClick = () => {
        this.state.transaction( state => {
            state.counter1++;
            state.counter2++;
        });
    }

    render(){
        const { state } = this;
        return (
            <div onClick={ this.onClick }>
                { state.counter1 + state.counter2 }
            </div>
        );
    }
}
```

## I/O

### Persistent UI state

```javascript
@define class TestState extends Record {
    static endpoint = localStorageIO( 'myApp' );

    static attributes = {
        id : 'TestPage'
        counter : 0
    }
}

@define class TestPage extends React.Component {
    static State = TestState;

    componentWillMount(){
        this.state.fetch();
    }

    componentWillUnmount(){
        this.state.save();
    }

    render(){
        const { state } = this;
        return (
            <div onClick={ () => state.counter++ }>
                { state.counter }
            </div>
        );
    }
}
```

### Initial loading indicator...

```javascript
@define class Page extends React.Component {
    static state = {
        someCollection : Collection,
        loading : true
    }

    onLoad = () => this.state.loading = false;

    componentWillMount(){
        this.state.collection.fetch()
            .then( onLoad ).catch( onLoad );
    }

    render(){
        const { state } = this;
        return state.loading ? (
            <div>Loading...</div>
        ) : (
            <div>
                Loaded { state.someCollection.length } items.
            </div>
        );
    }
}
```

### Component's loading indicator...

```javascript
@define class List extends React.Component {
    static props = {
        collection : Collection
    }

    render(){
        const { collection } = this.props;
        return collection.hasPendingIO() ? (
            <div>Loading...</div>
        ) : (
            <div>
                Collection has { collection.length } items.
            </div>
        );
    }
}
```

### Fetching multiple objects...

```javascript
@define class TestState extends Record {
    static endpoint = attributesIO();

    static attributes = {
        coll1 : Some.Collection,
        coll2 : Other.Collection
    }
}

@define class TestPage extends React.Component {
    static State = TestState;

    componentWillMount(){
        this.state.fetch();
    }

    render(){
        //...
    }
}
```

## Application Examples 

### Data binding and forms

[Tutorial: two-way data binding and forms](https://medium.com/@gaperton/react-mvx-tutorial-local-state-and-forms-50c30ce5110e)

In this tutorial, we will learn the state management and two-way data binding basics on the example of the simple user info editing form.

[Application](https://gaperton.github.io/react-mvx-examples/dist/form.html), [sources](https://github.com/gaperton/react-mvx-examples/blob/master/src/form.jsx).

### Input Validation

[Tutorial: State Definition and Form Validation](https://medium.com/@gaperton/react-mvx-tutorial-state-definition-and-form-validation-8aa0f315fdd9)

In this tutorial, we will add input validation to the user editing form from the previous example. That’s the client-side “as-you-type” validation preventing the user from submitting invalid data while giving him hints.

[Application](https://gaperton.github.io/react-mvx-examples/dist/form.html), [sources](https://github.com/gaperton/react-mvx-examples/blob/master/src/validation.jsx).

### Editable lists

Illustrates state synchronization pattern.

[Application](https://gaperton.github.io/react-mvx-examples/dist/collection.html), [sources](https://github.com/gaperton/react-mvx-examples/blob/master/src/collection.jsx).

## id-references and stores

Demonstrates local stores and id-references.

[Application](https://gaperton.github.io/react-mvx-examples/dist/manytomany.html)m [sources](https://github.com/gaperton/react-mvx-examples/tree/master/src/manytomany)