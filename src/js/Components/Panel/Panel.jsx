import l, { plugin_slug, store_slug, Div } from "../../utils";
import Setting from "../Setting/Setting";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { PanelBody, PanelRow } = wp.components;

class Panel extends Component {
	getPanelsComponent() {
		const { settings_id, id } = this.props;

		return (
			<Div
				id={`${plugin_slug}-panel-${id}`}
				className={`${plugin_slug}-panel`}
			>
				<PanelRow>
					{settings_id.map((setting_id, index) => (
						<Setting key={setting_id} id={setting_id} />
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
				className={`${plugin_slug}-panel`}
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

export default compose([
	withSelect((select, { id }) => {
		const { getSettingsId } = select(store_slug);

		return {
			settings_id: getSettingsId(id)
		};
	}),
	withDispatch((dispatch, { id }) => {
		const { togglePanelInitialOpen } = dispatch(store_slug);

		return {
			togglePanelInitialOpen: () => togglePanelInitialOpen(id)
		};
	})
])(Panel);
