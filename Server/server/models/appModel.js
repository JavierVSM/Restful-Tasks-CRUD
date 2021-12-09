const mongoose = require ('mongoose');

const AppSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    created_at: Date,
    updated_at: Date
});

const App = mongoose.model ('app', AppSchema);

const AppModel={

    create: function(newData){
        return App.create(newData);
    },

    getAll:function(){
        return App.find();
    },

    getbyId: function (id){
        return App.findOne({_id:id})
    },

    deleteById: function( id ){
        return App.remove( {_id:id} );
    },

    update: function( id, toUpdate ){
        return App.findOneAndUpdate( {id}, {$set : toUpdate }, {new : true} )
    }
};

module.exports = {AppModel};