import { useBlockProps } from "@wordpress/block-editor";
import { getRelativeTime, isHorizontalStyle } from "../blockHelpers";
import { PersonIcon, TimeIcon } from "../../assets/img/icons/Icons";

const save = ({ attributes }) => {
  const {
    date,
    newTab,
    border,
    padding,
    btnColor,
    style,
    contentColor,
    titleColor,
    bgColor,
    showAuthorAndTime,
    showImage,
    sizeAuto,
    imageUrl,
    imageWidth,
    title,
    content,
    showRouteButton,
    linkText,
    href,
    displayContent,
    author,
    imageAspectRatio,
  } = attributes;

  const blockProps = useBlockProps.save({
    className:  sizeAuto ? 'size-auto' : ""
  });

  return (
    <div {...blockProps}>
      <div className={`padding-${padding}`}>
        <div className={`cgds card base ${style} border-${border}`}>
        {showImage && imageUrl && (
          <div
            className={`img-container ratio ${imageAspectRatio || ""}`}
            style={isHorizontalStyle(style) && { flex: `0 1 ${imageWidth}%` }}
          >
            <img
              className={
                isHorizontalStyle(style) ? "card-img-left" : "card-img-top"
              }
              src={imageUrl}
              alt="Card Image"
            />
          </div>
        )}
        <div
          className="card-body"
          style={{
            background: bgColor,
            ...(isHorizontalStyle(style) && {
              flex: `0 1 ${100 - imageWidth}%`,
            }),
          }}
        >
          {showAuthorAndTime && (
            <div className="author-time">
              <TimeIcon color="var(--cgds-gray-500)" />
              <time className="text-muted"> {getRelativeTime(date)} </time>
              <PersonIcon color="var(--cgds-gray-500)" />
              <small className="text-muted card-text-muted"> {author}</small>
            </div>
          )}
          <div className="content">
            <p
              className="stretched-link card-title"
              style={{ color: titleColor }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
            {displayContent && (
              <p
                className="card-text mt-0"
                style={{ color: contentColor }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
          {linkText && showRouteButton && (
            <div className="route-icon">
              <a
                className="card-link"
                href={href}
                style={{ color: btnColor }}
                target={newTab ? "_blank" : "_self"}
                rel={newTab ? "noopener noreferrer" : ""}
              >
                <i className="bi bi-arrow-right-circle-fill"></i>
                <span dangerouslySetInnerHTML={{ __html: linkText }} />
              </a>
            </div>
          )}
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default save;
