/**
 * Build styles
 */
import './index.css';
import katex from 'katex';
import 'katex/dist/katex.css';

/**
 * MathTool for Editor.js
 *
 * @author Søren Hansen
 */

/* global PasteEvent */

/**
 * Math Tool for the Editor.js allows to include math in your articles.
 */
export default class MathTool {
	/**
	 * Notify core that read-only mode is supported
	 *
	 * @returns {boolean}
	 */
	static get isReadOnlySupported() {
		return true;
	}

	/**
	 * Allow to press Enter inside the MathTool texarea
	 *
	 * @returns {boolean}
	 * @public
	 */
	static get enableLineBreaks() {
		return true;
	}

	/**
	 * @typedef {object} MathData — plugin saved data
	 * @property {string} tex - previously saved plugin tex (math)
	 */

	/**
	 * Render plugin`s main Element and fill it with saved data
	 *
	 * @param {object} options - tool constricting options
	 * @param {MathData} options.data — previously saved plugin tex
	 * @param {object} options.config - user config for Tool
	 * @param {object} options.api - Editor.js API
	 * @param {boolean} options.readOnly - read only mode flag
	 */
	constructor({ data, config, api, readOnly }) {
		this.readOnly = readOnly;

		this.placeholder = api.i18n.t(
			config.placeholder || MathTool.DEFAULT_PLACEHOLDER
		);

		this.CSS = {
			baseClass: api.styles.block,
			input: api.styles.input,
			wrapper: 'math__wrapper',
			texarea: 'math__texarea',
			display: 'math__display',
		};

		this.nodes = {
			holder: null,
			texarea: null,
		};

		this.data = {
			tex: data.tex || '',
		};
		this.tex = data.tex || '';

		this.nodes.holder = this.drawView();
	}

	/**
	 * Create Tool's view
	 *
	 * @returns {HTMLElement}
	 * @private
	 */
	drawView() {
		this.nodes.wrapper = document.createElement('div');
		const texarea = document.createElement('p');
		texarea.contentEditable = true;

		this.nodes.wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);
		texarea.classList.add(this.CSS.texarea, this.CSS.input);
		texarea.innerHTML = this.data.tex;

		texarea.placeholder = this.placeholder;

		if (this.readOnly) {
			texarea.disabled = true;
		}

		texarea.addEventListener('blur', () => this._onBlur());
		texarea.addEventListener('focus', () => this._onFocus());
		texarea.addEventListener('input', () => (this.tex = texarea.innerHTML));

		this.nodes.wrapper.appendChild(texarea);

		this.nodes.texarea = texarea;

		return this.nodes.wrapper;
	}

	_onBlur() {
		katex.render(this.tex, this.nodes.texarea, {
			throwOnError: false,
			displayMode: true,
		});
		this.nodes.texarea.classList.remove(this.CSS.texarea, this.CSS.input);
		this.nodes.texarea.classList.add(this.CSS.display);
	}

	_onFocus() {
		this.nodes.texarea.innerHTML = this.tex;
		this.nodes.texarea.classList.remove(this.CSS.display);
		this.nodes.texarea.classList.add(this.CSS.texarea, this.CSS.input);
	}

	/**
	 * Return Tool's view
	 *
	 * @returns {HTMLDivElement} this.nodes.holder - Math's wrapper
	 * @public
	 */
	render() {
		return this.nodes.holder;
	}

	/**
	 * Extract Tool's data from the view
	 *
	 * @param {HTMLDivElement} mathWrapper - MathTool's wrapper, containing texarea with tex
	 * @returns {MathData} - saved plugin tex
	 * @public
	 */
	save() {
		return {
			tex: this.tex,
		};
	}

	/**
	 * Returns Tool`s data from private property
	 *
	 * @returns {MathData}
	 */
	get data() {
		return this._data;
	}

	/**
	 * Set Tool`s data to private property and update view
	 *
	 * @param {MathData} data - saved tool data
	 */
	set data(data) {
		this._data = data;

		if (this.nodes.texarea) {
			this.nodes.texarea.textContent = data.tex;
		}
	}

	/**
	 * Get Tool toolbox settings
	 * icon - Tool icon's SVG
	 * title - title to show in toolbox
	 *
	 * @returns {{icon: string, title: string}}
	 */
	static get toolbox() {
		return {
			title: 'Math',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="#000000" viewBox="0 0 256 256"></rect><line x1="40" y1="184" x2="104" y2="184" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="72" y1="152" x2="72" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="104" y1="72" x2="40" y2="72" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="216" y1="168.0664" x2="152" y2="168.0664" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="216" y1="199.9336" x2="152" y2="199.9336" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="208" y1="48" x2="160" y2="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="208" y1="96" x2="160" y2="48" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>`,
		};
	}

	/**
	 * Default placeholder for MathTool's texarea
	 *
	 * @public
	 * @returns {string}
	 */
	static get DEFAULT_PLACEHOLDER() {
		return 'Enter some tex, e.g. \\sqrt{\\pi*x^2}';
	}

	/**
	 * Automatic sanitize config
	 *
	 * @returns {{tex: boolean}}
	 */
	static get sanitize() {
		return {
			tex: false, // disallow HTML tags
		};
	}

	validate(savedData) {
		if (!savedData.tex.trim()) {
			return false;
		}
		return true;
	}
}
