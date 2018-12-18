import l from "../../utils";
import DOMPurify from "dompurify";

const { Component, RawHTML } = wp.element;

class CustomHTML extends Component {
	render() {
		const { html_string } = this.props;
		l("CustomHTML");
		return (
			<RawHTML className="ps-control-customHTML">
				{DOMPurify.sanitize(html_string)}
			</RawHTML>
		);
	}
}

export default CustomHTML;
