export default function Autobind(target: any, name: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        },
    }
    return newDescriptor
}
