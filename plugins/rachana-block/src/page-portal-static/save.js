import { useBlockProps } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const blockProps = useBlockProps.save();
    return (
        <div {...blockProps} className="page-portal">
            {attributes.cards.map((card, index) => (
                <div key={index} className="card cgds">
                    <a className="col d-flex align-items-center justify-content-center card-img-top" href={card.url}>
                        <i className={`bi bi-${card.icon}`}></i>
                    </a>
                    <div className="card-body">
                        <a href={card.url}>
                            <div className="icon-text">{card.text}</div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default save;