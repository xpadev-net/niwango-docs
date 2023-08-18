import { IDocument } from "@/@types/documents";

const documents: IDocument[] = [
  {
    name: "dump",
    isNonStandard: true,
    syntax: "dump(...args: any) => void",
    description:
      "値をログとして出力する関数です。複数の引数を指定することができます",
  },
  {
    name: "while_kari",
    syntax: "while_kari(arg0: boolean, arg1: statement) => void",
    description: "arg0が真の間arg1を実行します",
  },
  {
    name: "if",
    syntax: "if(when: boolean, then: statement, else: statement) => unknown",
    description: "whenが真の場合thenを、偽の場合elseを実行し、結果を返します",
  },
  {
    name: "distance",
    syntax:
      "distance(x1: number, y1: number, x2: number, y2: number) => number",
    description: "2点間の距離を計算し、返します",
  },
  {
    name: "screenWidth",
    syntax: "screenWidth() => number",
    description: "画面幅を返します",
  },
  {
    name: "screenHeight",
    syntax: "screenHeight() => number",
    description: "画面高を返します",
  },
  {
    name: "playStartTime",
    syntax: "playStartTime() => number",
    description:
      "niwango-core.jsが読み込まれたタイミングのUnixミリ秒を返します",
  },
  {
    name: "timethis",
    syntax: "thimsthis(arg0: statement) => string",
    description: "statementの実行にかかった秒数やデバッグ情報を返します",
  },
  {
    name: "@",
    syntax: "@(arg0: variable) => void",
    description: "arg0に@0の内容を代入します",
  },
  {
    name: "def",
    syntax: "def(arg0: funcName(...args), arg1: statement) => void",
    description:
      "関数を定義します。Objectのメゾットとして定義することもできます",
    examples: [
      'def(test(obj),dump(obj));test("hello world")',
      "obj = Object.clone;obj.def(hoge(),dump(self.huga));obj.huga=5;obj.hoge()",
    ],
  },
  {
    name: "def_kari",
    syntax: "def_kari(arg: funcName, arg1: statement) => void",
    description:
      "関数を定義します。Objectのメゾットとして定義することもできます",
    examples: ['def_kari("test",dump("hello world"));test()'],
  },
  {
    name: "commentTrigger",
    syntax: "commentTrigger(then: statement, timer?: number) => void",
    description:
      "コメントが再生されると呼び出されるイベントハンドラです。timerで有効期間を設定でき、省略した場合は無期限になります",
  },
  {
    name: "ctrig",
    alias: "commentTrigger",
    isAlias: true,
  },
  {
    name: "drawShape",
    syntax:
      "drawShape(x: number, y: number, z: number, shape: 'rect'|'circle', width: number, height: number, color: number, visible: boolean, pos: string, mask: boolean, commentmask: boolean, alpha: number, rotation: number, mover: ''|'simple'|'smooth'|'rolling'|'kage')",
    description: "図形を描画する",
  },
  {
    name: "drawText",
    syntax:
      "drawText(text: string, x: number, y: number, z: number, size: number, pos: string, color: number, bold: boolean, visible: boolean, filter: ''|'fuchi'|'kasumi'|'kage', alpha: number, mover: ''|'simple'|'smooth'|'rolling'|'kage')",
    description: "文字列を描画する",
  },
  {
    name: "dt",
    alias: "drawText",
    isAlias: true,
  },
  {
    name: "rand",
    syntax: "rand(seed?: any)",
    description: "乱数を生成します。なお、seedと結果は1対1で対応します",
  },
  {
    name: "timer",
    syntax: "timer(timer: number, then: statement)",
    description: "timer秒後にthenを実行します",
  },
];

export { documents };
