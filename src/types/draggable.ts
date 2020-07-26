// Drag and drop interfaces

export default interface Draggable {
    dragStartHandler(e: DragEvent): void
    dragEndHandler(e: DragEvent): void
}
