import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

export function authentication (req:any,res:any,next:any){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Acess Denied! No access token provided');
    // console.log(token);

    if(!process.env.SECRET_KEY){
        res.send('no secret key provided');
        return;
    }

    try{
        const payloadData = Object(jwt.verify(token,process.env.SECRET_KEY));
        console.log(payloadData);
        req.user = payloadData.userType;
        req.userID = payloadData.userID;
        console.log(payloadData.userID);
        
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
        console.error(err);
    }
    
}

const authorized = (...roles: any) => {
    return (req: any, res:any, next: NextFunction) => {
    //    console.log(req.user)
     if (!roles.includes(req.user)) {
       res.status(401)
       throw new Error("User Not Authorized");
     }
     console.log(req.userID);
     next();
   };
 };
export { authorized }