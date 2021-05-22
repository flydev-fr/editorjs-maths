# Math Tool for Editor.js

Math Tool for the [Editor.js](https://ifmo.su/editor) allows to include math in your articles.
You can see it in action [here](https://sorenholsthansen.github.io/editorjs-maths-example/).

## Install

Download the package through npm (or yarn)

```
npm i --save-dev editorjs-maths
yarn add editorjs-maths
```

and include the package in your app

```
const MathTool = require('editorjs-maths');
// or import MathTool from 'editorjs-maths';
```

You can also load it from CDN

```
<script src="https://cdn.jsdelivr.net/npm/editorjs-maths@1.0.0/dist/bundle.min.js"></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    math: MathTool,
  }

  ...
});
```

## Config Params

| Field       | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| placeholder | `string` | Code Tool's placeholder string |

## Output data

This Tool returns math.

```json
{
	"type": "code",
	"data": {
		"tex": "x^2"
	}
}
```

## KaTeX

This tool is build on top of [KaTeX](https://katex.org/).
