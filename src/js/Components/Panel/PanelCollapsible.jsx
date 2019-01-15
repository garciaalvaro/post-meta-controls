import l, { Div, Span, plugin_slug, store_slug } from "../../utils";
import Setting from "../Setting/Setting";

const { withDispatch } = wp.data;
const { Component, Fragment } = wp.element;
const { PanelBody } = wp.components;

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
				id={id}
				initialOpen={initial_open}
				className={`${plugin_slug}-panel ${plugin_slug}-panel-collapsible`}
				onToggle={togglePanelInitialOpen}
			>
				<Div id={id} className={`${plugin_slug}-panel-content`}>
					{settings_id.map(setting_id => (
						<Setting key={setting_id} setting_id={setting_id} />
					))}
				</Div>
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
