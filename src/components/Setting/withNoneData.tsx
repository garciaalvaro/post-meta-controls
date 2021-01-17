import React from "react";
import { isUndefined } from "lodash";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

import { store_slug } from "@/utils/data";

interface WithSelectProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
}

interface WithDispatchProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateValue: (value: any) => void;
}

interface OwnProps extends SettingPropsShared {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default_value: any;
	data_type: "none" | "meta" | "localstorage";
}

interface Props extends OwnProps, WithSelectProps, WithDispatchProps {}

export const withNoneData = compose(
	withDispatch<WithDispatchProps, OwnProps>(
		(dispatch, { id: setting_id }) => ({
			updateValue: value =>
				dispatch(store_slug).updatePropNone({
					setting_id,
					value,
				}),
		})
	),

	withSelect<WithSelectProps, OwnProps>((select, { id, default_value }) => {
		const data: Obj = select(store_slug).getSettingsNone();

		return {
			value: !isUndefined(data[id]) ? data[id] : default_value,
		};
	}),

	(WrappedComponent: React.ComponentType<OwnProps>) => (props: Props) => {
		return <WrappedComponent {...props} />;
	}
);
