# Data bound controls

An essense of the "data binding" pattern is that the inner state of the UI control is
mapped to some value in the application data layer. Whenever the value change, it's 
synchronized in both directions. Almost all modern JS frontend application frameworks 
supports two-way data binding out of box.

React-MVx has the first-class support for the two-way data binding though the concept of
[value links](https://github.com/volicon/NestedLink). It's best to understand it on 
the example.

## Data-bound controlled input component

In this example we will bind the state member to the `input` control.
In order to use data binding you need to import data bound input controls from `react-mvx/tags` module first.

```javascript
import { Component, define } from 'react-mvx'
import { Input } from 'nestedreact/tags'
```

Then, you can create the controlled input component like this:

```javascript
@define
export class MyComponent extends Component {
	static state = {
		text : ''
	}

	render(){
		return <Input valueLink={ this.linkAt( 'text' ) } />;
	}
}
```

If you have a form with a lot of controls, you can create links in a bulk with a single line
using `model.linkAll()` method. This is the preferable way of dealing with the complex forms.

```javascript
@define export class MyComponent extends Component {
	static state = {
		a : '',
        b : '',
        c : ''
	}

	render(){
        const links = this.linkAll();
        return (
            <form>
                <Input valueLink={ links.a } />
                <Input valueLink={ links.b } />
                <Input valueLink={ links.c } />
            </form>
        );
	}
}
```

## Under the hood

[To explain `valuelink` pattern simply](https://medium.com/@gaperton/managing-state-and-forms-with-react-part-1-12eacb647112#.6mqtojilu), is an object holding the *value* and the *callback to update the value*. It is something
close to this:

```javascript
render(){
    const link = {
        value : this.state.text,
        set   : x => this.state.text = x
    };

    return <Input valueLink={ link } />;
}
```

And, an Input control which consumes such a link would look like this:

```javascript
const Input = ({ valueLink }) => (
    <input value={ valueLink.value }
           onChange={ e => valueLink.set( e.target.value ) />
);
```

React-MVx link implementation works close to the code above but is way more advanced. Refer to the [NestedLink](https://github.com/Volicon/NestedLink) package documentation for more information
about the data binding capabilities.
