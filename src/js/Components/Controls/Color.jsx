import l, { Span, plugin_slug } from "../../utils";
import tinycolor from "tinycolor2";

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
	ColorPalette,
	BaseControl,
	ColorIndicator,
	RangeControl
} = wp.components;
const { withState } = wp.compose;

class Color extends Component {
	componentDidMount = () => {
		const { setState, value: color_meta } = this.props;

		const color_meta_tiny = tinycolor(color_meta);

		if (!color_meta_tiny.isValid()) {
			return;
		}

		const alpha = color_meta_tiny.getAlpha() * 100;
		const color = color_meta_tiny.toHexString();

		setState({ alpha: alpha, color: color });
	};

	updateColorMeta = () => {
		const { color, alpha_control, alpha, updateValue } = this.props;
		let color_meta = color;

		if (alpha_control) {
			color_meta = tinycolor(color)
				.setAlpha(alpha / 100)
				.toRgbString();
		}

		updateValue(color_meta);
	};

	updateAlpha = alpha => {
		const { updateColorMeta, props } = this;
		const { setState } = props;

		setState({ alpha: alpha }, updateColorMeta);
	};

	updateColor = color => {
		const { updateColorMeta, props } = this;
		const { setState } = props;

		setState({ color: color }, updateColorMeta);
	};

	render() {
		const { updateColor, updateAlpha, props } = this;
		const { value, color, alpha, palette, alpha_control, label } = props;

		return (
			<BaseControl
				label={
					<Fragment>
						<Span>{label}</Span>
						<ColorIndicator colorValue={value} />
					</Fragment>
				}
				className={[
					`${plugin_slug}-background_color`,
					`${plugin_slug}-control`,
					`${plugin_slug}-control-colorpalette`
				].join(" ")}
			>
				<ColorPalette
					className={`${plugin_slug}-control-color`}
					colors={palette}
					value={color}
					onChange={updateColor}
				/>
				{alpha_control && (
					<RangeControl
						label={__("Color opacity")}
						className={`${plugin_slug}-control-range`}
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

export default withState({ color: "", alpha: 100 })(Color);
