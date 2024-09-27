import { useBlockProps } from "@wordpress/block-editor";
import { TimeIcon, PersonIcon, ChevronRight } from "../../assets/img/icons/Icons";

export const save = ({ attributes: { posts, displayCategoryButtons, displayTimeAndAuthor, id } }) => {
    const blockProps = useBlockProps.save();
    const blockId = `postCarousel-${id}`;

    return (
        <div {...blockProps} id={blockId} className="carousel cgds slide" data-ride="carousel" data-interval="3000" data-pause="hover">
            <div className="carousel-inner">
                {posts.map((post, index) => (
                    <div key={post.key} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <div className="cgds card card-horizontal">
                            {post.imageLink && <img className="card-img-left" src={post.imageLink} alt="Post Image" />}
                            <div className="card-body d-flex flex-column card-body-custom">
                                <div className="d-flex flex-column content-div">
                                    <div className="d-flex author-time-div">
                                        <div className="author-time w-100">
                                            {displayTimeAndAuthor && (
                                                <p className="card-text">
                                                    <TimeIcon />
                                                    <small className="text-muted card-text-muted">{" "}{post.date}{" "}|{" "}</small>
                                                    <PersonIcon />
                                                    <small className="text-muted card-text-muted">{" "}{post.author}</small>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex title-div">
                                        <div className="card-title w-100">
                                            <a href={post.link} className="link-primary h3 card-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></a>
                                        </div>
                                    </div>
                                    <div className="d-flex category-div">
                                        <div className="category-btn-wrapper w-100">
                                            {displayCategoryButtons && post.categories.length > 0 && (
                                                post.categories.map((category) => (
                                                    <a key={category.key} role="button" href={category.link}
                                                       className="cgds btn btn-sm btn-primary category-link color-900">
                                                        {category.name}
                                                    </a>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex button-div">
                                    <div className="button-wrapper w-100">
                                        <a className="card-link blog-btn btn-slide" href={post.link}>
                                            <i className="bi bi-arrow-right-circle-fill"></i>
                                            ចុចអានបន្ថែម
                                        </a>
                                    </div>
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
                {posts.map((post, index) => (
                    <li key={post.key} data-target={`#${blockId}`} data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                ))}
            </ol>
        </div>
    );
};

export default save;