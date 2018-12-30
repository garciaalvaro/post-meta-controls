import l from "../../utils";
import Div from "../Utils";
import ColorPickerWithAlpha from "./ColorPickerWithAlpha";

const { map, compact } = lodash;
const { Component } = wp.element;
const { __, sprintf } = wp.i18n;
const { Button, Dropdown, Tooltip } = wp.components;
const custom_colorpicker_label = __("Custom color picker");

class ColorPalette extends Component {
	render() {
		const { colors, value, updateValue } = this.props;

		return (
			<Div className={"components-color-palette"}>
				{map(colors, ({ color, name }) => {
					let item_classes;
					item_classes = [
						"components-color-palette__item",
						value === color ? "is-active" : ""
					];
					item_classes = compact(item_classes);
					item_classes = item_classes.join(" ");

					return (
						<Div
							key={color}
							className="components-color-palette__item-wrapper"
						>
							<Tooltip
								text={
									name ||
									// translators: %s: color hex code e.g: "#f00".
									sprintf(__("Color code: %s"), color)
								}
							>
								<Button
									type="button"
									className={item_classes}
									style={{ color: color }}
									onClick={color => {
										color = value === color ? "" : color;
										updateValue(color);
									}}
									aria-label={
										name
											? // translators: %s: The name of the color e.g: "vivid red".
											  sprintf(__("Color: %s"), name)
											: // translators: %s: color hex code e.g: "#f00".
											  sprintf(
													__("Color code: %s"),
													color
											  )
									}
									aria-pressed={value === color}
								/>
							</Tooltip>
						</Div>
					);
				})}
				<Dropdown
					className="components-color-palette__item-wrapper components-color-palette__custom-color"
					contentClassName="components-color-palette__picker"
					renderToggle={({ isOpen, onToggle }) => (
						<Tooltip text={custom_colorpicker_label}>
							<Button
								type="button"
								aria-expanded={isOpen}
								className="components-color-palette__item"
								onClick={onToggle}
								aria-label={custom_colorpicker_label}
							>
								<span className="components-color-palette__custom-color-gradient" />
							</Button>
						</Tooltip>
					)}
					renderContent={() => (
						<ColorPickerWithAlpha
							value={value}
							updateValue={updateValue}
						/>
					)}
				/>
				<Button
					className="components-color-palette__clear"
					type="button"
					onClick={() => updateValue("")}
					isSmall
					isDefault
				>
					{__("Clear")}
				</Button>
			</Div>
		);
	}
}

export default ColorPalette;
