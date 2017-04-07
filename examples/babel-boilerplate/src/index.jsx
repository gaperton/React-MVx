import React, { define } from 'react-mvx'
import ReactDOM from 'react-dom'
import { Input } from 'react-mvx/tags'
import { Record } from 'type-r'

import './styles.css'

@define class Item extends Record {
    static attributes = {
        text : String
    }
}

@define class Application extends React.Component {
    static state = {
        items : Item.Collection
    };

    render(){
        const { state } = this;

        return (
            <div>
                <button onClick={ () => state.items.add({}) }>
                    Add
                </button>
                
                { state.items.map( item => (
                    <ItemView key={ item.cid } item={ item } /> 
                ))}
            </div>
        );
    }
}

const ItemView = ({ item }) => (
    <Input valueLink={ item.getLink( 'text' ) } /> 
);

ReactDOM.render( <Application/>, document.getElementById( 'react-application' ) );