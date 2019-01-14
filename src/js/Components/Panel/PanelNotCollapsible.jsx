import l, { Span, Div, plugin_slug } from "../../utils";
import Setting from "../Setting/Setting";

const { Component } = wp.element;
const { PanelRow } = wp.components;

class PanelNotCollapsible extends Component {
	render() {
		const { label, settings_id, icon, id } = this.props;

		return (
			<Div
				id={id}
				className={`${plugin_slug}-panel ${plugin_slug}-panel-no-collapsible`}
			>
				{label && (
					<Div className={`${plugin_slug}-panel-label-container`}>
						{icon}
						<Span className={`${plugin_slug}-panel-label`}>
							{label}
						</Span>
					</Div>
				)}
				<PanelRow>
					{settings_id.map(setting_id => (
						<Setting key={setting_id} setting_id={setting_id} />
					))}
				</PanelRow>
			</Div>
		);
	}
}

export default PanelNotCollapsible;
