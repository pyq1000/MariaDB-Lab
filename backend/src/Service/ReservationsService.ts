import { Service } from "../abstract/Service";
import { DB } from "../app";
import { Seat } from "../interfaces/Seat";


export class ReservationsService extends Service{
    public async list():Promise<any[]>{
        await DB.connection?.query("USE lab_b310;");
        const query = `
        SELECT
            r.reservation_id,
            r.student_id,
            r.seat_id,
            r.timeslot_id,
            r.create_time,
            stu.student_name,
            s.row_label,
            s.seat_number,
            t.start_time,
            t.end_time
        FROM Reservations r
        JOIN Students stu ON r.student_id = stu.student_id
        JOIN Seats s ON r.seat_id = s.seat_id
        JOIN Timeslots t ON r.timeslot_id = t.timeslot_id
        ORDER BY r.reservation_id
        `;
        const rows = await DB.connection?.query(query);
        return rows.map((row: any)=>({
            reservation_id:row.reservation_id,
            student:{
                student_id: row.student_id,
                student_name: row.student_name
            },
            seat:{
                seat_id: row.seat_id,
                row_label:row.row_label,
                seat_number: row.seat_number
            },
            timeslot:{
                timeslot_id:row.timeslot_id,
                start_time:row.start_time,
                end_time: row.end_time
            },
            create_time: row.create_time
        }));

    }
}