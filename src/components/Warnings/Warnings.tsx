import React from "react";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";

import "./Warnings.styl";
import { Div, Span } from "utils/Components";
import { Warning } from "./Warning";

interface Props {
	warnings: Warning[];
}

export const Warnings: React.ComponentType<Props> = props => {
	const { warnings } = props;

	return (
		<Fragment>
			<Div className="warning-header">
				<Span>{__("This sidebar has some invalid properties:")}</Span>
			</Div>

			{warnings.map(({ message, title }, index) => (
				<Warning key={index} message={message} title={title} />
			))}
		</Fragment>
	);
};
