import { 
  Request, 
  Response, 
  NextFunction,  
} from 'express';
import { RolesEnum } from '../dto';

class VerifyRole {
  static async iSAdmin(  
    req: any, 
    res: Response, 
    next: NextFunction
  ) {
    const role = req.user.role;
    
    if(role === RolesEnum.ADMIN) {
      next();
    } 

    return res.status(401).json({
      success: false,
      message: "You don't have the permission to access the resource"
    })
  }
};

export default VerifyRole;
