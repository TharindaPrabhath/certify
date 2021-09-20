import AdminDto from "./AdminDto";

interface ActivityDto{ 
    id: number;
    type: string;
    subject: string;
    admin: {
        id: number;
        name: string;
    };
    share: boolean;
    time: string;
    date: string
}

export default ActivityDto;