import DOMPurify from "dompurify";
import { RawHTML, Component } from "@wordpress/element";
import { Toolbar, BaseControl } from "@wordpress/components";
import { withState } from "@wordpress/compose";

import "./Buttons.styl";

interface WithStateProps {
	setState: Function;
	icons: React.ReactNode[];
}

interface OwnProps extends ButtonsProps, SettingPropsShared {
	updateValue: (value: any) => void;
	value: ButtonsProps["default_value"];
}

interface Props extends OwnProps, WithStateProps {}

export const Buttons: React.ComponentType<OwnProps> = withState({
	icons: null
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
				)
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
				icons
			} = this.props;

			if (!icons) {
				return null;
			}

			return (
				<BaseControl id={id} label={label} help={help}>
					<Toolbar
						// @ts-ignore. Toolbar icon admits passing a component
						// although the definition file indicates only string
						controls={options.map(({ title, value: option_value }, index) => ({
							icon: icons[index],
							title: title,
							isActive: option_value === value,
							onClick: () => {
								if (allow_empty && option_value === value) {
									updateValue("");
								} else {
									updateValue(option_value);
								}
							}
						}))}
					/>
				</BaseControl>
			);
		}
	}
);
