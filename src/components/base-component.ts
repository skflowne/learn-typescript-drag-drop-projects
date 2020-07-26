export default abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement> {
    public templateElement: HTMLTemplateElement
    public parentElement: T
    public element: U
    private insertAtStart: boolean = false

    constructor(templateId: string, parentId: string, insertAtStart: boolean, elementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
        this.parentElement = document.getElementById(parentId)! as T
        this.insertAtStart = insertAtStart

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as U
        if (elementId) {
            this.element.id = elementId
        }
    }

    protected attach() {
        this.parentElement.insertAdjacentElement(this.insertAtStart ? "afterbegin" : "beforeend", this.element)
    }

    abstract configure(): void
    abstract render(): void
}
