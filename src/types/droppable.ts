export default interface Droppable {
    dragOverHandler(e: DragEvent): void
    dropHandler(e: DragEvent): void
    dragLeaveHandler(e: DragEvent): void
}
