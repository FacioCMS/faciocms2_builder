import { Mouse } from "./mouse.js"

Mouse.bind()

const $ = _ => document.querySelector(_)
const $all = _ => document.querySelectorAll(_)

/**
 * 
 * @deprecated
 * using only for bind Context Menu. jQuery UI better option :)
 * 
 */

export function makeDraggable(element) {
    if(!element) return
    element.dataset.isdraggable = false

    element.parentNode.addEventListener("keydown", e => {
        if(e.key == "Backspace" && e.ctrlKey) {
            element.remove()
        }
    })

    element.parentNode.addEventListener("contextmenu", e => { 

        $("#contextmenu").style.top =  element.parentNode.getBoundingClientRect().top + element.parentNode.getBoundingClientRect().height + "px"//Mouse.y + "px"
        $("#contextmenu").style.left = element.parentNode.getBoundingClientRect().left + "px"// Mouse.x + "px"

        window.faciocms.contextMenu.bindedItem = element

        e.preventDefault() 
    })
}