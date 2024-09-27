import './style.css';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';

registerBlockType('rachana-block/page-portal-static', {
    attributes: {
        cards: {
            type: "array",
            default: []
        }
    },
    edit,
    save,
});