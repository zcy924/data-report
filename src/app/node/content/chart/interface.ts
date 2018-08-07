
interface ChartLineItem {
  name?: string;
  type: 'line';
  stack?: string;
  encode?: CartesionEncode;
}

export interface ChartBarItem {
  name?: string;
  type: 'bar';
  stack?: string;
  encode?: CartesionEncode;
}


interface Encode {
  tooltip?: number | string | Array<string | number>;
  itemName?: number | string | Array<string | number>;
}

interface CartesionEncode extends Encode {
  x?: number | string | Array<string | number>;
  y?: number | string | Array<string | number>;
}

interface PolarEncode extends Encode {
  radius?: number | string | Array<string | number>;
  angle?: number | string | Array<string | number>;
}

interface GEOEncode extends Encode {
  lng?: number | string | Array<string | number>;
  lat?: number | string | Array<string | number>;
}
