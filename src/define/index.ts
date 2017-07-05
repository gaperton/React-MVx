
import processStore from './store'
import processState from './state'
import processContext from './context'
import processProps from './props'

export default function process( spec, baseProto = {} ){
    // Initialize mixins placeholder...
    spec.mixins || ( spec.mixins = [] );

    processStore( spec, baseProto );
    processState( spec, baseProto );
    processContext( spec, baseProto );
    processProps( spec, baseProto );

    return spec;
};

export { Node, Element, TypeSpecs } from './typeSpecs'
