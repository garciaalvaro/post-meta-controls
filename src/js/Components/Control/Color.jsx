import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";
import ColorPalette from "./ColorPaletteClone";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;

class Color extends Component {
	render() {
		const {
			options,
			label,
			help,
			value,
			updateString,
			updateArrayString,
			multiple,
			setState,
			color
		} = this.props;
		const colors = [
			{ name: "red", color: "#f00" },
			{ name: "white", color: "#fff" },
			{ name: "blue", color: "#00f" }
		];

		return (
			<ColorPalette
				colors={colors}
				value={color}
				onChange={color => setState({ color })}
			/>
		);
	}
}

export default compose([
	withState({
		color: "#f00"
	}),
	withStoreConnection
])(Color);
