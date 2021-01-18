type Action<T, P> = {
	type: T;
	payload: P;
};

type ActionCreator<A extends Actions> = {
	(payload: A["payload"]): A;
};

type ActionUpdatePropLocal = Action<
	"UPDATE_PROP_LOCAL",
	{
		setting_id: SettingProps["id"];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any;
	}
>;
type ActionUpdatePropNone = Action<
	"UPDATE_PROP_NONE",
	{
		setting_id: SettingProps["id"];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any;
	}
>;
type ActionSetMetaKeyExists = Action<"SET_META_KEY_EXISTS", string>;
type ActionOpenTab = Action<
	"OPEN_TAB",
	{ sidebar_id: SidebarProps["id"]; tab_id: TabProps["id"] }
>;
type ActionAddSidebar = Action<"ADD_SIDEBAR", SidebarProps>;
type ActionAddTab = Action<"ADD_TAB", TabProps>;
type ActionAddPanel = Action<"ADD_PANEL", PanelProps>;
//eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionAddSetting = Action<"ADD_SETTING", SettingProps & { value: any }>;

type ActionCreators = {
	updatePropLocal: ActionCreator<ActionUpdatePropLocal>;
	updatePropNone: ActionCreator<ActionUpdatePropNone>;
	setMetaKeyExists: ActionCreator<ActionSetMetaKeyExists>;
	openTab: ActionCreator<ActionOpenTab>;
	addSidebar: ActionCreator<ActionAddSidebar>;
	addTab: ActionCreator<ActionAddTab>;
	addPanel: ActionCreator<ActionAddPanel>;
	addSetting: ActionCreator<ActionAddSetting>;
};

type Actions =
	| ActionUpdatePropLocal
	| ActionUpdatePropNone
	| ActionSetMetaKeyExists
	| ActionOpenTab
	| ActionAddSidebar
	| ActionAddTab
	| ActionAddPanel
	| ActionAddSetting;
