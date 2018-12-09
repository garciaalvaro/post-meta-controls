import l, { plugin_namespace_dash } from "../utils";
import Sidebar from "./Sidebar";

const { Fragment, Component } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

class SidebarContainer extends Component {
	render() {
		const { id, label } = this.props;
		const plugin_id = `${plugin_namespace_dash}-${id}`;

		return (
			<Fragment>
				<PluginSidebar name={plugin_id} title={label}>
					<Sidebar id={id} />
				</PluginSidebar>
				<PluginSidebarMoreMenuItem target={plugin_id}>
					{label}
				</PluginSidebarMoreMenuItem>
			</Fragment>
		);
	}
}

export default SidebarContainer;