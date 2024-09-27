import { PanelBody, TextareaControl, TextControl } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

const edit = ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  const { mark_text, toggle_panel, key, playlist_id, data_playlist } =
    attributes;

  if (!data_playlist.length && key != "" && playlist_id != "") {
    let url =
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&key=" +
      key +
      "&playlistId=" +
      playlist_id;
    const xhttp_request = new XMLHttpRequest();
    xhttp_request.open("GET", url);
    xhttp_request.send();
    xhttp_request.onreadystatechange = (e) => {
      if (xhttp_request.readyState == 4) {
        const items = JSON.parse(xhttp_request.responseText).items;
        const data = [];
        for (const key in items) {
          if (Object.hasOwnProperty.call(items, key)) {
            const element = items[key];
            if (element.snippet.thumbnails.standard) {
              data.push({
                id: element.snippet.resourceId.videoId,
                title: element.snippet.title,
                description: element.snippet.description,
                src:
                  "https://www.youtube.com/embed/" +
                  element.snippet.resourceId.videoId +
                  "?autoplay=0",
                thumbnail: element.snippet.thumbnails.standard.url,
              });
            }
          }
        }
        if (data.length) {
          setAttributes({ data_playlist: data });
        }
      }
    };
  }
  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody>
          <TextControl
            label={"Mark Text"}
            value={mark_text}
            onChange={(value) => setAttributes({ mark_text: value })}
          />
        </PanelBody>
        <PanelBody
          title="Block Options"
          initialOpen={toggle_panel}
          onToggle={() => {
            setAttributes({ toggle_panel: !toggle_panel });
          }}
        >
          <TextareaControl
            label="Key"
            value={key}
            onChange={(val) => {
              setAttributes({ key: val, data_playlist: {} });
            }}
          />
          <TextareaControl
            label="Playlist"
            value={playlist_id}
            onChange={(val) => {
              setAttributes({ playlist_id: val, data_playlist: {} });
            }}
          />
        </PanelBody>
      </InspectorControls>

      <div className={"border p-3"}>
        <small>{mark_text}</small>
      </div>
    </div>
  );
};

export default edit;
