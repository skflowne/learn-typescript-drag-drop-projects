export enum Status {
    Active,
    Finished,
}

export class Proj {
    public id: string
    constructor(public title: string, public description: string, public people: number, public status: Status) {
        this.id = Math.random().toString()
    }
}
