// Flight interface to define the structure of a flight
export interface Flight {
    id: number;
    origin: string;
    destination: string;
    price: number;
}

// Mock database (in-memory storage)
let flights: Flight[] = [];

export default flights;