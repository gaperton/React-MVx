import React, { define } from 'react-mvx'
import cx from 'classnames'
import { Input } from 'react-mvx/tags'
import { ToDo } from './model'

@define export default
class TodoList extends React.Component {
    static props = {
        todos      : ToDo.Collection,
        filterDone : Boolean
    }

    static state = {
        editing : ToDo.from( '^props.todos' )
    }

    static pureRender = true

    render(){
        const { todos, filterDone } = this.props,
              filtered = filterDone === null ? todos.models
                            : todos.filter( todo => todo.done === filterDone ),

              editingLink = this.state.linkAt( 'editing' );

        return (
            <section className="main">
                <Input className="toggle-all" id="toggle-all" type="checkbox"
                       checkedLink={ todos.linkAt( 'allDone' ) }/>

                <label htmlFor="toggle-all">Mark all as complete</label>

                <ul className="todo-list">
                    { filtered.map( todo => (
                        <TodoItem key={ todo.cid } todo={ todo }
                                  editingLink={ editingLink }/>
                    ) )}
                </ul>
            </section>
        );
    }
}

function clearOnEnter( x, e ){
    if( e.keyCode === 13 ) return null;
}

const TodoItem = ( { todo, editingLink } ) =>{
    const editing   = editingLink.value === todo,
          className = cx( {
              'completed' : todo.done,
              'view'      : !todo.done,
              'editing'   : editing
          } );

    return (
        <li className={ className }>
            <div className="view">
                <Input className="toggle" type="checkbox"
                       checkedLink={ todo.linkAt( 'done' ) }/>

                <label onDoubleClick={ editingLink.action( () => todo ) }>
                    { todo.desc }
                </label>

                <button className="destroy" onClick={ () => todo.remove() }/>
            </div>

            { editing && <Input className="edit"
                                valueLink={ todo.linkAt( 'desc' ) }
                                autoFocus={ true }
                                onBlur={ editingLink.action( () => null ) }
                                onKeyDown={ editingLink.action( clearOnEnter ) }/> }
        </li>
    );
};
