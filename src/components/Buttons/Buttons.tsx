import React from "react";
import DOMPurify from "dompurify";
import { RawHTML, Component } from "@wordpress/element";
import { Toolbar, BaseControl, ToolbarButton } from "@wordpress/components";
import { withState } from "@wordpress/compose";

import "./Buttons.styl";

interface WithStateProps {
	setState: SetState<{ icons: (string | JSX.Element)[] }>;
	icons: React.ReactNode[];
}

interface OwnProps extends ButtonsProps, SettingPropsShared {
	updateValue: (value: string) => void;
	value: ButtonsProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

export const Buttons: React.ComponentType<OwnProps> = withState({
	icons: null,
})(
	class extends Component<Props> {
		componentDidMount() {
			const { options, setState } = this.props;

			setState({
				icons: options.map(({ icon_svg, icon_dashicon }) =>
					icon_svg ? (
						<RawHTML>{DOMPurify.sanitize(icon_svg)}</RawHTML>
					) : (
						icon_dashicon
					)
				),
			});
		}

		render() {
			const {
				id,
				label,
				help,
				options,
				value,
				allow_empty,
				updateValue,
				icons,
			} = this.props;

			if (!icons) {
				return null;
			}

			const controls = options.map<ToolbarButton.Props>(
				({ title, value: option_value }, index) => ({
					// @ts-expect-error TODO
					icon: icons[index],
					label: title,
					isActive: option_value === value,
					onClick: () => {
						if (allow_empty && option_value === value) {
							updateValue("");
						} else {
							updateValue(option_value);
						}
					},
				})
			);

			return (
				<BaseControl id={id} label={label} help={help}>
					<Toolbar controls={controls} />
				</BaseControl>
			);
		}
	}
);
