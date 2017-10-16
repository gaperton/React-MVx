import React, { define } from 'react-mvx'
import { Input } from 'react-mvx/tags'

@define
export default class AddTodo extends React.Component {
    static props = {
        onEnter : Function.value( function(){} )
    }

    static state = {
        desc : String
    }

    render(){
        return (
            <header className="header">
                <h1>todos</h1>

                <Input className="new-todo" placeholder="What needs to be done?" autoFocus
                       valueLink={ this.state.linkAt( 'desc' ) }
                       onKeyDown={ e => this.onKeyDown( e ) }
                />
            </header>
        );
    }

    onKeyDown( { keyCode } ){
        if( keyCode === 13 ){
            let { state, props } = this;

            state.desc && props.onEnter( state.desc );
            state.desc = "";
        }
    }
}