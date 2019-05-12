import l, { plugin_slug, store_slug, Div } from "utils";
import Panel from "../Panel/Panel";

const { compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Tab extends Component {
	render() {
		const { panels_id, tab_id } = this.props;

		return (
			<Div id={tab_id} classes="tab">
				{panels_id.map(panel_id => (
					<Panel key={panel_id} panel_id={panel_id} />
				))}
			</Div>
		);
	}
}

export default compose([
	withSelect((select, { tab_id }) => {
		const { getPanelsId } = select(store_slug);

		return {
			panels_id: getPanelsId(tab_id)
		};
	})
])(Tab);
