const {AppModel} = require( '../models/appModel' );

const AppController = {
        
        getIndex: function (request, response){
            AppModel
                .getAll()
                .then (data  => {
                    response.status( 200 ).json( data );
                });
        },

        display: function (request, response){
            let id = request.params.id;
            AppModel
            .getbyId (id)
            .then (result  => {
                if (result === null){
                    throw new Error("null");
                }
                response.status( 200 ).json( result );
            })
            .catch( err => {
                response.statusMessage = "No data with this task";
                response.status( 404 ).end();
            });
        },

        add: function (request, response){
            let title= request.body.title;
            let description= request.body.description;
            const completed= false;
            const created_at= new Date();
            const updated_at= new Date();

            const newData = {
                title,
                description,
                completed,
                created_at,
                updated_at
            };

            AppModel
                .create(newData)
                .then( result => {
                    response.status( 201 ).json( result );
            })
                .catch( err => {
                    response.statusMessage = "Something goes wrong!";
                    response.status( 400 ).end();
                });
        },

        edit: function( request, response){
            const toChange = request.params.id;

            const title= request.body.title;
            const description= request.body.description;
            const completed= request.body.completed;
            const created_at= request.body.created_at;
            const updated_at= new Date();

            const change = {
                title,
                description,
                completed,
                created_at,
                updated_at
            };

            AppModel
                .update(toChange, change)
                .then( result =>{
                    response.status( 201 ).json( result );
                })
                .catch( err =>{
                    response.statusMessage = "Something goes wrong!";
                    response.status( 400 ).end();
                })
        },

        delete: function (request, response){
            let id = request.params.id;
            AppModel
            .deleteById (id)
            .then( result => {
                if( result === null ){
                    throw new Error( "That task doesn't exist" );
                }
                else{
                    AppModel
                    .deleteById (id)
                        .then( deleteResult => {
                                response.status( 204 ).end();
                        });
                    }
            })
            .catch( error => {
                response.statusMessage = error.message;
                response.status( 404 ).end();
            })
        }

}

module.exports={AppController};