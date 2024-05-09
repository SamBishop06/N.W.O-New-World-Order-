const { Schema, model } = require('mongoose');
const axios = require('axios'); // Added for API integration

// Define the schema for a chat message
const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 2000
        },
        timestamp: {
            type: Date,
            default: Date.now
        },
    }
);

// Virtual for formatted timestamp // local time
postSchema.virtual('formattedTimestamp').get(function() {
    return this.timestamp.toLocaleString();
});

// Async function to filter bad words using Bad Word Filter API
async function filterBadWords(message) {
    try {
        const encodedParams = new URLSearchParams();
        encodedParams.set('content', message);
        encodedParams.set('censor-character', '*');

        const options = {
            method: 'POST',
            url: process.env.BAD_WORD_FILTER_API_ENDPOINT,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': process.env.BAD_WORD_FILTER_API_KEY,
                'X-RapidAPI-Host': 'neutrinoapi-bad-word-filter.p.rapidapi.com'
            },
            data: encodedParams,
        };

        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error filtering bad words:', error.response ? error.response.data : error.message);
        // Return original message if there's an error
        return message;
    }
}

// Add a pre-save hook to filter bad words before saving the post
postSchema.pre('save', async function(next) {
    try {
        this.message = await filterBadWords(this.message);
        next();
    } catch (error) {
        next(error);
    }
});

// Async function to replace keywords with emojis using Open Emoji API
// async function replaceWithEmojis(message) {
//     try {
//         const response = await axios.get(process.env.OPEN_EMOJI_API_KEY, {
//             params: {
//                 message
//             }
//         });
//         return response.data.emojifiedMessage;
//     } catch (error) {
//         console.error('Error replacing with emojis:', error);
//         return message; // Return original message if there's an error
//     }
// }

// Add a pre-save hook to replace keywords with emojis before saving the post
// postSchema.pre('save', async function(next) {
//     try {
//         this.message = await replaceWithEmojis(this.message);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Define a model for the chat messages
const Post = model('Post', postSchema);

module.exports = Post;