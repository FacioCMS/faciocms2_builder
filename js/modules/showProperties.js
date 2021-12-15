function comp(num, percent) {
    const number = Math.max(0, parseInt(num, 10));
    return percent ? Math.floor(255 * Math.min(100, number) / 100) : Math.min(255, number);
}

function rgbToHex(rgb) {
    const rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    let result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = comp(result[1], result[2]);
        g = comp(result[3], result[4]);
        b = comp(result[5], result[6]);

        hex = (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    return '#' + hex;
}

export function getProperty(styles, property) {
    return styles[property]
}

export function getCSSProperties(styles) {
    const output = {}
    const requiredItems = [
        'background', 
        'color',  
        'fontSize', 
        'fontFamily', 
        'borderColor', 
        'borderStyle', 
        'borderWidth',
        'padding',
        'borderRadius',
        'cursor'
    ]

    for(let item of requiredItems) {
        output[item] = getProperty(styles, item)
    }

    return output
}

export const createHeader = (title) => `<header class="property-header">${title}</header>`

export function showProperties() {
    const item = window.faciocms.builder.focused
    const css = item.style
    const props = getCSSProperties(css)

    const UI = `

        <div class="group"> 
            ${createHeader("Text")}

            <textarea class="textarea" id="textcontent">

            </textarea>
        </div>

        <div class="group">
            ${createHeader("Background")}

            <input type="color" id="background-input" class="color-input" data-change="background" value="${rgbToHex(props.background)}">
        </div>

        <div class="group">
            ${createHeader("Color")}

            <input type="color" id="color-input" class="color-input" data-change="color" value="${rgbToHex(props.color)}">
        </div>

        <div class="group">
            ${createHeader("Font Size")}

            <input type="number" id="fontsize-input" class="input" data-change="fontSize" data-addon="px" value="${props.fontSize.split("px")[0] || 20}">
        </div>

        <div class="group">
            ${createHeader("Font Family")}

            <select id="cursor-select" class="selector" data-change="fontFamily">
                <option value="sans-serif">Sans serif</option>
            </select>
        </div>

        <div class="group">
            ${createHeader("Border Color")}

            <input type="color" id="border-color-input" class="color-input" data-change="borderColor" value="${rgbToHex(props.borderColor)}">
        </div>

        <div class="group">
            ${createHeader("Border Style")}

            <select id="border-style-select" class="selector" data-change="borderStyle">
                <option value="solid">Solid</option>
                <option value="dotted">Dotted</option>
                <option value="dashed">Dashed</option>
                <option value="double">Double</option>
                <option value="groove">Groove</option>
                <option value="ridge">Ridge</option>
                <option value="none">None</option>
            </select>
        </div>

        <div class="group">
            ${createHeader("Border Width")}

            <input type="number" id="border-width-input" class="input"  data-change="borderWidth" data-addon="px" value="${props.borderWidth.split("px")[0] || 1}">
        </div>

        <div class="group">
            ${createHeader("Padding")}

            <input type="number" id="padding-input" class="input" data-change="padding" data-addon="px" value="${props.padding.split("px")[0] || 0}">
        </div>

        <div class="group">
            ${createHeader("Border Radius")}

            <input type="number" id="border-radius-input" class="input" data-change="borderRadius" data-addon="px" value="${props.borderRadius.split("px")[0] || 0}">
        </div>

        <div class="group">
            ${createHeader("Cursor")}

            <select id="cursor-select" class="selector" data-change="cursor">
                <option value="pointer">Pointer cursor</option>
            </select>
        </div>
    `

    $(".sidebar-right .items").html(UI)

    document.querySelector(".sidebar-right .items").querySelectorAll(".selector, .input, .color-input").forEach(input => {
        const callback = () => {
            const value = input.value
            const change = input.dataset.change
            item.style[change] = `${value}${input.dataset.addon ? input.dataset.addon : ''}`
        }
        
        input.addEventListener("change", callback)
        input.addEventListener("input", callback)
    })

    document.querySelector("#textcontent")
    .addEventListener("input", () => {
        const value = document.querySelector("#textcontent").value
        item.innerHTML = value
    })
}