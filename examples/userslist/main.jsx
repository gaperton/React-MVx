import './main.css'
import ReactDOM from 'react-dom'

import React, { Link } from 'react-mvx'
import { Record, define } from 'type-r'

import Modal from 'react-modal'
import {Input, isRequired, isEmail } from 'react-mvx/tags'

@define class User extends Record {
    static attributes = {
        name : String.isRequired
                    .has.check( x => x.indexOf( ' ' ) < 0, 'Spaces are not allowed' ),

        email : String.isRequired
                    .has.check( isEmail ),

        isActive : true
    }

    remove(){ this.collection.remove( this ); }
}

@define
export class UsersList extends React.Component {
    static state = {
        users   : User.Collection, // No comments required, isn't it?
        editing : User.from( 'users' ), // User from user collection, which is being edited.
        adding  : User.shared.value( null ) // New user, which is being added.
    }

    render(){
        const { state } = this;

        return (
            <div>
                <button onClick={ () => state.adding = new User() }>
                    Add User
                </button>

                <Header/>

                { state.users.map( user => (
                    <UserRow key={ user.cid }
                             user={ user }
                             onEdit={ () => state.editing = user }
                    />
                ) )}

                <Modal isOpen={ Boolean( state.adding ) }>
                    <EditUser userLink={ state.linkAt( 'adding' ) }
                              onSave={ () => state.users.add( state.adding ) }/>
                </Modal>

                <Modal isOpen={ Boolean( state.editing ) }>
                    <EditUser userLink={ state.linkAt( 'editing' ) } />
                </Modal>
            </div>
        );
    }
}

const Header = () =>(
    <div className="users-row">
        <div>Name</div>
        <div>Email</div>
        <div>Is Active</div>
        <div/>
    </div>
);

const UserRow = ( { user, onEdit } ) =>(
    <div className="users-row" onDoubleClick={ onEdit }>
        <div>{ user.name }</div>
        <div>{ user.email }</div>
        <div onClick={ () => user.isActive = !user.isActive }>
            { user.isActive ? 'Yes' : 'No' }</div>
        <div>
            <button onClick={ onEdit }>Edit</button>
            <button onClick={ () => user.remove() }>X</button>
        </div>
    </div>
);

@define class EditUser extends React.Component {
    static props = {
        userLink    : Link.has.watcher( React.assignToState( 'user' ) ),
        onSave : Function
    };

    static state = {
        user : User
    };

    onSubmit =  e => {
        e.preventDefault();

        const { userLink, onSave } = this.props;

        userLink.value.assignFrom( this.state.user );
        onSave && onSave( userLink.value );
        this.onCancel()
    }

    onCancel = () => this.props.userLink.set( null );

    render(){
        const { user } = this.state,
                linked = user.linkAll();

        return (
            <form onSubmit={ this.onSubmit }>
                <label>
                    Name: <ValidatedInput type="text" valueLink={ linked.name }/>
                </label>

                <label>
                    Email: <ValidatedInput type="text" valueLink={ linked.email }/>
                </label>

                <label>
                    Is active: <Input type="checkbox" checkedLink={ linked.isActive }/>
                </label>

                <button type="submit" disabled={ !user.isValid() }>
                    Save
                </button>
                <button type="button" onClick={ this.onCancel }>
                    Cancel
                </button>
            </form>
        );
    }
}

const ValidatedInput = ( props ) => (
    <div>
        <Input { ...props } />
        <div className="validation-error">
            { props.valueLink.error || '' }
        </div>
    </div>
);

ReactDOM.render( <UsersList />, document.getElementById( 'app-mount-root' ) );
