import React from "react";
import { __, sprintf } from "@wordpress/i18n";

import { Div, Span } from "utils/Components";

export const Warning: React.ComponentType<Warning> = props => {
	const { title, message } = props;

	return (
		<Div className="warning">
			<Span className="warning-title">{sprintf(__("%s:"), title)}</Span>
			<Span className="warning-message">{message}</Span>
		</Div>
	);
};
