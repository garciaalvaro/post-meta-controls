import l, { Div, Span } from "utils";

const { __, sprintf } = wp.i18n;
const { Component } = wp.element;

class Invalid extends Component {
	render() {
		const { title, message } = this.props;

		return (
			<Div classes="invalid">
				<Span classes="invalid-title">{sprintf(__("%s:"), title)}</Span>
				<Span classes="invalid-message">{message}</Span>
			</Div>
		);
	}
}

export default Invalid;
