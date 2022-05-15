import ContentLoader from "react-content-loader"

type Props = {}

const ProductsLoader = (props: Props) => {
    return (
        <ContentLoader
            speed={2}
            width={210}
            height={260}
            viewBox="0 0 210 260"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="571" cy="231" r="20" />
            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
            <rect x="0" y="100" rx="10" ry="10" width="150" height="16" />
            <rect x="0" y="125" rx="10" ry="10" width="93" height="15" />
            <rect x="0" y="152" rx="11" ry="11" width="80" height="24" />
            <rect x="115" y="144" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
    )
}

export default ProductsLoader