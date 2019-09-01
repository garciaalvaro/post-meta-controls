import { withSelect } from "@wordpress/data";
import { Fragment } from "@wordpress/element";

import "./Settings.styl";
import { store_slug } from "utils/data";
import {
	SettingWithMetaData,
	SettingWithLocalData,
	SettingWithNoneData
} from "./Setting";

interface WithSelectProps {
	settings: SettingProps[];
}

interface OwnProps {
	panel_id: PanelProps["id"];
}

export const Settings: React.ComponentType<OwnProps> = withSelect<
	WithSelectProps,
	OwnProps
>((select, { panel_id }) => ({
	settings: select(store_slug).getSettings(panel_id)
}))(props => {
	const { settings } = props;

	return (
		<Fragment>
			{settings.map(setting =>
				setting.data_type === "meta" ? (
					<SettingWithMetaData key={setting.id} {...setting} />
				) : setting.data_type === "localstorage" ? (
					<SettingWithLocalData key={setting.id} {...setting} />
				) : (
					<SettingWithNoneData key={setting.id} {...setting} />
				)
			)}
		</Fragment>
	);
});
