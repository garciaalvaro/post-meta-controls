import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";
import DOMPurify from "dompurify";

const { Component, RawHTML } = wp.element;
const { Toolbar } = wp.components;

class MyToolbar extends Component {
	render() {
		const { buttons, value, updateValue, multiple } = this.props;
		const buttons_clean = buttons.map(button => ({
			icon: button.icon_svg ? (
				<RawHTML>{DOMPurify.sanitize(button.icon_svg)}</RawHTML>
			) : (
				button.icon_dashicon
			),
			title: button.title,
			isActive: button.value === value,
			onClick: () => updateValue(button.value)
		}));

		return (
			<Toolbar
				className={`${plugin_slug}-control-toolbar`}
				controls={buttons_clean}
			/>
		);
	}
}

export default withStoreConnection(MyToolbar);
