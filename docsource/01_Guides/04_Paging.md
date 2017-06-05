Page pattern on the example of users list.

```javascript
@define class Page extends Record {
    static attributes = {
        filter : Query, 
        items : User.Collection,
        page : Number
    }
}
```