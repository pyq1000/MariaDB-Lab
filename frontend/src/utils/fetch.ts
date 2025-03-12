import { api } from "../enum/api";
const commonConfig: RequestInit = {
    headers: {        
        "Content-Type": "application/json"
    }
};

// GET API 請求函式
export async function asyncGet(apiUrl: string): Promise<any> {
    try {
        const res: Response = await fetch(apiUrl, {
            ...commonConfig, 
            method: "GET"
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("❌ GET request error:", error);
        throw error;
    }
}

// 呼叫 `list` API 的函式
export const getReservations = async (): Promise<any[]> => {
    return await asyncGet(api.list);
};
