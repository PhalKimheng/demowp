import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import defaultAttr from './defaultAttr.json';

registerBlockType('rachana-block/column', {
    parent: ["rachana-block/row"],
    attributes: defaultAttr,
    edit,
    save,
});