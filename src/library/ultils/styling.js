import { isString } from "lodash";

export function dragBlockLinkedBorder2CSS(obj, side = '') {
    const { width, style, color } = obj;

    let CSS = '';
    if (side) side = side + '-';
    if (width) CSS += 'border-' + side + 'width:' + width + ';';
    CSS += 'border-' + side + 'style:' + (style ? ' ' + style : ' solid') + ';';
    if (color) CSS += 'border-' + side + 'color:' + dragBlockColorNameVariable(color) + ';';

    return CSS;
}
export function dragBlockBorder2CSS(obj) {
    if (!obj) return '';
    let css = '';
    if ('top' in obj) {
        for (let side in obj) {
            let side_css = dragBlockLinkedBorder2CSS(obj[side]);
            if (!side_css) continue;
            css += dragBlockLinkedBorder2CSS(obj[side], side)
        }
    } else {
        css = dragBlockLinkedBorder2CSS(obj);
    }

    return css;
}
/**
 * 
 * @param {Object} obj 
 * @returns 
 */
export function dragBlockObj2CSS(obj) {
    if (!obj) return '';
    let css = Object.keys(obj).map((key) => key + ':' + obj[key]).join(';');
    if (css) css += ';';
    return css;
}



export function dragBlockColorNameVariable(value) {
    if (value.indexOf('#') != -1) return value;
    return 'var(--wp--preset--color--' + value + ')';
}

//----------------------------------------------------------------
// ** YOU ARE NOT ALLOWED TO EDIT THESE CONSTANTS **
// we use var(--wp--style--global--content-size)
// so we don't have to replace in the front end then we can save the performance
const contentSizeVar = 'var(--wp--style--global--content-size)';
const wideSizeVar = 'var(--wp--style--global--wide-size)';

export function dragBlockMatchingSizes({ value, contentSize, wideSize }) {

    // console.log('Matching', value, colors);
    if (!value || !isString(value)) return value;
    value = value.split(' ').map(v => {
        if (v == contentSize) {
            return contentSizeVar
        }
        if (v == wideSize) {
            return wideSizeVar
        }

        return v

    }).join(' ');
    // console.log('after matching', value)
    return value;
}
export function dragBlockUnmatchingSizes({ value, contentSize, wideSize }) {
    if (!value || !isString(value)) return value;

    return value.split(' ').map(v => {
        if (v == contentSizeVar) return contentSize
        if (v == wideSizeVar) return wideSize
        return v

    }).join(' ')
}


/**
 * COLOR MAPPING
 * --------------------------------
 */
// don't change this because values saved in attributes are all following this format
const colorVarStart = '{c=';
const colorVarEnd = '}';



/*
 
[
    {name: 'Primary', slug: 'primary', color: '#FC5356'},

    {name: 'Pale pink', slug: 'pale-pink', color: '#f78da7'},
]

// color: var(--wp--preset--color--primary) !important;

**** 
Because we have ALPHA so can't use the color variable
****
value = #FC5356 => {c=primary}
value = #FC535699 => {c=primary}99
value = 1px solid #FC5356 => 1px solid {c=primary}
value = 1px solid #FC535699 => 1px solid {c=primary}99
#f78da882

****************************************************************
FINALLY, WE DECIDED TO USE {} to distinguish between value because
{ and } are used only for properties' wrapper
*/
/**
 * Convert a color value to a variable string with fallback values
 * 
 * @param {*} param0 
 * @returns 
 */
export function dragBlockMatchingColors({ value, colors }) {
    // because we also include alpha value to the color,
    // so we can not use var(--wp--preset--color--primary) alone
    if (!value || !isString(value)) return value;
    value = value.split(' ').map(v => {
        // not a color value
        if (v.indexOf('#') !== 0) return v;

        let alphaValue = v.substring(7).toLowerCase();
        let colorValue = v.substring(0, 7).toLowerCase();
        // console.log('mapping', v, alphaValue, colorValue)
        for (let color of colors) {
            // remove the alpha value from the referenced color
            let fullValue = color.color.toLowerCase();
            let noAlphaValue = fullValue.substring(0, 7);

            // perfect match
            if (colorValue+alphaValue == fullValue) {
                return colorVarStart + (color.slug) + colorVarEnd;
            }

            // match without alpha
            if (colorValue == noAlphaValue) {
                return colorVarStart + (color.slug) + '@' + colorVarEnd + alphaValue;
            }
        }
        return v;
    }).join(' ');
    // console.log('after matching', value)
    return value;
}
/*
value =  {c=primary} => #FC5356
value = {c=primary}99 => #FC535699 => 
value = 1px solid {c=primary} => 1px solid #FC5356
value = 1px solid {c=primary}99 => 1px solid #FC535699
*/
export function dragBlockUnmatchingColors({ value, colors }) {
    if (!value || !isString(value)) return value;

    return value.split(' ').map(v => {
        if (v.indexOf(colorVarStart) !== 0) return v
        v = v.split(colorVarEnd);
        // because we could have only the color,
        // and maybe the alpha so the lenght is not more than 2
        if (v.length <= 2) {
            let alphaValue = (v.length == 2 ? v[1] : '')
            let colorSlug = v[0].substring(colorVarStart.length);

            for (let color of colors) {
                // perfect match                
                if (colorSlug === color.slug) {
                    return color.color;                    
                }

                // without alpha match
                if (colorSlug === color.slug+'@') {
                    return color.color.substring(0, 7) + alphaValue;
                }
            }
        }

        return v.join(colorVarEnd);
    }).join(' ')
}




/**
 * @hack WordPress doesn't let us save value from the BorderBoxControl as we want
 * so we have to use Deep Copy
 */
export function dragBlockMatchingBorderColors({ value, colors }) {
    if (!value) return value;

    let newValue = new Object();

    if ('top' in value) {
        for (let side in value) {
            if (typeof (value[side]) != 'object') continue;

            newValue[side] = new Object();
            newValue[side]['width'] = value[side]['width'];
            newValue[side]['style'] = value[side]['style'];
            newValue[side]['color'] = dragBlockMatchingColors({ value: value[side]['color'], colors });
        }
    }
    // flat border
    else {
        newValue['color'] = dragBlockMatchingColors({ value: value['color'], colors });
        newValue['width'] = value['width'];
        newValue['style'] = value['style'];
    }

    return newValue;
}

/**
 * 
 * @param {Object} value This is the string saved in the attributes
 * @returns 
 */
export function dragBlockUnmatchingBorderColors({ value, colors }) {
    if (!value) return value;

    let newValue = new Object();

    if ('top' in value) {
        for (let side in value) {
            if (typeof (value[side]) != 'object') continue;

            newValue[side] = new Object();
            newValue[side]['width'] = value[side]['width'];
            newValue[side]['style'] = value[side]['style'];
            newValue[side]['color'] = dragBlockUnmatchingColors({ value: value[side]['color'], colors });
        }
    }
    // flat border
    else {
        newValue['color'] = dragBlockUnmatchingColors({ value: value['color'], colors });
        newValue['width'] = value['width'];
        newValue['style'] = value['style'];
    }

    return newValue;
}
export function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }


    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    

    return '#' + padZero(r) + padZero(g) + padZero(b);
}



/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function dragBlockShadowValue({ inset, x, y, blur, spread, color }) {
    let value = (inset ? 'inset' : '');
    value += (value ? ' ' : '') + x + (y ? ' ' + y : '') + (blur ? ' ' + blur : '')
        + (spread ? ' ' + spread : '') + (color ? ' ' + color : '');
    return value;
}

function padZero(str) {
    if (str.len < 2) return '0' + str
    return str;
}

