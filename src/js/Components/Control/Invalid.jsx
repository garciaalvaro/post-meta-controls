import l from "../../utils";
import Div, { Span } from "../Utils";

const { __, sprintf } = wp.i18n;
const { Component } = wp.element;
const { BaseControl } = wp.components;

class Invalid extends Component {
	render() {
		const { invalid_warnings, label } = this.props;

		return (
			<BaseControl
				className="ps-control-invalid"
				label={sprintf(__("%s (Invalid)"), label)}
				help={invalid_warnings.map(({ property_name, message }) => (
					<Div
						key={property_name}
						className="ps-control-invalid-message"
					>
						<Span className="ps-control-invalid-title">
							{sprintf(__("%s:"), property_name)}
						</Span>
						<Span className="ps-control-invalid-description">
							{message}
						</Span>
					</Div>
				))}
			/>
		);
	}
}

export default Invalid;
