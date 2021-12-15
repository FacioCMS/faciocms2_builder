/* FacioCMS Builder for FacioCMS v.2+ */
/* All rights reserved. Created by Maciej Dębowski */
/* https://www.faciocms.com */

import { makeDraggable } from "./modules/draggable.js"
import { Mouse } from "./modules/mouse.js"
import { showProperties } from "./modules/showProperties.js"

const value = decodeURI(localStorage.getItem("___faciocms_website_template_code"))

const $2 = _ => document.querySelector(_)
const $all = _ => document.querySelectorAll(_)

Mouse.bind()

// FacioCMS
window.faciocms = {
    contextMenu: {
        bindedItem: null
    },
    builder: {
        draggable: [],
        focused: null
    }
}

$(".website").html(value || "")

$2(".website").querySelectorAll(".fcms-item__website-container").forEach(item => {
    window.faciocms.builder.draggable.push({
        item: item.id
    })
})

allDraggable()

// Adding items to page
const sidebarItems = $all("[data-sidebaritem]")
const ws = $2(".website")
 
function allDraggable() {

    window.faciocms.builder.draggable.forEach(drag => {
        $(`#${drag.item}`).draggable({
            addClasses: false
        })

        makeDraggable(document.querySelector(`#${drag.item} [data-sidebaritem]`))
        //$2(`#${drag.item}`).addEventListener("contextmenu", e => { 
//
        //    $2("#contextmenu").style.top =  element.parentNode.getBoundingClientRect().top + element.parentNode.getBoundingClientRect().height + "px"//Mouse.y + "px"
        //    $2("#contextmenu").style.left = element.parentNode.getBoundingClientRect().left + "px"// Mouse.x + "px"
    //
        //    window.faciocms.contextMenu.bindedItem = element
    //
        //    e.preventDefault() 
        //})

        $(`#${drag.item}`).resizable()

        $(`#${drag.item}`).on('focus', () => {
            $all(".fcms-item__website-container").forEach(item => {
                item.style.zIndex = "10"
            })

            $(`#${drag.item}`).css({
                zIndex: 11
            })
        })
        
        
    })

    $all(".faciocms__website-item")
    .forEach(websiteItem => {
        websiteItem.addEventListener("click", () => {
            window.faciocms.builder.focused = websiteItem
            showProperties()
        }) 
    })
       
}

sidebarItems.forEach(item => {
    item.addEventListener("dblclick", e => {
        const newItem = item.cloneNode(true)
        const timespan = (new Date()).getTime()

        if(newItem?.dataset?.image == '') {
            newItem.src = prompt("source link?:")
        }

        //newItem.removeAttribute("[data-sidebaritem]")
        newItem.classList.add("faciocms__website-item")

        ws.innerHTML += `
            <div class="fcms-item__website-container" id="item__${timespan}" style="position: fixed;">
            </div>
        `

        newItem.style = "width: 100%; height: 100%; display: block; outline: none;"

        const item_outer = ws.querySelector(`#item__${timespan}`)
        item_outer.style.top = "50%"
        item_outer.style.left = "50%"

        const bounding = item_outer.getBoundingClientRect()
        const top = Mouse.y - bounding.top
        const left = Mouse.x - bounding.left

        //item_outer.style.transform = `translate(${top}px, ${left}px)`

        item_outer.appendChild(newItem)
        window.faciocms.builder.draggable.push({
            item: `item__${timespan}`
        })

        //makeDraggable(newItem)

        allDraggable()

        newItem.parentNode.style.zIndex = "11"

        e.preventDefault()
    })
})

$2("body").addEventListener("click", () => {
    $2("#contextmenu").style.top  = "-1000px"
    $2("#contextmenu").style.left = "-1000px"

    window.faciocms.contextMenu.bindedItem = null
})

$2("#contextmenu button").addEventListener("click", e => {
    if(window.faciocms.contextMenu.bindedItem != null) window.faciocms.contextMenu.bindedItem?.parentNode?.remove() 

    try { bindDraggableItems() } 
    catch(err) {
        err
    }

    e.preventDefault()
})

$(".sidebar-closer").on('click', () => {
    $(".sidebar").toggleClass('hide')
    $(".sidebar-closer em").toggleClass('fa-chevron-left')
    $(".sidebar-closer em").toggleClass('fa-chevron-right')
})

$(".sidebar-closer2").on('click', () => {
    $(".sidebar-right").toggleClass('hide')
    $(".sidebar-closer2 em").toggleClass('fa-chevron-left')
    $(".sidebar-closer2 em").toggleClass('fa-chevron-right')
})

// Saving
setInterval(() => {
    $2("#code").value = encodeURI($(".website").html())
}, 100)

setInterval(() => {
    localStorage.setItem("___faciocms_website_template_code", $2("#code").value)
}, 1000)

$(".save").on('click', () => {
    localStorage.setItem("___faciocms_website_template_code", $2("#code").value)
})