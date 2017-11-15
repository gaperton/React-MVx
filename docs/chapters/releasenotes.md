# Release Notes

## 2.0.0

- Bug fixes:
    - Fixed problems with deep inheritance from the React.Component
    - Mixins now works well with inheritance.
- Breaking changes:
    - *React lifecycle hook methods for the subclass are called automatically*.
- Other:
    - `{ ...link.props }` for ad-hoc data binding makes `tags.jsx` wrappers obsolete.
    - Type-R v2.0 is required.
    - New universal API for generating links (`linkAt()`)
    - First-class component stores support.