import l, { plugin_slug, store_slug, Div } from "../../utils";
import PanelContainer from "../Panel/PanelContainer";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Tab extends Component {
	render() {
		const { panels, id } = this.props;

		return (
			<Div
				id={`${plugin_slug}-tab-content-${id}`}
				className={`${plugin_slug}-tab-content`}
			>
				{panels.map((panel, index) => (
					<PanelContainer key={panel.id} {...panel} />
				))}
			</Div>
		);
	}
}

export default compose([
	withSelect((select, { id }) => {
		const { getPanels } = select(store_slug);

		return {
			panels: getPanels(id)
		};
	})
])(Tab);
