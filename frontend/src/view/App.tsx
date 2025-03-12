import { useEffect, useState } from "react";
import { getReservations } from "../utils/fetch"; // 正確導入 API
import { Reservation } from "../interface/Reservation";
import "../style/App.css";

const ReservationsList: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getReservations()
            .then(setReservations)
            .catch(() => setError("無法獲取預約資料"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="loading-error">載入中...</p>;
    if (error) return <p className="loading-error">{error}</p>;

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div>
            <h2>B310預約紀錄</h2>
            <table className="reservation-table">
                <thead>
                    <tr>
                        <th>預約 ID</th>
                        <th>學生姓名</th>
                        <th>座位</th>
                        <th>位置</th>
                        <th>時間段</th>
                        <th>創建時間</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res) => (
                        <tr key={res.reservation_id}>
                            <td>{res.reservation_id}</td>
                            <td>{res.student.student_name}</td>
                            <td>{res.seat.row_label} </td>
                            <td>{res.seat.seat_number}</td>
                            <td>{res.timeslot.start_time} - {res.timeslot.end_time}</td>
                            <td>{formatDate(res.create_time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <ReservationsList />
        </div>
    );
}

export default App;
