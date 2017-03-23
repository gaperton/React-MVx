import { tools } from 'type-r'

/**
 * Dynamically loaded AMD chunks to be used in router.
 * Webpack will create the separate bundle for every page.
 * Usage:
 * 
 * import pages from './pages'
 * 
 * <Route path="small/page" getComponent={ pages.small() } />
 * <Route path="large/page" getComponent={ pages.large( 'ComponentName' ) } />
 */
const pages = {
    // Reference every page like this.
    small  : done => require( [ 'pages/small.jsx' ], done ),
    large  : done => require( [ 'pages/large/index.jsx' ], done ),
}

//==================================================================

const toRouterCallback = amdRequire => (
    entry => (
        ( _, done ) => amdRequire(
            exported => done( null, entry ? exported[ entry ] : exported )
        );
    )
);

export default tools.transform( {}, pages, toRouterCallback );