interface ComponentProps extends Obj {
	children?: React.ReactNode;
	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
}

type SanitizeType =
	| "html"
	| "id"
	| "url"
	| "text"
	| "integer"
	| "float"
	| "boolean";

type SanitizeTypeOrObject =
	| SanitizeType
	| {
			_all: SanitizeType | SanitizeTypeOrObject;
	  }
	| {
			type: SanitizeType | SanitizeTypeOrObject;
	  }
	| {
			[key: string]: SanitizeType;
	  };

type SchemaConditionObject = { value: boolean; message: string };

type SchemaCondition =
	| false
	| "not_empty"
	| SchemaConditionObject
	| SchemaConditionObject[];

interface SchemaElement {
	type: SanitizeTypeOrObject;
	conditions?: SchemaCondition;
}

interface Schema {
	[prop: string]: SchemaElement;
}

interface Warning {
	title: string;
	message: string;
}

interface ImageSizes {
	[size: string]: {
		source_url: string;
		url: string;
	};
}

interface ImageFromMedia {
	id: number;
	alt: string;
	sizes: ImageSizes;
}

interface ImageFromRest {
	id: number;
	alt_text: string;
	media_details: {
		sizes: ImageSizes;
	};
	source_url: string;
}

interface Image {
	id: number;
	alt: string;
	url: string;
}
