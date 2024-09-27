import { useBlockProps } from "@wordpress/block-editor";

export const save = ({ attributes }) => {
  const { data_playlist } = attributes;
  const blockProps = useBlockProps.save();
  const videoSrc = data_playlist?.[0]?.src ?? "";

  const renderVideoContent = (video) => {
    return (
      <div key={video.id} className="p-2">
        <div className="cgds card size-auto">
          <div
            className={`video-playlist-item ${
              video.thumbnail ? "image" : "imageless"
            } ${videoSrc == video.src ? "active" : ""}`}
            onclick={
              "document.getElementById('video-playlist').src='" +
              video.src +
              "'"
            }
            style="cursor:pointer;"
            data-video-src={video.src || ""}
          >
            {video.thumbnail && (
              <div className="card-img-top ratio ratio-16x9">
                <img
                  className="img-fluid"
                  style={"object-fit: cover;"}
                  src={video.thumbnail}
                  alt="Post Image"
                />
              </div>
            )}
            <div className="card-body">
              <div className="video-card-title">{video.title}</div>
              <a className="card-link blog-btn color-100">
                <i className="bi bi-play-circle-fill"></i>
                ចុចមើលវីដេអូ
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div {...blockProps} className="cgds news news-block carousel slide">
      <div className="ratio ratio-16x9 mb-2 mb-md-3">
        <iframe
          id="video-playlist"
          src={videoSrc}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <div
        className="slick-slider-pagination"
        data-slick='{
                      "slidesToShow": 3,
                      "slidesToScroll": 3,
                      "dots": true,
                      "responsive": [
                          {
                              "breakpoint": 768,
                              "settings": {
                                  "slidesToShow": 2,
                                  "slidesToScroll": 2
                              }
                          }
                      ]
                  }'
      >
        {data_playlist.map((video) => renderVideoContent(video))}
      </div>
    </div>
  );
};
export default save;
