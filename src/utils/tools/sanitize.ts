import DOMPurify from "dompurify";
import {
	isString,
	isArray,
	isBoolean,
	escape,
	toSafeInteger,
	toNumber,
	deburr
} from "lodash";

const sanitizeHtml = (value: any) => {
	if (!isString(value)) {
		return "";
	}
	value = DOMPurify.sanitize(value);

	return value;
};

const sanitizeUrl = (value: any) => {
	if (!isString(value)) {
		return "#";
	}

	/* https://stackoverflow.com/a/3809435 | CC BY-SA 3.0 */
	const url_regex = new RegExp(
		/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
	);

	if (!value.match(url_regex)) {
		return "#";
	}

	return value;
};

const sanitizeId = (value: any) => {
	if (!isString(value)) {
		return "";
	}
	value = deburr(value);
	value = value.replace(/[^\w-]/g, "");

	return value;
};

const sanitizeText = (value: any) => {
	if (!isString(value)) {
		return "";
	}
	value = escape(value);

	return value;
};

const sanitizeBoolean = (value: any) => {
	return isBoolean(value) && value === true ? true : false;
};

const sanitizeFloat = (value: any) => {
	value = toNumber(value);
	value = Math.abs(value);
	value = Math.round(100 * value) / 100;

	return value;
};

const sanitizeInteger = (value: any) => {
	value = toSafeInteger(value);
	value = Math.abs(value);

	return value;
};

const sanitizeArray = <T>(value: any): T[] => {
	if (!isArray(value)) {
		return [];
	}

	return value;
};

export const sanitize = {
	id: sanitizeId,
	url: sanitizeUrl,
	html: sanitizeHtml,
	text: sanitizeText,
	boolean: sanitizeBoolean,
	float: sanitizeFloat,
	integer: sanitizeInteger,
	array: sanitizeArray
};
