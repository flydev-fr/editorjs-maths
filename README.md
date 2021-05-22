# Math Tool for Editor.js

Math Tool for the [Editor.js](https://ifmo.su/editor) allows to include math in your articles.

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

THis tool is build on top of [KaTeX](https://katex.org/).
