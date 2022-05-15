
import Commercial from "../components/common/Commercial"
import Products from "../components/Products/Products"
type Props = {}


const ItemsPage = (props: Props) => {
    return (
        <div>
            <Commercial />
            <Products />
        </div>
    )
}

export default ItemsPage