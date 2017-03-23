import { define, Record } from 'type-r'

@define class Session extends Record {
    idAttribute : 'token',

    static attributes = {
        username : String.isRequired,
        password : String.isRequired,
        token : String.value( null )
    };

    login(){
        post( '/api', this.toJSON(), json => this.fromJSON( json ) );
    }
}

export default new Session();