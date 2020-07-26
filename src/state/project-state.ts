import { Proj, Status } from "../types/project-model"

type Listener<T> = (items: T[]) => void

class AppState<T> {
    protected listeners: Listener<T>[] = []

    addListener(fn: Listener<T>) {
        this.listeners.push(fn)
    }
}

export default class State extends AppState<Proj> {
    private static inst: State
    private _projects: Proj[] = [new Proj("Test project", "Test project for drag and drop", 4, Status.Active)]

    get projects() {
        return [...this._projects]
    }

    static getInstance() {
        if (!this.inst) {
            this.inst = new State()
        }
        return this.inst
    }

    private constructor() {
        super()
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Proj(title, description, people, Status.Active)
        this._projects.push(newProject)
        this.broadcastUpdate()
    }

    setProjectStatus(id: string, status: Status) {
        const project = this._projects.find((proj) => proj.id === id)
        if (project && project.status !== status) {
            project.status = status
            this.broadcastUpdate()
        }
    }

    broadcastUpdate() {
        this.listeners.forEach((fn) => {
            fn([...this._projects])
        })
    }
}
