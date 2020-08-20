export interface UserData {
    name: string;
    lastname: string;
    birthday: string;
    image: string;
    country: number;
    gender: string;
}

export const USER_DATA: UserData = {
    name: 'Jorge',
    lastname: 'perez',
    birthday: '12/04/1992',
    image: null,
    country: 1,
    gender: 'M'    
}; 
