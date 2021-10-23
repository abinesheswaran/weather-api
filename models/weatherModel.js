const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema(
  {
    coord: {
        type:[Number],
        required: [true,'A weatherSchema must have coordinates']
    },
    weather:{ 
        main:String,
        description:String,
        temp:Number,
        pressure:Number,
        humidity:Number,
        visibility:Number,
        windSpeed:Number,
        clouds:Number,
        country:String,
    },
    searchQuery:{ 
        type:String,
        required: [true,'A weatherSchema must have searchQuery'],
        trim: true,
        maxlength: [50, 'searchQuery above 50 characters'],
        minlength: [3, 'searchQuery bellow 3 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now()
      }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
