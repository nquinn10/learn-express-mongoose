var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
  {
      title: { type: String, required: true }, //reference to the associated book
      author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
      summary: {type: String, required: true },
      isbn: {type: String, required: true},
      genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}] // square brackets to indicate genres will be in an array
  }
);

//Export model
module.exports = mongoose.model('Book', BookSchema);
