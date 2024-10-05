export interface User {
    id: number;                
    name: string;   
    surnname: string;   
    password: string;      
    email: string;            
    createdAt: string;        
  }
  
  export interface UserCatalog {
    users: User[];           
  }
  