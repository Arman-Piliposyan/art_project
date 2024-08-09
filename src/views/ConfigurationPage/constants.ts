export const Materials = [
  { label: 'Aluminum sign (double folded edge)', name: 'Aluminium sign', value: 'aluminium', id: 'M1' },
  { label: 'Dibond sign', name: 'Dibond sign', value: 'dibond', id: 'M2' },
  { label: 'The sticker only', value: 'sticker', name: 'Sticker', id: 'M3' },
];

export const Reflections = [
  { label: 'Klasse 3', value: 'klasse3', id: 'R1' },
  { label: 'Klasse 1', value: 'klasse1', id: 'R2' },
  { label: 'No reflection (white)', value: 'noReflection', id: 'R3' },
];

export const ReflectionColors = [
  { label: 'White', value: 'white', id: 'RC1' },
  { label: 'Yellow', value: 'yellow', id: 'RC2' },
  { label: 'Fluor yellow', value: 'fluorYellow', id: 'RC3' },
];

export const SignColors = [
  { label: 'Blue', value: 'blue', id: 'SC1' },
  { label: 'Red', value: 'red', id: 'SC2' },
  { label: 'Yellow', value: 'yellow', id: 'SC3' },
  { label: 'White', value: 'white', id: 'SC4' },
];

export const Sizes = [
  /// Square 1:1
  { availableInProportion: 'square1:1', label: '400x400 mm', value: '400x400', id: 'S1' },
  { availableInProportion: 'square1:1', label: '600x600 mm', value: '600x600', id: 'S2' },
  { availableInProportion: 'square1:1', label: '800x800 mm', value: '800x800', id: 'S3' },
  /// Rectangle 2:1
  { availableInProportion: 'rectangle2:1', label: '400x200 mm', value: '400x200', id: 'S4' },
  { availableInProportion: 'rectangle2:1', label: '600x300 mm', value: '600x300', id: 'S5' },
  { availableInProportion: 'rectangle2:1', label: '800x400 mm', value: '800x400', id: 'S6' },
  /// Rectangle 1:2
  { availableInProportion: 'rectangle1:2', label: '200x400 mm', value: '200x400', id: 'S7' },
  { availableInProportion: 'rectangle1:2', label: '300x600 mm', value: '300x600', id: 'S8' },
  { availableInProportion: 'rectangle1:2', label: '400x800 mm', value: '400x800', id: 'S9' },
  /// Square 2:3
  { availableInProportion: 'square2:3', label: '400x600 mm', value: '400x600', id: 'S10' },
  { availableInProportion: 'square2:3', label: '600x900 mm', value: '600x900', id: 'S11' },
  { availableInProportion: 'square2:3', label: '800x1200 mm', value: '800x1200', id: 'S12' },
  /// Rectangle 3:2
  { availableInProportion: 'rectangle3:2', label: '600x400 mm', value: '600x400', id: 'S13' },
  { availableInProportion: 'rectangle3:2', label: '900x600 mm', value: '900x600', id: 'S14' },
  { availableInProportion: 'rectangle3:2', label: '1200x800 mm', value: '1200x800', id: 'S15' },
  /// Rectangle 3:1
  { availableInProportion: 'rectangle3:1', label: '600x200 mm', value: '600x200', id: 'S16' },
  /// Rectangle 4:1
  { availableInProportion: 'rectangle4:2', label: '800x200 mm', value: '800x200', id: 'S17' },
  /// Rectangle 6:1
  { availableInProportion: 'rectangle6:1', label: '900x150 mm', value: '900x150', id: 'S18' },
  /// Square 6:5
  { availableInProportion: 'square6:5', label: '1200x1000 mm', value: '1200x1000', id: 'S19' },
  /// Rectangle 8:3
  { availableInProportion: 'rectangle8:3', label: '400x150 mm', value: '400x150', id: 'S20' },
  { availableInProportion: 'rectangle8:3', label: '800x300 mm', value: '800x300', id: 'S21' },
  /// Circle
  { availableInProportion: 'circle', label: '400 mm', value: '400', id: 'S22' },
  { availableInProportion: 'circle', label: '600 mm', value: '600', id: 'S23' },
  { availableInProportion: 'circle', label: '900 mm', value: '900', id: 'S24' },
  /// Square 3:4
  { availableInProportion: 'square3:4', label: '300x400 mm', value: '300x400', id: 'S25' },
  /// Square 4:3
  { availableInProportion: 'square4:3', label: '400x300 mm', value: '400x300', id: 'S26' },
];

const onePartSize = 20;

export const Proportions = [
  {
    data: {
      size: { height: `${5 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['all'],
    },
    label: 'Square 1:1',
    value: 'square1:1',
    id: 'P1',
  },
  {
    data: {
      size: { height: `${2.5 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['all'],
    },
    label: 'Rectangle 2:1',
    value: 'rectangle2:1',
    id: 'P2',
  },
  {
    data: {
      size: { height: `${8 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['all'],
    },
    label: 'Rectangle 1:2',
    value: 'rectangle1:2',
    id: 'P3',
  },
  {
    data: {
      size: { height: `${6 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['all'],
    },
    label: 'Square 2:3',
    value: 'square2:3',
    id: 'P4',
  },
  {
    data: {
      size: { height: `${4 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['all'],
    },
    label: 'Rectangle 3:2',
    value: 'rectangle3:2',
    id: 'P5',
  },
  {
    data: {
      size: { height: `${2 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['blue', 'yellow', 'white'],
    },
    label: 'Rectangle 3:1',
    value: 'rectangle3:1',
    id: 'P6',
  },
  {
    data: {
      size: { height: `${4 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['blue', 'yellow', 'white'],
    },
    label: 'Square 3:4',
    value: 'square3:4',
    id: 'P7',
  },
  {
    data: {
      size: { height: `${4 * onePartSize}px`, width: `${6 * onePartSize}px` },
      availableColors: ['blue', 'yellow', 'white'],
    },
    label: 'Square 4:3',
    value: 'square4:3',
    id: 'P8',
  },
  {
    data: {
      size: { height: `${1.5 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['blue', 'yellow', 'white'],
    },
    label: 'Rectangle 4:1',
    value: 'rectangle4:1',
    id: 'P9',
  },
  {
    data: {
      size: { height: `${1 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['blue', 'white'],
    },
    label: 'Rectangle 6:1',
    value: 'rectangle6:1',
    id: 'P10',
  },
  {
    data: {
      size: { height: `${4 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['yellow', 'white'],
    },
    label: 'Square 6:5',
    value: 'square6:5',
    id: 'P11',
  },
  {
    data: {
      size: { height: `${1 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['blue', 'yellow', 'white'],
    },
    label: 'Rectangle 8:3',
    value: 'rectangle8:3',
    id: 'P12',
  },
  {
    data: {
      size: { height: `${5 * onePartSize}px`, width: `${5 * onePartSize}px` },
      availableColors: ['blue', 'yellow', 'white'],
    },
    label: 'Circle',
    value: 'circle',
    id: 'P13',
  },
];
