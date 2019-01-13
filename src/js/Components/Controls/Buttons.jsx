import l, { plugin_slug } from "../../utils";

import DOMPurify from "dompurify";

const { Component, RawHTML } = wp.element;
const { Toolbar, BaseControl } = wp.components;

class Buttons extends Component {
	render() {
		const {
			label,
			help,
			options,
			value,
			allow_empty,
			updateValue,
			classes
		} = this.props;
		const options_prepared = options.map(option => ({
			icon: option.icon_svg ? (
				<RawHTML>{DOMPurify.sanitize(option.icon_svg)}</RawHTML>
			) : (
				option.icon_dashicon
			),
			title: option.title,
			isActive: option.value === value,
			onClick: () => {
				if (allow_empty && option.value === value) {
					updateValue("");
				} else {
					updateValue(option.value);
				}
			}
		}));

		return (
			<BaseControl className={classes} label={label} help={help}>
				<Toolbar controls={options_prepared} />
			</BaseControl>
		);
	}
}

export default Buttons;
