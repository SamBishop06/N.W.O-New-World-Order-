const { Schema, model } = require('mongoose');

const attachmentSchema = new Schema(
    {
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        }]
    }
);

// Custom validator to limit the number of posts to 2000
attachmentSchema.path('posts').validate(function(posts) {
    return posts.length <= 2000;
}, 'Maximum number of posts exceeded (2000).');

// Pre-save hook to delete excess posts if the limit is exceeded
attachmentSchema.pre('save', async function(next) {
    if (this.posts.length > 2000) {
        const excessPosts = this.posts.slice(2000);
        await Post.deleteMany({ _id: { $in: excessPosts } });
        this.posts = this.posts.slice(0, 2000);
    }
    next();
});

const Attachment = model('Attachment', attachmentSchema);

module.exports = Attachment;
