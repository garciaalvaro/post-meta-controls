import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";
import ColorPaletteClone from "./ColorPaletteClone";

const { Component } = wp.element;
const { ColorPalette } = wp.components;

class Color extends Component {
	render() {
		const { updateValue, value, palette, alpha } = this.props;

		if (alpha) {
			return (
				<ColorPaletteClone
					colors={palette}
					value={value}
					updateValue={updateValue}
				/>
			);
		}

		return (
			<ColorPalette
				colors={palette}
				value={value}
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(Color);
