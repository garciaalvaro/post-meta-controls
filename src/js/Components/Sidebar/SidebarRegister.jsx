import l from "utils";
import Sidebar from "./Sidebar";

const { Fragment, Component } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

class SidebarRegister extends Component {
	render() {
		const { plugin_id, sidebar_id, label } = this.props;

		return (
			<Fragment>
				<PluginSidebar name={plugin_id} title={label}>
					<Sidebar sidebar_id={sidebar_id} />
				</PluginSidebar>
				<PluginSidebarMoreMenuItem target={plugin_id}>
					{label}
				</PluginSidebarMoreMenuItem>
			</Fragment>
		);
	}
}

export default SidebarRegister;
