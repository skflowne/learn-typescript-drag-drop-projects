import ProjectInput from "./components/project-input"
import ProjectList from "./components/project-list"
import _ from "lodash"

const numbers: number[] = [1, 2, 3]

console.log(_.shuffle(numbers))

const prjInput = new ProjectInput()
const activeProjectList = new ProjectList("active")
const finishedProjectList = new ProjectList("finished")

console.log("loaded app.js")
