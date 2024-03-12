// purpose of defining a model is to define a document in db
var mongoose = require('mongoose');
// create instance of schema to create structure of document
var Schema = mongoose.Schema;
//whole thing is object with properties and validation constraints
var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
// virtual properties are not stored in db itself but calculated from existing db schema properties
// example of encapsulation - hide details of entity that we are exposing to schema
AuthorSchema
.virtual('name')
.get(function () {
// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for author's lifespan
// lifespan is calculated property
AuthorSchema.virtual('lifespan').get(function() {
    var lifetime_string = '';
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getFullYear().toString();
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getFullYear()
    }
    return lifetime_string;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
