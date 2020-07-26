import BaseComponent from "./base-component"
import Droppable from "../types/droppable"
import Autobind from "../decorators/autobind"
import ProjectItem from "./project-item"
import { Proj, Status } from "../types/project-model"
import State from "../state/project-state"

export default class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement> implements Droppable {
    private type: "active" | "finished"
    private _projects: Proj[] = []

    get projects() {
        return this._projects.filter(
            (proj) => proj.status === (this.type === "active" ? Status.Active : Status.Finished)
        )
    }

    constructor(type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`)
        this.type = type

        this._projects = State.getInstance().projects

        this.configure()
        this.attach()
        this.render()
        this.renderProjects()
    }

    @Autobind
    dragOverHandler(e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
            e.preventDefault()
            const listUl = this.element.querySelector("ul")! as HTMLUListElement
            listUl.classList.add("droppable")
        }
    }

    @Autobind
    dragLeaveHandler(e: DragEvent) {
        const listUl = this.element.querySelector("ul")! as HTMLUListElement
        listUl.classList.remove("droppable")
    }

    @Autobind
    dropHandler(e: DragEvent) {
        const projectId = e.dataTransfer!.getData("text/plain")
        console.log("drop in", this.type)
        State.getInstance().setProjectStatus(projectId, this.type === "active" ? Status.Active : Status.Finished)
    }

    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler)
        this.element.addEventListener("dragleave", this.dragLeaveHandler)
        this.element.addEventListener("drop", this.dropHandler)

        State.getInstance().addListener((projects: Proj[]) => {
            this._projects = projects
            console.log("new projects", this._projects)
            this.renderProjects()
        })
    }

    render() {
        const listId = `${this.type}-projects-list`
        const list = this.element.querySelector("ul")! as HTMLUListElement
        list.id = listId

        this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`
    }

    private renderProjects() {
        const listUl = this.element.querySelector("ul")! as HTMLUListElement
        listUl.innerHTML = ""
        this.projects.forEach((project) => {
            new ProjectItem(listUl.id, project)
        })
    }
}
