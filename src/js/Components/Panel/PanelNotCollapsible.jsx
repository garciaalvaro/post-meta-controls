import l, { Span, Div, addPrefix } from "utils";
import Setting from "../Setting/Setting";

const { Component } = wp.element;
const { PanelRow } = wp.components;

class PanelNotCollapsible extends Component {
	render() {
		const { label, settings_id, icon, id } = this.props;

		return (
			<Div id={id} className={addPrefix(["panel", "panel-no-collapsible"])}>
				{label && (
					<Div classes="panel-label-container">
						{icon}
						<Span classes="panel-label">{label}</Span>
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
