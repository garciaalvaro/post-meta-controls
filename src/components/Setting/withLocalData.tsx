import React from "react";
import { isUndefined } from "lodash";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";

import { store_slug } from "utils/data";

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

export const withLocalData = compose(
	withDispatch<WithDispatchProps, OwnProps>(
		(dispatch, { id: setting_id }) => ({
			updateValue: value =>
				dispatch(store_slug).updatePropLocal({
					setting_id,
					value
				})
		})
	),

	withSelect<WithSelectProps, OwnProps>(
		(select, { data_key_with_prefix, default_value }) => {
			const persisted: Obj = select(store_slug).getSettingsPersisted();

			return {
				value: !isUndefined(persisted[data_key_with_prefix])
					? persisted[data_key_with_prefix]
					: default_value
			};
		}
	),

	(WrappedComponent: React.ComponentType<OwnProps>) => (props: Props) => {
		return <WrappedComponent {...props} />;
	}
);
