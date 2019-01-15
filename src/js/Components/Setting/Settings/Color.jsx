import l, { Span } from "../../../utils";
import withLocalValue from "./_withLocalValue";
import tinycolor from "tinycolor2";

const { isUndefined } = lodash;
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	ColorPalette,
	BaseControl,
	ColorIndicator,
	RangeControl
} = wp.components;
const { withState, compose } = wp.compose;

class Color extends Component {
	componentDidMount = () => {
		const { setState, value, alpha_control } = this.props;

		const color_tiny = tinycolor(value);

		if (!color_tiny.isValid()) {
			return;
		}

		const alpha = alpha_control ? color_tiny.getAlpha() * 100 : 100;
		const color = color_tiny.toHexString();

		setState({ alpha: alpha, color: color });
	};

	getColorWithAlpha = () => {
		const { color, alpha_control, alpha } = this.props;
		let color_with_alpha = color;

		if (alpha_control) {
			const color_tiny = tinycolor(color);
			color_with_alpha = color_tiny.isValid()
				? color_tiny.setAlpha(alpha / 100).toRgbString()
				: "";
		}

		return color_with_alpha;
	};

	updateAlpha = alpha => {
		const { getColorWithAlpha, props } = this;
		const { setState, updateValueLocal } = props;

		setState({ alpha: alpha }, () => {
			const color_with_alpha = getColorWithAlpha();
			updateValueLocal(color_with_alpha);
		});
	};

	updateColor = color => {
		const { getColorWithAlpha, props } = this;
		const { setState, updateValueLocal } = props;
		color = isUndefined(color) ? "" : color;

		setState({ color: color }, () => {
			const color_with_alpha = getColorWithAlpha();
			updateValueLocal(color_with_alpha);
		});
	};

	render() {
		const { updateColor, updateAlpha, props } = this;
		const {
			value_local,
			color,
			alpha,
			palette,
			alpha_control,
			label,
			help
		} = props;

		return (
			<BaseControl
				label={
					<Fragment>
						<Span>{label}</Span>
						<ColorIndicator colorValue={value_local} />
					</Fragment>
				}
				help={help}
			>
				<ColorPalette
					colors={palette}
					value={color}
					onChange={updateColor}
				/>
				{alpha_control && (
					<RangeControl
						label={__("Color opacity")}
						value={alpha}
						step={1}
						min={0}
						max={100}
						onChange={updateAlpha}
					/>
				)}
			</BaseControl>
		);
	}
}

export default compose([withState({ color: "", alpha: 100 }), withLocalValue])(
	Color
);
