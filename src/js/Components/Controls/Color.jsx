import l, { Span, plugin_slug } from "../../utils";
import tinycolor from "tinycolor2";

const { throttle } = lodash;
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
			setState({ color_with_alpha: color_meta });
			return;
		}

		const alpha = color_meta_tiny.getAlpha() * 100;
		const color = color_meta_tiny.toHexString();

		setState({ alpha: alpha, color: color, color_with_alpha: color_meta });
	};

	// Throttle the meta update.
	updateValueThrottled = throttle(
		color_with_alpha => {
			const { updateValue } = this.props;

			updateValue(color_with_alpha);
		},
		2000,
		{
			leading: true,
			trailing: true
		}
	);

	updateColorWithAlpha = () => {
		const { updateValueThrottled, props } = this;
		const { setState, color, alpha_control, alpha } = props;
		let color_with_alpha = color;

		if (alpha_control) {
			color_with_alpha = tinycolor(color)
				.setAlpha(alpha / 100)
				.toRgbString();
		}

		setState({ color_with_alpha: color_with_alpha }, () =>
			updateValueThrottled(color_with_alpha)
		);
	};

	updateAlpha = alpha => {
		const { updateColorWithAlpha, props } = this;
		const { setState } = props;

		setState({ alpha: alpha }, updateColorWithAlpha);
	};

	updateColor = color => {
		const { updateColorWithAlpha, props } = this;
		const { setState } = props;

		setState({ color: color }, updateColorWithAlpha);
	};

	render() {
		const { updateColor, updateAlpha, props } = this;
		const {
			color_with_alpha,
			color,
			alpha,
			palette,
			alpha_control,
			label
		} = props;

		return (
			<BaseControl
				label={
					<Fragment>
						<Span>{label}</Span>
						<ColorIndicator colorValue={color_with_alpha} />
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

export default withState({ color_with_alpha: "", color: "", alpha: 100 })(
	Color
);
