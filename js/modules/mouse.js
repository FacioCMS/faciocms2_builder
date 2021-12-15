export const Mouse = {
    x: 0,
    y: 0,
    bind() {
        document.addEventListener("mousemove", e => {
            this.x = e.clientX
            this.y = e.clientY
        })
    }
}