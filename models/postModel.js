import mongoose from "mongoose";
import { Schema,model,models } from "mongoose";
import { title } from "process";

const postSchema = new Schema({
    title: String,
    description: String,
    image: String,
    createdAt: String
},{ toJSON: { virtuals: true}});

postSchema.virtual('short_description').get(function(){
    return this.description.substr(0,100)+'...'
})

postSchema.virtual('created_at_formatted').get(function(){
    return changeDateFormat(this.createdAt)
})

function changeDateFormat(date_str){
    const date=new Date(date_str);
    const months = ["January","Feburary","March","April","May","June",
        "July","August","September","Octomber","November","December"
    ]

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const PostModel =models.Post ||model('Post',postSchema);

export default PostModel;