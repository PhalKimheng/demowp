import './style.css';
import save from './save';
import defaultAttr from './defaultAttr.json';
import { registerBlockType } from '@wordpress/blocks';
import edit from "./edit";

registerBlockType('rachana-block/table', {
    attributes: {
        table: {
            type: 'object',
            default: defaultAttr,
        },
    },
    edit,
    save,
});
