var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// book is ObjectId type = specific type in mongoose - says will refer to some other object - ref: 'Book'

var BookInstanceSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
  }
);

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);
