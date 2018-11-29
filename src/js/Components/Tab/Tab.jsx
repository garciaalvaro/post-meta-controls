import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Panel from "../Panel/Panel";

const { withState, compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;

class Tab extends Component {
	render() {
		const { panels, id } = this.props;

		return (
			<Div id={`ps-tab-${id}`} className="ps-tab">
				{panels.map((panel, index) => (
					<Panel key={panel.id} {...panel} />
				))}
			</Div>
		);
	}
}

// export default Tab;
export default compose([
	withSelect((select, { id }) => {
		const { getPanels } = select(store_slug);

		return {
			panels: getPanels(id)
		};
	})
])(Tab);
