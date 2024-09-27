import { useBlockProps } from "@wordpress/block-editor";
import { TimeIcon, PersonIcon } from "../../assets/img/icons/Icons";
import { getRelativeTime } from "../blockHelpers";

const save = ({ attributes, includeImage }) => {
  const { posts, id, categoryName } = attributes;
  const blockProps = useBlockProps.save();
  const blockId = `postCarousel-${id}`;

  const renderPostContent = (post) => {
    return (
      <div key={post.id} className="p-2">
        <div className="cgds card size-auto">
          {includeImage && post.imageLink && (
            <div className="card-img-top ratio ratio-4x3">
              <img
                className="img-fluid"
                src={post.imageLink}
                alt="Post Image"
              />
            </div>
          )}
          <div className="card-body">
            <div className="card-meta">
              <TimeIcon color="var(--cgds-gray-500)" />
              <small className="text-muted">
                {" "}
                {getRelativeTime(post.date)}{" "}
              </small>
              <PersonIcon color="var(--cgds-gray-500)" />
              <small className="text-muted"> {post.author}</small>
            </div>
            <div
              className="card-title"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></div>
            <a className="card-link blog-btn color-100" href={post.link}>
              <i className="bi bi-arrow-right-circle-fill"></i>
              ចុចអានបន្ថែម
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div {...blockProps} className="cgds news news-block carousel slide">
      <div className="w block-title text-left mb-1 mb-sm-2 mb-md-3 mb-lg-4">
        <h2>{categoryName}</h2>
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
                                "slidesToShow": 1,
                                "slidesToScroll": 1
                            }
                        }
                    ]
                }'
      >
        {posts.map((post) => renderPostContent(post))}
      </div>
    </div>
  );
};

export default save;
