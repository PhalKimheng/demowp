import defaultAttr from './defaultAttr.json';
import {registerBlockType} from "@wordpress/blocks";
import edit from "./edit";
import save from "./save";

registerBlockType('rachana-block/slide-show', {
    parent: ["rachana-block/carousel-blocks"],
    attributes: {
        slides: {
            type: 'array',
            default: [{ ...defaultAttr }]
        }
    },
    edit,
    save,
});