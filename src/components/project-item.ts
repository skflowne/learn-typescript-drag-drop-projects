import BaseComponent from "./base-component"
import Draggable from "../types/draggable"
import Autobind from "../decorators/autobind"
import { Proj } from "../types/project-model"

export default class ProjectItem extends BaseComponent<HTMLLIElement, HTMLUListElement> implements Draggable {
    private project: Proj

    get peopleText() {
        return `${this.project.people.toString()} ${this.project.people > 1 ? "persons" : "person"} assigned`
    }

    constructor(parentId: string, project: Proj) {
        super("single-project", parentId, false, project.id)
        this.project = project

        this.configure()
        this.attach()
        this.render()
    }

    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler)
        this.element.addEventListener("dragend", this.dragEndHandler)
    }

    render() {
        this.element.querySelector("h2")!.textContent = this.project.title
        this.element.querySelector("h3")!.textContent = this.peopleText
        this.element.querySelector("p")!.textContent = this.project.description
    }

    @Autobind
    dragStartHandler(e: DragEvent) {
        e.dataTransfer!.setData("text/plain", this.project.id)
        e.dataTransfer!.effectAllowed = "move"
    }

    @Autobind
    dragEndHandler(e: DragEvent) {
        console.log("drag end")
    }
}
