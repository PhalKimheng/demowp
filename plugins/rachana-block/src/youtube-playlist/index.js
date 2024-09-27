import { registerBlockType } from "@wordpress/blocks";
import "./style.css";
import edit from "./edit";
import save from "./save";

registerBlockType("rachana-block/youtube-playlist", {
  attributes: {
    mark_text: {
      type: "string",
      default: "Youtube Playlist",
    },
    toggle_panel: {
      type: "boolean",
      default: false,
    },
    key: {
      type: "string",
      default: "",
    },
    playlist_id: {
      type: "string",
      default: "",
    },
    data_playlist: {
      type: "array",
      default: [],
    },
  },
  edit,
  save,
});
