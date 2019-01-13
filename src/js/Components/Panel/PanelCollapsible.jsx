import l, { Span, plugin_slug, store_slug } from "../../utils";
import Setting from "../Setting/Setting";

const { withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { PanelBody, PanelRow } = wp.components;

class PanelCollapsible extends Component {
	render() {
		const {
			label,
			initial_open,
			togglePanelInitialOpen,
			icon,
			settings_id,
			id
		} = this.props;

		return (
			<PanelBody
				title={
					<Fragment>
						{icon}
						<Span className={`${plugin_slug}-panel-label`}>
							{label}
						</Span>
					</Fragment>
				}
				id={`${plugin_slug}-panel-${id}`}
				initialOpen={initial_open}
				className={`${plugin_slug}-panel ${plugin_slug}-panel-collapsible`}
				onToggle={togglePanelInitialOpen}
			>
				<PanelRow>
					{settings_id.map(setting_id => (
						<Setting key={setting_id} id={setting_id} />
					))}
				</PanelRow>
			</PanelBody>
		);
	}
}

export default withDispatch((dispatch, { id }) => {
	const { togglePanelInitialOpen } = dispatch(store_slug);

	return {
		togglePanelInitialOpen: () => togglePanelInitialOpen(id)
	};
})(PanelCollapsible);