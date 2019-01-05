import l, { Div, Span } from "../../utils";

const { __, sprintf } = wp.i18n;
const { Component } = wp.element;

class Invalid extends Component {
	render() {
		const { title, message } = this.props;

		return (
			<Div className="ps-invalid">
				<Span className="ps-invalid-title">
					{sprintf(__("%s:"), title)}
				</Span>
				<Span className="ps-invalid-message">{message}</Span>
			</Div>
		);
	}
}

export default Invalid;
