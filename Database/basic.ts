import * as mongoose from 'mongoose';
const { Schema } = mongoose;

const prefix = new Schema({
    'server_id': String,
    'prefix': String
});
const Model = mongoose.model('Prefix', prefix);
export default Model