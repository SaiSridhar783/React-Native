import * as React from "react";
import { Button, FlatList } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { useReduxSelector } from "../../store/store";

interface IUserProductsScreenProps {}

const UserProductsScreen: React.FC<IUserProductsScreenProps> = (props) => {
	const userProducts = useReduxSelector(
		(state) => state.product.userProducts
	);

	return (
		<FlatList
			data={userProducts}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					price={itemData.item.price}
					image={itemData.item.imageUrl}
					onSelect={() => {}}
				>
					<Button
						color={Colors.primary}
						title="Edit"
						onPress={() => {}}
					/>
					<Button
						color={Colors.primary}
						title="Delete"
						onPress={() => {}}
					/>
				</ProductItem>
			)}
		/>
	);
};

export default UserProductsScreen;
