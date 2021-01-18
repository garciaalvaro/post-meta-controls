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
			[key: string]: SanitizeType | SanitizeTypeOrObject;
	  }
	| {
			_all: SanitizeType | SanitizeTypeOrObject;
	  }
	| {
			type: SanitizeType | SanitizeTypeOrObject;
	  };

type SchemaConditionObject = { value: boolean; message: string };

type SchemaCondition =
	| false
	| "not_empty"
	| SchemaConditionObject
	| SchemaConditionObject[];

type SchemaElement = {
	type: SanitizeTypeOrObject;
	conditions?: SchemaCondition;
};

interface Schema {
	[prop: string]: SchemaElement;
}

type Warning = {
	title: string;
	message: string;
};

type ImageSize = {
	source_url: string;
	url: string;
};

type ImageSizes = Record<string, ImageSize>;

type ImageFromMedia = {
	id: number;
	alt: string;
	sizes: ImageSizes;
};

type ImageFromRest = {
	id: number;
	alt_text: string;
	media_details: {
		sizes: ImageSizes;
	};
	source_url: string;
};

type Image = {
	id: number;
	alt: string;
	url: string;
};

type ItemProps = SidebarProps | TabProps | PanelProps | SettingProps;
