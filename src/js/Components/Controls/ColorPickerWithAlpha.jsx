import l, { DivForwardRef } from "../../utils";
import withStoreConnection from "./_withStoreConnection";
import * as AColorPicker from "a-color-picker";

const { isNil } = lodash;
const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component, createRef } = wp.element;

const colorpicker_options = {
	showHSL: false,
	showRGB: true,
	showHEX: true,
	showAlpha: true,
	color: ""
	// attachTo
	// palette
	// paletteEditable
	// useAlphaInPalett
};

class ColorPickerWithAlpha extends Component {
	constructor(props) {
		super(props);

		this.colorpicker_div = createRef();
		this.colorpicker_instance = null;
	}

	componentDidMount = () => {
		if (isNil(this.colorpicker_div.current)) {
			return;
		}

		const { updateValue, value } = this.props;

		this.colorpicker_instance = AColorPicker.from(
			this.colorpicker_div.current,
			{
				...colorpicker_options,
				color: value
			}
		).on("change", (picker, color) => updateValue(color));
	};

	render() {
		return (
			<DivForwardRef ref={this.colorpicker_div}>cccolor</DivForwardRef>
		);
	}
}

export default withStoreConnection(ColorPickerWithAlpha);
