import React from "react";
import tinycolor from "tinycolor2";
import { isUndefined } from "lodash";
import { __ } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import {
	ColorPalette,
	BaseControl,
	ColorIndicator,
	RangeControl,
} from "@wordpress/components";
import { withState } from "@wordpress/compose";

import "./Color.styl";
import { Span } from "utils/Components";

interface WithStateProps {
	setState: SetState<{ alpha: number; color: string }>;
	color: string;
	alpha: number;
}

interface OwnProps extends ColorProps, SettingPropsShared {
	updateValue: (value: string) => void;
	value: ColorProps["default_value"];
}

interface Props extends WithStateProps, OwnProps {}

export const Color = withState({ color: "", alpha: 100 })(
	class extends Component<Props> {
		componentDidMount() {
			const { setState, value, alpha_control } = this.props;

			const color_tiny = tinycolor(value);

			if (!color_tiny.isValid()) {
				return;
			}

			const alpha = alpha_control ? color_tiny.getAlpha() * 100 : 100;
			const color = color_tiny.toHexString();

			setState({ alpha, color });
		}

		render() {
			const {
				updateValue,
				id,
				color,
				alpha,
				palette,
				alpha_control,
				label,
				help,
				value,
				setState,
			} = this.props;

			return (
				<BaseControl
					id={id}
					label={
						<Fragment>
							<Span>{label}</Span>
							<ColorIndicator colorValue={value} />
						</Fragment>
					}
					help={help}
				>
					<ColorPalette
						colors={palette}
						// @ts-expect-error TODO: The type should be string? Confirm.
						value={value}
						// @ts-expect-error TODO: The type should be string? Confirm.
						onChange={(color?: string) => {
							color = color || "";

							setState({ color });

							if (alpha_control) {
								const color_tiny = tinycolor(color);

								updateValue(
									color_tiny.isValid()
										? color_tiny
												.setAlpha(alpha / 100)
												.toRgbString()
										: ""
								);
							} else {
								updateValue(color);
							}
						}}
					/>

					{alpha_control && (
						<RangeControl
							label={__("Color opacity")}
							value={alpha}
							step={1}
							min={0}
							max={100}
							onChange={alpha => {
								alpha = isUndefined(alpha) ? 100 : alpha;

								setState({ alpha });

								const color_tiny = tinycolor(color);

								updateValue(
									color_tiny.isValid()
										? color_tiny
												.setAlpha(alpha / 100)
												.toRgbString()
										: ""
								);
							}}
						/>
					)}
				</BaseControl>
			);
		}
	}
);
