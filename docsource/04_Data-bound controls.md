## Ad-hoc data binding

Link can be bound to the standard form control consuming `value` and `onChange` props using the `link.props` property:

For the case of string control it's rather straightforward.

```javascript
// String
<input type="text" {...link.props} />
<textarea {...link.props} />
```

Checkbox can be bound to value either:

- directly, if the value is boolean.
- to the presense of the value in the array (array of flags), using the `link.contains()` method.
- to the presense of the record in the collection, using `collection.linkContains()` method.

```javascript
// Checkbox
<input type="checkbox" {...boolLink.props } />
<input type="checkbox" {...arrayLink.contains( 'optionX' ).props } />
<input type="checkbox" {...collection.linkContains( record ).props } />
```

Radio groups can be bound to the single link, using `link.equals()` method.

```javascript
// Radio
<input type="radio" {...link.equals( 'optionA' ).props } />
<input type="radio" {...link.equals( 'optionB' ).props } />
```

And the select list is bound to the single link in the same way as text inputs.

```javascript
// Select
<select {...link.props}>
    <option value="optionA"> A </option>
    <option value="optionB"> B </option>
</select>
```

## Linked UI controls

In order to take the full advantage of the value link pattern you're encouraged to create
the semantic form control wrappers encapsulating the markup for inline validation errors
and form layout styling. Not only forms, but the most of the UI can benefit of this technique.

This guide will explain how to create the custom data-bound (linked) controls with inline validation.

_Linked control_ is the React component following the simple pattern illustrated below. It takes the `link` as single property 
instead of the value and callbacks. It uses the link to extract the value and validation error, and to modify the value.

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

Custom tags mentioned in this guide are available as `react-mvx/tags`. As it's hard to come up with the general solution for inline errors indication, this file is rather intended to be used as a starting boilerplate for your controls.

```javascript
import { Input } from 'react-mvx/tags'
```

### Text input controls

`tags.jsx` contains wrappers for standard `<input>` and `<textarea>` tags,
  which consume linked strings. These wrappers add `invalid` class to enclosed HTML element if an error is present in the link,
  and `required` class if `isRequired` validator is the failing one.

```javascript
import { Input, TextArea } from 'react-mvx/tags'
...
<Input type="text" valueLink={ link } />
<TextArea valueLink={ link } />
```

Its implementation is rather straightforward.

### Numeric input

In some cases you can use the _wrong input rejection_ instead of (or in addition to) the validation. The most popular
example is the numeric-only input control. It guarantees that the linked value will only be updated with the valid number,
completely encapsulating all related checks and mechanics.

The challenge here is that when number in not an _integer_ it has to go throgh the sequence of intermediate invalid states during the editing process.
Like "" -> "-" -> "-0" -> "-0." -> "-0.5".

The proper implementation of wrong input rejection might be tough.
`tags.jsx` contains the cross-browser numeric input tag. It has following differences compared to the regular `<Input>`:

- Keyboard input which obviously leads to invalid values (e.g. letters) is rejected.
- Link value is guaranteed to be the valid number.
- There are `integer` and `positive` boolean props controlling input rejection. They can be combined.

`<NumberInput>` validates its intermediate state and adds `invalid` class to enclosed input element if it's not a number.

```jsx
import { NumberInput } from 'react-mvx/tags'

<NumberInput valueLink={ link } />
<NumberInput valueLink={ link } integer={ true }/>
<NumberInput valueLink={ link } positive={ true }/>
```

### Checkboxes

There are different ways how you can handle the checkbox components. The problem of the standard 
checkbox control, though, is that it's not that easily styled.

`tags.jsx` contains the custom checkbox and radio components implemented using the plain `<div />`
 element which toggles `selected` class on click. By default, it has `checkbox` CSS class,
  which can be overridden by passing `className` prop. It passes through anything else, including `children`.
 
```jsx
<Checkbox checkedLink={ booleanLink } />
<Checkbox checkedLink={ arrayLink.contains( 'option' ) } />
```

### Radio Groups
      
There are two different ways how you can approach the data binding for the radio groups.
First option is to pass the `value` of the particular option along with the link. Link this:

```jsx
<label>
    A: <Input type="radio" valueLink={ flagLink } value="a" />
</label>
<label>
    B: <Input type="radio" valueLink={ flagLink } value="b" />
</label>
```

Alternatively, you can use `link.equals( value )` method to produce the boolean
link which is specially designed to create radio groups, as it's illustrated by
the custom `<Radio />` tags from the `tags.jsx`.

Internally, it's `<div>` element which always sets its link to `true` on click.
And whenever the link value is `true`, it adds `selected` class to the div.

By default, it has `radio` CSS class, which can be overridden by passing `className` prop.
It passes through anything else, including `children`.

```jsx
<label>
    A: <Radio checkedLink={ flagLink.equals( 'a' ) } />
</label>
<label>
    B: <Radio checkedLink={ flagLink.equals( 'b' ) } />
</label>
```
