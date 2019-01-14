import l, { plugin_slug } from "../../utils";
import Sidebar from "./Sidebar";

const { Fragment, Component } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

class SidebarRegister extends Component {
	render() {
		const { sidebar_id, label } = this.props;
		const plugin_id = `${plugin_slug}-${sidebar_id}`;

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
