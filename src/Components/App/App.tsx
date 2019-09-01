import { Fragment } from "@wordpress/element";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";

import "./App.styl";
import { Sidebar } from "Components/Sidebar/Sidebar";

interface Props {
	plugin_id: string;
	sidebar_id: SidebarProps["id"];
	label: SidebarProps["label"];
}

export const App: React.ComponentType<Props> = props => {
	const { plugin_id, sidebar_id, label } = props;

	return (
		<Fragment>
			<PluginSidebar name={plugin_id} title={label}>
				<Sidebar id={sidebar_id} />
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target={plugin_id}>
				{label}
			</PluginSidebarMoreMenuItem>
		</Fragment>
	);
};
