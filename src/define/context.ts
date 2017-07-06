import { compileSpecs, collectSpecs } from './typeSpecs'
import { tools } from 'type-r'
import { ComponentClass } from 'react'

export default function process( Class : ComponentClass, { context, childContext } ){
    const { prototype } = Class;

    if( context ){
        // Merge in inherited members...
        prototype._context = tools.defaults( context, prototype._context || {} );

        // Compile to propTypes...
        Class.contextTypes = compileSpecs( context ).propTypes;
    }

    if( childContext ){
        prototype._childContext = tools.defaults( childContext, prototype._childContext );
        Class.childContextTypes = compileSpecs( childContext ).propTypes;
    }
}
