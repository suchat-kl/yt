

    export type UserDetail = Usr

    export interface Usr {
      id: number
      name: string
      username: string
      email: string
      password: string
      idcard: string
      roles: Role[]
    }
    
    export interface Role {
      id: number
      name: string
    }



