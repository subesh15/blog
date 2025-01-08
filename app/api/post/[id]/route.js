import connectmongo from "../../../../utils/connectMongo";
import PostModel from "../../../../models/postModel";

export async function GET(req, {params,res}){
    try {
        // console.log(params)
        await connectmongo();
        const postData= await PostModel.findOne({_id: params.id});
        return Response.json(postData);
    } catch (error) {
        return Response.json({message:error.message})
    }
    
}