import { useBlockProps } from "@wordpress/block-editor";
import { TimeIcon, PersonIcon, ChevronRight } from "../../assets/img/icons/Icons";

export const save = ({ attributes: { slides } }) => {
    const blockProps = useBlockProps.save();
    const blockId = `postCarousel-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <div {...blockProps} id={blockId} className="carousel cgds slide" data-ride="carousel" data-interval="3000" data-pause="hover">
            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="cgds card card-horizontal">
                            {slide.slideImage && <img className="card-img-left" src={slide.slideImage} alt="Post Image" />}
                            <div className="card-body d-flex flex-column card-body-custom">
                                <div className="d-flex flex-column content-div">
                                    <div className="d-flex author-time-div">
                                        <div className="author-time w-100">
                                            {(slide.showAuthor || slide.showDate) && (
                                                <p className="card-text">
                                                    {slide.showDate && slide.postDate && (
                                                        <>
                                                            <TimeIcon />
                                                            <small className="text-muted card-text-muted">{" "}{slide.postDate}</small>
                                                        </>
                                                    )}
                                                    {slide.showAuthor && slide.showDate && slide.postAuthor && slide.postDate && " | "}
                                                    {slide.showAuthor && slide.postAuthor && (
                                                        <>
                                                            <PersonIcon />
                                                            <small className="text-muted card-text-muted">{" "}{slide.postAuthor}</small>
                                                        </>
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex title-div">
                                        <div className="card-title w-100">
                                            <a href={slide.slideLink} className="link-primary h3 card-title" dangerouslySetInnerHTML={{ __html: slide.slideTitle }}></a>
                                        </div>
                                    </div>
                                    <div className="d-flex category-div">
                                        <div className="category-btn-wrapper w-100">
                                            {slide.showCategoryBtn && slide.categories.length > 0 && (
                                                slide.categories.map((category, catIndex) => (
                                                    <a key={catIndex} href={category.link} className="cgds btn btn-sm btn-primary category-link color-900" role="button">
                                                        {category.name}
                                                    </a>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex button-div">
                                    {slide.showReadMoreBtn && (
                                        <div className="button-wrapper w-100">
                                            <a className="card-link blog-btn btn-slide" href={slide.slideLink}>
                                                <i className="bi bi-arrow-right-circle-fill"></i>
                                                {slide.readMoreText}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <a className="carousel-control-prev" href={`#${blockId}`} role="button" data-slide="prev">
                <ChevronRight className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a className="carousel-control-next" href={`#${blockId}`} role="button" data-slide="next">
                <ChevronRight className="carousel-control-next-icon" aria-hidden="true" />
            </a>
            <ol className="carousel-indicators">
                {slides.map((slide, index) => (
                    <li key={index} data-target={`#${blockId}`} data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                ))}
            </ol>
        </div>
    );
};

export default save;
