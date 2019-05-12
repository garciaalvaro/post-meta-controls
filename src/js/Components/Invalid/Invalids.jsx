import l, { Div, Span, plugin_slug } from "utils";
import Invalid from "./Invalid";

const { __ } = wp.i18n;
const { Component } = wp.element;

class Invalids extends Component {
	render() {
		const { warnings, sidebar_id, classes } = this.props;

		return (
			<Div id={sidebar_id} className={classes}>
				<Div id={`${plugin_slug}-invalid-header`}>
					<Span>{__("This sidebar has some invalid properties:")}</Span>
				</Div>
				{warnings.map(({ message, title }, index) => (
					<Invalid key={`invalid-${index}`} message={message} title={title} />
				))}
			</Div>
		);
	}
}

export default Invalids;
