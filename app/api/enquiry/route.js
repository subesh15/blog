import connectMongo from "@/utils/connectMongo"
import enquiryModel from "../../../models/enquiryModel";


export async function POST(req) {

    try {
        const { name,email,message} = await req.json()
        const enquiry = { name,email,message}
        await connectMongo();
        await enquiryModel.create(enquiry)
        return Response.json({message:'Enquiry have sent'})
    } catch (error) {
        return Response.json({message:error._message})
        // return Response.json({message:error.message})
    }
    
}