import {Request, Response} from 'express';
import {matchedData} from "express-validator";
import {authService} from "../../application/authService";
import {HttpStatuses, ResultStatus} from "../../domain/result-object/result code";
import {LoginInputModel} from "../../domain/user entity";


export const loginUserController = async (req: Request<any, any, LoginInputModel>,
                                          res: Response)=> {


    const data: LoginInputModel = matchedData(req);
    const userAgent = req.headers['user-agent'] || 'unknown device'

    if (req.ip) {
        const result = await authService.loginUser(data, req.ip, userAgent);
        if (result === null) {
            res.status(HttpStatuses.BadRequest)
            return;
        }
        if (result?.status === ResultStatus.Unauthorized) {
            res.sendStatus(HttpStatuses.Unauthorized)
            return;
        }
        if (result?.data) {
            res
                .cookie("refreshToken", result.data[1], {
                    httpOnly: true,
                    secure: true,
                })
                .status(HttpStatuses.Success)
                .json({accessToken: result.data[0]})
        }
    }



    res.status(HttpStatuses.ServerError).send();

}