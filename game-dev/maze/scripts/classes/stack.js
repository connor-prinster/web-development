class Stack {
    constructor() {
        this.items = []
    }

    push(element) {
        this.items.push(element)
    }

    pop() {
        if (this.items.length == 0) {
            return "is empty"
        }
        return this.items.pop()
    }

    peek() {
        return this.items[this.items.length - 1]
    }

    peekAt(idx) {
        return this.items[idx]
    }

    returnStack() {
        return this.items
    }

    printStack() {
        let str = ""
        for (let idx in this.items) {
            let item = this.items[idx]
            str += ("x: " + item.x + ", y: " + item.y + "\n")
        }
    }

    isEmpty() {
        return this.items.length == 0
    }
}