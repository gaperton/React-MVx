```javascript
// Ad-hoc data binding for standard controls
<input {...link.props} />
```

Link can be bound to the standard form control consuming `value` and `onChange` props like this:

```javascript
// Custom data-bound control
const Input = ({ link, ...props }) => (
    <div className={`form-row ${ link.error ? 'has-error' : '' } `}>
        <input type="text" {...props} { ...link.props } />
        <div className="error-placeholder">{ link.error || '' } </div>
    </div>
);

// Another simple data bound control
const Input = ({ link, ...props }) => (
    <input {...props}
            value={ link.value }
            onChange={ e => link.set( e.target.value ) } />
);
```

However, in order to take the full advantage of the value link pattern you're encouraged to create
the semantic form control wrappers, encapsulating the markup for inline validation errors indication
and form layout.

The general pattern you're using for defining the data bound controls is shown on the right.

Here's the reference for data bound tags from [react-mvx/tags]() which illustrates the technique 
and might be used as starting boilerplate for your custom controls.

## Text input controls

```javascript
import { Input, TextArea } from 'react-mvx/tags'
...
<Input type="text" valueLink={ link } />
<TextArea valueLink={ link } />
```

`tags.jsx` contains wrappers for standard `<input>` and `<textarea>` tags,
  which consume linked strings.

These wrappers will add `invalid` class to enclosed HTML element if an error is present in the link.


## Numeric input

```jsx
import { NumberInput } from 'react-mvx/tags'

<NumberInput valueLink={ link } />
<NumberInput valueLink={ link } integer={ true }/>
<NumberInput valueLink={ link } positive={ true }/>
```

The proper implementation of wrong input rejection for numberic input controls may be tough.
Therefore, `tags.jsx` has the cross-browser implementation of *numeric input* tag. It has following differences compared to the regular `<Input>`:

- Keyboard input which obviously leads to invalid values (e.g. letters) is rejected.
- Value is always being converted to valid number.
- There are `integer` and `positive` boolean props controlling input rejection. They can be combined.

`<NumberInput>` validates its intermediate state and adds `invalid` class to enclosed input element if it's not a number.

## Checkboxes

There are different ways how you can handle the checkbox components.

### `<Input type="checkbox" valueLink={ link }/>`

```jsx
import { Input } from 'react-mvx/tags'
...
<Input type="text" checkedLink={ booleanLink } />
<Input type="text" checkedLink={ arrayLink.contains( 'option' ) } />
```

Directly binds linked boolean value to the standard input tag.

### `<Checkbox/>`

Internally, it's `<div>` element which toggles `selected` class on click.
Thus, it can be easily styled.

By default, it has `checkbox` CSS class, which can be overridden by passing `className` prop.

It passes through anything else, including `children`.
 
```jsx
<Checkbox checkedLink={ booleanLink } />
<Checkbox checkedLink={ arrayLink.contains( 'option' ) } />
```

## Radio Groups and Select list

### `<Select/>`

Wrapper for standard `<select/>`. Regular `<option/>` tags must be used. All props are passed through.

```jsx
<Select valueLink={ linkToSelectedValue }>
    <option value="a">A</option>
    <option value="b">B</option>
</Select>
```

### `<Input type="radio"/>`
      
Wrapper for the standard `<input>`. Directly binds boolean value with `checkedLink` property.

Can be directly bound to the state member using `valueLink` property.

```jsx
<label>
    A:
    <Input type="radio" valueLink={ flagLink } value="a" />
</label>
<label>
    B:
    <Input type="radio" valueLink={ flagLink } value="b" />
</label>
```

### `<Radio/>`

Internally, it's `<div>` element which always sets `selected` class on click. Thus,
it can be easily styled. 

By default, it has `radio` CSS class, which can be overridden by passing `className` prop.
It passes through anything else, including `children`.

It *must* be used in conjunction with `link.equals( 'value' )` method.

```jsx
<label>
    A:
    <Radio checkedLink={ flagLink.equals( 'a' ) } />
</label>
<label>
    B:
    <Radio checkedLink={ flagLink.equals( 'b' ) } />
</label>
```
