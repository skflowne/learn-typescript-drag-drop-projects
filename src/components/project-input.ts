import BaseComponent from "./base-component"
import { Validator, validate } from "../helpers/validation"
import Autobind from "../decorators/autobind"
import State from "../state/project-state"

export default class ProjectInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
    public titleInputEl: HTMLInputElement
    public descriptionInputEl: HTMLInputElement
    public peopleInputEl: HTMLInputElement
    private inputErrorElements: { [key: string]: HTMLDivElement } = {}

    private titleValidator: Validator = {
        required: true,
        length: {
            min: 3,
            max: 50,
        },
    }
    private descriptionValidator: Validator = {
        required: true,
        length: {
            min: 5,
            max: 500,
        },
    }
    private peopleValidator: Validator = {
        required: true,
        range: {
            min: 0,
            max: 100,
        },
    }

    constructor() {
        super("project-input", "app", true, "user-input")

        this.titleInputEl = this.element.querySelector("#title") as HTMLInputElement
        this.descriptionInputEl = this.element.querySelector("#description") as HTMLInputElement
        this.peopleInputEl = this.element.querySelector("#people") as HTMLInputElement

        this.configure()
        this.attach()
    }

    configure() {
        this.element.addEventListener("submit", this.handleSubmit)
    }

    render() {}

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputEl.value
        const description = this.descriptionInputEl.value
        const people = parseInt(this.peopleInputEl.value)

        console.log(title, description, people)

        if (this.validateInput(title, description, people)) {
            return [title, description, people]
        }
    }

    private createErrorContainer(): HTMLDivElement {
        const container = document.createElement("div")
        container.setAttribute("style", "background: red; color: orange;")
        const errorContainer = document.createElement("ul")
        errorContainer.className = "errors"
        container.appendChild(errorContainer)
        return container
    }

    private toggleElementErrors(element: HTMLElement, errors: { value: any; msg: string }[]) {
        if (errors.length) {
            const errorsEl = this.inputErrorElements[element.id] || this.createErrorContainer()
            const errorsListEl = errorsEl.querySelector(".errors")! as HTMLUListElement
            errorsListEl.innerHTML = ""
            errors.forEach((error) => {
                const li = document.createElement("li")
                li.textContent = error.msg
                errorsListEl.appendChild(li)
            })

            this.inputErrorElements[element.id] = errorsEl
            element.insertAdjacentElement("afterend", errorsEl)
        } else if (this.inputErrorElements[element.id]) {
            this.inputErrorElements[element.id].remove()
            delete this.inputErrorElements[element.id]
        }
    }

    private validateInput(title: string, description: string, people: number): boolean {
        const titleErrors = validate(title, this.titleValidator)
        const descriptionErrors = validate(description, this.descriptionValidator)
        const peopleErrors = validate(people, this.peopleValidator)

        this.toggleElementErrors(this.titleInputEl, titleErrors)
        this.toggleElementErrors(this.descriptionInputEl, descriptionErrors)
        this.toggleElementErrors(this.peopleInputEl, peopleErrors)

        return titleErrors.length === 0 && descriptionErrors.length === 0 && peopleErrors.length === 0
    }

    resetForm() {
        this.titleInputEl.value = ""
        this.descriptionInputEl.value = ""
        this.peopleInputEl.value = ""
    }

    @Autobind
    private handleSubmit(e: Event) {
        e.preventDefault()
        const userInput = this.gatherUserInput()
        console.log("user input", userInput)
        if (userInput) {
            State.getInstance().addProject(userInput[0], userInput[1], userInput[2])
            this.resetForm()
        }
    }
}
