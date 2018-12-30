import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";
import DOMPurify from "dompurify";

const { Component, RawHTML } = wp.element;
const { Toolbar } = wp.components;

class Buttons extends Component {
	render() {
		const { options, value, updateValue } = this.props;
		const options_clean = options.map(option => ({
			icon: option.icon_svg ? (
				<RawHTML>{DOMPurify.sanitize(option.icon_svg)}</RawHTML>
			) : (
				option.icon_dashicon
			),
			title: option.title,
			isActive: option.value === value,
			onClick: () => updateValue(option.value)
		}));

		return (
			<Toolbar
				className={`${plugin_slug}-control-buttons`}
				controls={options_clean}
			/>
		);
	}
}

export default withStoreConnection(Buttons);
