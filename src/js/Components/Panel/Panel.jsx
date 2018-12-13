import l, { store_slug } from "../../utils";
import Div from "../Utils";
import Control from "../Control/Control";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { PanelBody, PanelRow } = wp.components;

class Panel extends Component {
	getPanelsComponent() {
		const { settings, id } = this.props;

		return (
			<Div id={`ps-panel-${id}`} className="ps-panel">
				<PanelRow>
					{settings.map((setting, index) => (
						<Control key={setting.id} {...setting} />
					))}
				</PanelRow>
			</Div>
		);
	}

	render() {
		const {
			label,
			initial_open,
			with_container,
			togglePanelInitialOpen
		} = this.props;

		const component_with_container = (
			<PanelBody
				title={label}
				icon="welcome-widgets-menus"
				initialOpen={initial_open}
				className="ps-panel"
				onToggle={togglePanelInitialOpen}
			>
				{this.getPanelsComponent()}
			</PanelBody>
		);

		return (
			<Fragment>
				{with_container
					? component_with_container
					: this.getPanelsComponent()}
			</Fragment>
		);
	}
}

// export default Sidebar;
export default compose([
	withSelect((select, { id }) => {
		const { getSettings } = select(store_slug);

		return {
			settings: getSettings(id)
		};
	}),
	withDispatch((dispatch, { id }) => {
		const { togglePanelInitialOpen } = dispatch(store_slug);

		return {
			togglePanelInitialOpen: () => togglePanelInitialOpen(id)
		};
	})
])(Panel);
