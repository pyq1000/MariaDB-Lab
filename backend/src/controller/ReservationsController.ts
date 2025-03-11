import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { Service } from "../abstract/Service";
import { PageService } from "../Service/PageService";
import { DB } from "../app";
import { ReservationsService } from "../Service/ReservationsService";
require('dotenv').config()

export class ReservationsController extends Contorller {
    protected service: ReservationsService;

    constructor() {
        super();
        this.service = new ReservationsService();
    }

    public async test(Request: Request, Response: Response) {
        await DB.connection?.query("USE lab_b310;");
        const resp = await DB.connection?.query("SELECT * FROM Reservations;");
        Response.send(resp)
    }
    public async getReservations(Request:Request,Response:Response){
        try{
            const reservations = await (this.service as ReservationsService).list();
            Response.json(reservations);
        }catch(error){
            console.error("Error fetching reservations:",error);
            Response.status(500).json({"message":"無法獲取預約紀錄"});
        }
    }
}