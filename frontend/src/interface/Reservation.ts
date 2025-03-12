export interface Student {
    student_id: number;
    student_name: string;
}

export interface Seat {
    seat_id: number;
    row_label: string;
    seat_number: number;
}

export interface Timeslot {
    timeslot_id: number;
    start_time: string;
    end_time: string;
}

export interface Reservation {
    reservation_id: number;
    student: Student;
    seat: Seat;
    timeslot: Timeslot;
    create_time: string;
}
