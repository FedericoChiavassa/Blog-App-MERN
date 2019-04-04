const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: { 
        type: Schema.Types.ObjectId, ref: 'user',
        required: true
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

PostSchema.plugin(mongoosePaginate);

module.exports = Post = mongoose.model('post', PostSchema);