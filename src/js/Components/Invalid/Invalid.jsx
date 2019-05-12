import l, { Div, Span, plugin_slug } from "utils";

const { __, sprintf } = wp.i18n;
const { Component } = wp.element;

class Invalid extends Component {
	render() {
		const { title, message } = this.props;

		return (
			<Div className={`${plugin_slug}-invalid`}>
				<Span className={`${plugin_slug}-invalid-title`}>
					{sprintf(__("%s:"), title)}
				</Span>
				<Span className={`${plugin_slug}-invalid-message`}>{message}</Span>
			</Div>
		);
	}
}

export default Invalid;
