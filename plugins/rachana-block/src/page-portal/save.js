import { useBlockProps } from "@wordpress/block-editor";
import {
  BusinessIcon,
  CameraIcon,
  NewsIcon,
  OrganizationIcon,
  FamilyIcon,
  ChevronRight,
} from "../../assets/img/icons/Icons";

const siteName = new URL(String(window.location)).hostname.split(".")[0];
const tourismUrl = `https://demo.cambodia.gov.kh/tourism-location/${siteName}-km/`;

const cardData = [
  { id: "citizen", icon: FamilyIcon, url: "/citizen-km", text: "ប្រជាពលរដ្ឋ" },
  {
    id: "business",
    icon: BusinessIcon,
    url: "/business-km",
    text: "អាជីវកម្ម",
  },
  { id: "tourism", icon: CameraIcon, url: tourismUrl, text: "អ្នកទេសចរណ៍" },
  {
    id: "subnational",
    icon: OrganizationIcon,
    url: "/organization_type/organizations",
    text: "ព័ត៌មានមន្ទីរ-អង្គភាព",
  },
  {
    id: "news",
    icon: NewsIcon,
    url: "/ក្របខ័ណ្ឌអភិវឌ្ឍន៍ខេត្",
    text: "គម្រោងអភិវឌ្ឍន៍",
  },
];

const Card = ({ icon: Icon, url, text }) => (
  <div className="card cgds">
    <a
      className="card-icon-conrtainer"
      href={typeof url === "function" ? url() : url}
    >
      <Icon />
    </a>

    <div className="card-body">
      <a href={typeof url === "function" ? url() : url}>
        <div className="icon-text">{text}</div>
      </a>
    </div>
  </div>
);

const save = () => {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps} className="page-portal">
      {" "}
      <div
        className="slick-slider"
        data-slick='{
        "slidesToShow": 5,
        "slidesToScroll": 5,
        "dots": false,
        "autoplay": true,
        "autoplaySpeed": 8000,
        "responsive": [
          {
              "breakpoint": 768,
              "settings": {
                  "slidesToShow": 3,
                  "slidesToScroll": 3
              }

          }

        ]
      }'
      >
        {cardData.map((card) => (
          <div key={card.id}>
            <Card {...card} />
          </div>
        ))}
      </div>
      <button className="slick-prev">
        <i className="bi bi-chevron-left"></i>
      </button>
      <button className="slick-next">
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default save;
