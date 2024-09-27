import save from './save';
import { registerBlockType } from '@wordpress/blocks';
import edit from "./edit";

registerBlockType('rachana-block/table-structure', {
    attributes: {
        members: {
            type: "array",
            default: []
        }
    },
    edit,
    save,
});
