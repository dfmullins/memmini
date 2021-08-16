document.addEventListener("DOMContentLoaded", function() {
     window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
     window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
     window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
     if(!window.indexedDB){    
			alert(BROWSER_INCOMPATIBLE);
            
            return false;
     }
	 
	(new MemMiniController).setupAction();
	
	window.addEventListener('resize', function() {
		if (ListenerResources.mEmMiniNumber > 0) {
			(new MemMiniController()).resizeAction();
		}
	}); 
	
	window.addEventListener("keyup", function(event) {
		if (event.keyCode === ESCAPE) {
		    (new DrawAction()).stopDraw(false);
	    }
	}); 
	
	window.addEventListener('click', function(event){
		if(event.target){
			if (typeof EVENT_ROUTER[event.target.id] === "function") {
				EVENT_ROUTER[event.target.id]();
			}
		}
	});
	
	/** 
	* Pass the id of the element (i.e. hidden textarea) populated 
	* with the response data into initializeResponseDataPopulation.
	* This will render the drawings and comments on page load.
	*/
	(new MemMiniJsCommands()).initializeResponseDataPopulation('exampleData');
});

const 
	EVENT_ROUTER     = {
		'mEmMiniWindowCloseBtn': function () {
			(new MemMiniUserInterface()).removeModalWindow();
		},
		'mEmMiniSaveText': function () {
			(new MemMiniController()).saveTextAction();
		},
		'mEmMiniDeleteText': function () {
			(new MemMiniController()).deleteTextAction();
		}
	},
	ESCAPE           = 27,
	ENTER            = 13,
	SERVER           = 0,
	LOCAL            = 1,
	FALSE            = 0,
	TRUE             = 1,
	DELETE_ERROR     = 'There is nothing to delete',
	NO_DRAWING_ADDED = 'Please draw on canvas first',
	ADD_TEXT_ERROR   = 'Save a drawing first',
	BROWSER_INCOMPATIBLE = 'Your browser is incompatible',
	DEFAULT_FONT_FAMILY = 'Arial, Helvetica, sans-serif',
	IDB_INIT_ERROR   = 'IndexedDb could not be initialized',
	WARNING_ALERT_TIME = 1500,
	OPTIONS          = 0,
	SAVE             = 1,
	PIN              = 2,
	UNPIN            = 3,
	CLEAR_ALL        = 4,
	UNDO             = 5,
	DELETE           = 6,
	TEXT             = 7,
	PIN_TEXT         = 8,
	ERROR            = '#ff0000',
	SUCCESS          = '#28a745',
	VIEW_PINED_ICON  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQElEQVQ4T4XTv0uXURTH8deXRFMiJydRN9FFwtqKdsFmwd3fgogE/Qs6iEuC1Vp/QIi4toiLJAUN4mTOCoGlOBQH7oWn6/P4vdv9fM5533Oec56Wu6cHS5jGaLJ/4CPe4rqa0iryh7CPkRpwSAGawFn2q4B4+eie5JwTkKe5kirgNTYqLwdsB38xn5KyvYbNuFQBX/EkRUTyc9ykexcOC/9ZCYiPE4FxZvG++A4L2E7aH0TL/1Vwi44UMIMPBWAxTSHkiO0sAefob2ihO7UwlvyfGCwBe2lE+eFjvEtVziEnh7+LVyVgBVsN8y/l5dxOdQp9aUEetoH8xgAuygriHrNdbQNYx5u6TQztMb4hVrrunKZduGoChD6OL3hUEH7hBb5X9fJnyt5LfEZvEi4xiYOyrCZAxA3jEx5gCid1Pf0DG+s3EW99ehIAAAAASUVORK5CYII=',
	DRAW_ICON        = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA6ElEQVQ4T63UIU4DQRQA0NcDUF08htRgOQGaYHEgMT1B0SScoCT1FVjCBeAGoHAk+FbVNZPMkMmms92ZdNXu5ufN/D/z/8iRn9GRPa3gGEtc4AFvaWOt4D0WEdniOqG14ElENnjEPH7/4Cy814ABe4/AFXL0FTc1YMIuI/iJhIb0V1gPBbtYqn+O/l+WQymXsABUg9VYX8pNWAlsxkrgC+72tOTemnXjSofyh0kWPAjrq+ETbnFaOs3SUMl3eI7f2AEpPqQ/6/zrHVA5GJp9mnVA02TLwS984BnfTVrlcBi0xqHWG4TkQTu1TDIVxafi8wAAAABJRU5ErkJggg==',
    VIEW_ICON        = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABm0lEQVQ4T8XUS4iPURjH8c9MoQkLNppm3MqGJSuXMaxcIkmJhSUbt401K1tqZlKyURYWNoSwUISFcluyoVzXwsKl6Kfz6u30f8fmX/Os3t5zzvc8v+f5PWdAn2OgzzwzAlyCkaLkA95Op6orwxU4jj0YrgAfcQUTeF3Da+AQTuMo7uMSHuJ9ObgYG3AAYziLk/jegNvAbL6OOThYQLNxCFswiNs4jx8FeAFfsAvJ/F9TlpeMXmA/viGwADZXsu6VCwKdh8tYhU14lwwX4jFeYjd+FcARTHY0ICWZKmuzcBXLsDbAa1iJ1fjaAkT+jg7gzWptPp7haYAXsQ5rSj0aRg5t7wDewM7WWoDP8STAuXgU/ZXkyIo1esVhnKskL20k53+8Fpu8wr5WU+6UYrehd7ENP6umjMdebdssKsVdUGzzoHQ6ttmK37iFWCWwjeX7c7HNp7ZtmgzSsVM4UcrQGDvlSGQMG2Ovx5myPxb6G12jl3ocw16MVkXMPDej9+Z/o9erAXkYAs3lGcFmDHt2a0aerw7n9P7d9wz/ALu1UoB8qOkfAAAAAElFTkSuQmCC',
	UPLOAD_ICON      = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABrklEQVRYR+3XvWpVURAF4C9qVIxGIr5AiGAE30CUaBFS2ouVlYkEi2jwCUSCiBjQwkYrawkBCzsFtRIEO7UUUiVgoubPMLJ3OJwY7l/OvYV3t/vMrLXXrBnm9Ojw6ekwvi6BogKTuIsjFZdlBdOYDZwigR/oqxg8p1/G0TKBP+l2CF8rInIGn1Puv48vKpAJVGnMw/hZNYFDuI+rCeg5pvAbcferagJhrolSCR8hTN4WAkvoLxFYxAAOJiW2y1+FBzpOIOS+UVLgIW6iF6uteOAsXiUjjeLLP9o16jxTMOEz3E7ALRE4iQ8YTKDfcA7fG5gZB7DWjALB/DXOl8A+4QLCZPlkX+W5UgxpmsBTXNvlpW8R5YgZfxovsY6LWCjF7E93DXVBmOdBDZnfYB63UrvF5x8xguiKfBomMIY5RGAzJ4iFOnn87sNGvR4Yxjscbwa5EBPKXE7mq5vACbzHqRbBc/gLXEEYc7OWAuH46PVLewSe0zzBeD0EHuP6HoPndLFx3amlQEXYO9LuupD8vwTauZQG1rHtcZg0jy3mXhs249iIY2KG2bt/Rl0FbAHzWl8h+mxq/wAAAABJRU5ErkJggg==',
	SHOW_ERRORS      = true, // true or false
	ERROR_NO_AREA    = 'There is no draw area chosen.',
	VIEW_OPTIONS     = '<li data-viewType="0" style="text-align: right;">&#10006;</li>' +
		'<li style="font-weight: bold;">This Drawing Only:</li>' +
		'<li data-viewType="1" tabindex="0" class="mEmMiniViewOptionButton">View with comments</li>' +
		'<li data-viewType="2" tabindex="0" class="mEmMiniViewOptionButton">View without comments</li>' + 
		'<li style="font-weight: bold;">All Drawings on this Page:</li>' +
		'<li data-viewType="3" tabindex="0" class="mEmMiniViewOptionButton">View all with comments</li>' +
		'<li data-viewType="4" tabindex="0" class="mEmMiniViewOptionButton">View all without comments</li>' + 
		'<li style="font-weight: bold;"></li>' +
		'<li style="font-weight: bold;">This Drawing Saved Locally Only:</li>' +
		'<li data-viewType="5" tabindex="0" class="mEmMiniViewOptionButton">View with comments</li>' +
		'<li data-viewType="6" tabindex="0" class="mEmMiniViewOptionButton">View without comments</li>' + 
		'<li style="font-weight: bold;">All Drawings Saved Locally on this Page:</li>' +
		'<li data-viewType="7" tabindex="0" class="mEmMiniViewOptionButton">View all with comments</li>' +
		'<li data-viewType="8" tabindex="0" class="mEmMiniViewOptionButton">View all without comments</li>',
	ACTION_OPTIONS = '<option value="0" style="background-color: #333333; color: #ffffff;">Options</option>' +
	'<optgroup label="Record Only:" class="recordOptions" style="background-color: #333333; color: #ffffff;">' +
		'<option value="' + SAVE + '" class="recordOptions" title="Save/edit your drawing with the record" style="background-color: #6c757d; color: #ffffff;">Save</option>' +
		'<option value="' + TEXT + '" class="recordOptions text" title="Add/edit text with your drawing" style="background-color: #6c757d; color: #ffffff;">Add/Delete Text</option>' +
		'<option value="' + DELETE + '" class="recordOptions" title="Remove drawing" style="background-color: #6c757d; color: #ffffff;">Delete Drawing</option>' +
	'</optgroup>' +
	'<optgroup label="Browser Only:" class="browserOptions" style="background-color: #333333; color: #ffffff;">' +
		'<option value="' + PIN + '" class="browserOptions" title="Save/edit your drawing to your browser" style="background-color: #6c757d; color: #ffffff;">Save</option>' +
		'<option value="' + PIN_TEXT + '" class="browserOptions text" title="Add/edit text with your drawing" style="background-color: #6c757d; color: #ffffff;">Add/Delete Text</option>' +
		'<option value="' + UNPIN + '" class="browserOptions" title="Remove your drawing from the browser" style="background-color: #6c757d; color: #ffffff;">Delete Drawing</option>' +
	'</optgroup>' +
		'<optgroup label="Actions:" style="background-color: #333333; color: #ffffff;">' +
		'<option value="' + CLEAR_ALL + '" title="Clear the drawing area" style="background-color: #6c757d; color: #ffffff;">Clear All</option>' +
		'<option value="' + UNDO + '" title="Undo your last action" style="background-color: #6c757d; color: #ffffff;">Undo Last</option>' + 
	'</optgroup>',
	COLOR_OPTIONS = '<option value="eraser">Eraser</option>' +
	'<option value="0,0,0" style="background-color: #000000; color: #ffffff;">Black</option>' +
	'<option value="255,0,0" style="background-color: #ff0000; color: #ffffff;">Red</option>' +
	'<option value="255,255,0" style="background-color: #ffff00; color: #000000;">Yellow</option>' +
	'<option value="0,0,255" style="background-color: #0000ff; color: #ffffff;">Blue</option>' +
	'<option value="0,128,0" style="background-color: #008000; color: #ffffff;">Green</option>' +
	'<option value="255,255,255" style="background-color: #ffffff; color: #000000;">White</option>',
	SIZE_OPTIONS = '<option value="1">1px</option>' +
	'<option value="2">2px</option>' +
	'<option value="3">3px</option>' +
	'<option value="4">4px</option>' +
	'<option value="5">5px</option>' +
	'<option value="6">6px</option>' +
	'<option value="7">7px</option>' +
	'<option value="8">8px</option>' +
	'<option value="9">9px</option>' +
	'<option value="10">10px</option>' +
	'<option value="20">20px</option>' +
	'<option value="30">30px</option>' +
	'<option value="40">40px</option>' +
	'<option value="50">50px</option>',
	OPACITY_OPTIONS = '<option value="1">Solid</option>' +
	'<option value=".3">Opaque</option>';
	
class ListenerResources {
	static isDrawing              = false;
	static lastMousePosition      = {};
	static mEmMiniNumber          = 0;
	static menuPermissions       = {};
	static responseDataTextareaId = '';
}

class MemMiniUtilities {
    removeMenuForReadonly() {
        if (ListenerResources.menuPermissions.hasOwnProperty(ListenerResources.mEmMiniNumber)) {
			if (TRUE === Number(ListenerResources.menuPermissions[ListenerResources.mEmMiniNumber].readOnly)) {
				document.querySelector('#mEmMiniDrawViewPinnedButtonContainer_' + ListenerResources.mEmMiniNumber).remove();
			}
		}
    }
    
	processViewOptions(records, paramObj) {
		if (false === paramObj.flag) {
			paramObj.flag = true;
			let currentPage = window.location.href;
			(new IdbAction()).getAllRecordsByPageIndex(
				'page',
				currentPage,
				paramObj,
				(new MemMiniUtilities()).processViewOptions
			);
		}
	}

	getCanvasAndContext(drawAction, dae, flag) {
		let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
		let ctx    = '';
		if (!canvas) {
			[canvas, ctx] = drawAction.wrapCanvasAroundDrawAreaElement(dae, flag);
		} else {
			ctx = canvas.getContext('2d');
		}
		
		return [canvas, ctx];
	}
	
	convertIdbData(data) {
		let newData = {};
		if (data) {
			for (const [arrayKey, obj] of Object.entries(data)) {
				for (const [objKey, value] of Object.entries(obj)) {
					newData[obj.mEmMiniCount] = JSON.parse(obj.data);
				}
			}
		}
		
		return newData;
	}
	
	removeAllDrawCanvases(flag) {
		let mEmMini = document.querySelectorAll("[id^='mEmMini_']");
		mEmMini.forEach(function (eachMemMini) {
			let canRemove = true;
			let count     = eachMemMini.id.split('_')[1];
			if (SERVER === flag && ListenerResources.menuPermissions.hasOwnProperty(count)) {
				if (TRUE === Number(ListenerResources.menuPermissions[count].alwaysVisible)) {
					canRemove = false;
				}
			}
			
			if (true === canRemove) {
				eachMemMini.remove();
				let mEmMiniTextBox = document.querySelector('[data-memminitextboxcount="' + count);
				if (mEmMiniTextBox) {
					mEmMiniTextBox.remove();
				}
			}
		});
	}
	
	isCanvasBlank() {
		let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
		
		return !canvas.getContext('2d')
			.getImageData(0, 0, canvas.width, canvas.height).data
			.some(channel => channel !== 0);
	}
	
	removeDataInPostData() {
		let textarea = document.querySelector('#mEmMiniPostData');
		if (textarea) {
			let postDataObj = JSON.parse(textarea.value);
			if (postDataObj.hasOwnProperty(ListenerResources.mEmMiniNumber)) {
				delete postDataObj[ListenerResources.mEmMiniNumber];
				textarea.value = JSON.stringify(postDataObj);
			}
		}
	}
	
	combineDataIntoPostData(newObjData) {
		let textarea = document.querySelector('#mEmMiniPostData');
		if (!textarea) {
			textarea                  = document.createElement('textarea');
			textarea.id               = 'mEmMiniPostData';
			textarea.name             = 'mEmMiniPostData';
			textarea.value            = '{}';
			textarea.style.visibility = 'hidden';
			textarea.style.position   = 'absolute';
			document.body.append(textarea);
		} 
		let postDataObj = JSON.parse(textarea.value);
		postDataObj[ListenerResources.mEmMiniNumber] 
						= newObjData;
        textarea.value  = JSON.stringify(postDataObj);
	}
	
	resize() {
		let canvases = document.querySelectorAll("[id^='mEmMini_']");
		if (canvases) {
			canvases.forEach(function (canvas) {
				let drawAction    = new DrawAction();
				ListenerResources.mEmMiniNumber = 
				    canvas.id.split('_')[1]; 
				let dae           = drawAction.getDrawAreaElement(ListenerResources.mEmMiniNumber);
				let top           = dae.getBoundingClientRect().top + window.scrollY;
				let left          = dae.getBoundingClientRect().left + window.scrollX;
				canvas.style.top  = dae.offsetTop + 'px';
				canvas.style.left = dae.offsetLeft + 'px';
				
				let options = document.querySelector('#mEmMiniDrawViewPinnedButtonContainer_' + ListenerResources.mEmMiniNumber);
				if (options) {
					let offset         = 8;
					let daeRect        = dae.getBoundingClientRect();
					options.style.top  = ((daeRect.bottom + window.scrollY) - offset) + "px";
					options.style.left = ((daeRect.right + window.scrollX) - offset) + "px";
				}
				let triangle = document.querySelector('[data-mEmMiniTextBoxTriCount="' + ListenerResources.mEmMiniNumber + '"]');
				let div      = document.querySelector('[data-mEmMiniTextBoxCount="' + ListenerResources.mEmMiniNumber + '"]');
				if (triangle && div) {
					drawAction.adjustSpeechBubbleTri(triangle, div);
				}
			});
		}
	}
	
	resizeAdjustButtonContainer(dae) {
		let div = document.querySelector('#mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber);
		if (div) {
			div.style.bottom = dae.offsetTop + 'px';
		}
	}
	
	removeSubmenuOptions() {
		let mEmMini       = document.querySelector("[data-mEmMini='" + ListenerResources.mEmMiniNumber + "']");
		let excludedArray = this.getExcludedMenuOptions(mEmMini);
		let obj           = {
		    'draw': '.recordOptions',
		    'pin': '.browserOptions',
		    'comments': '.text'
		};
		
		for (const [key, value] of Object.entries(obj)) {
            if (excludedArray.includes(key)) {
			    this.removeOptions(value);
		    }
        }
	}
	
	removeOptions(type) {
		let options = document.querySelectorAll(type);
		options.forEach(option => option.remove());
	}
	
	getExcludedMenuOptions(mEmMini) {
		let excluded      = mEmMini.getAttribute('data-mEmMiniExcludedMenuOptions');
		let excludedArray = [];
		if ("" !== excluded && null !== excluded) {
			excludedArray = excluded.split(',');
		}
		
		return excludedArray;
	}
}

class MemMiniJsCommands {
	//id of textarea element populated with response data from server
	initializeResponseDataPopulation(id) {
		try {
		    if (typeof id !== "undefined") {
			    ListenerResources.responseDataTextareaId = id;
			    let repsonseData = document.querySelector("#" + id);
			    if (repsonseData) {
			        let data             = JSON.parse(repsonseData.value);
			        let memminiutilities = (new MemMiniUtilities());
			        (new SetupAction()).populateTextareasWithData(data);
			        memminiutilities.removeMenuForReadonly();
			        memminiutilities.resize();
			    }
			}
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	//number of data-mEmMini
	validateRequiredDrawing(number) {
		let valid    = false;
		let textarea = document.querySelector('#mEmMiniPostData');
		if (textarea && "" !== textarea.value) {
			let obj = JSON.parse(textarea.value);
			if (obj.hasOwnProperty(number)) { 
				ListenerResources.mEmMiniNumber = number;
				let canvas              = document.createElement('canvas');
				canvas.id               = 'mEmMini_' + ListenerResources.mEmMiniNumber;
				canvas.style.visibility = 'hidden';
				document.body.appendChild(canvas);
				let obj                 = JSON.parse(textarea.value);
				let img                 = new window.Image();
				img.addEventListener("load", function () {
					canvas.getContext("2d").drawImage(img, 0, 0);
				});
				img.setAttribute("src", obj[number].dataUrl);
				
				valid = (new MemMiniUtilities()).isCanvasBlank();
				canvas.remove();
			}
		}
		
		return valid;
	}
}

class MemMiniController {
	removeCommentbox(id) {
		let textbox = document.querySelector('[data-mEmMiniTextBoxCount="' + id.split('_')[1] + '"]');
		if (textbox) {
			textbox.remove();
		}
		(new MemMiniUtilities()).resize();
	}
	
	closeOptionsListboxAction() {
		let select = document.querySelector('#mEmMiniViewOptions');
		if (select) {
			select.remove();
		}
	}
	
	drawAction(count, flag) {
		(new MemMiniUtilities()).removeAllDrawCanvases(flag);
		(new MemMiniConfigurations()).clearCanvasConfiguration();
		(new DrawAction()).initializeDrawingArea(count, flag);
	}
	
	setupAction() {
		let setupAction = new SetupAction();
		setupAction.initializeDrawButtons({}, false);
		setupAction.getPinnedData();	
	}
	
	viewActionRenderOptions(count) {
		ListenerResources.mEmMiniNumber = count;
		(new MemMiniUserInterface()).createListofViewOptions(count);
		(new MemMiniUtilities()).processViewOptions({}, {flag: false, count: count});
	}
	
	viewOptionAction(event) {
	    let value = event.target.getAttribute('data-viewType');
		let methodsObj = {
			0: function () {
				(new MemMiniController).closeOptionsListboxAction();
			},
			1: function () {
				(new MemMiniController).viewAction(ListenerResources.mEmMiniNumber, true);
			},
			2: function () {
				(new MemMiniController).viewAction(ListenerResources.mEmMiniNumber, false);
			},
			3: function () {
				(new MemMiniController).viewAllAction(true);
			},
			4: function () {
				(new MemMiniController).viewAllAction(false);
			},
			5: function () {
				(new IdbAction()).getRecordByIndex(
					'mEmMiniCount', 
					ListenerResources.mEmMiniNumber, 
					true,
					1,
					(new MemMiniController).viewOneIdbAction
				);
			},
			6: function () {
				(new IdbAction()).getRecordByIndex(
					'mEmMiniCount', 
					ListenerResources.mEmMiniNumber, 
					false,
					1,
					(new MemMiniController).viewOneIdbAction
				);
			},
			7: function () {
				(new IdbAction()).getAllRecordsByPageIndex(
					'page', 
					window.location.href,
					{},
					(new MemMiniController()).viewAllWithCommentsIdbAction
				);
			},
			8: function () {
				(new IdbAction()).getAllRecordsByPageIndex(
					'page', 
					window.location.href, 
					{},
					(new MemMiniController()).viewAllIdbAction
				);
			}
		};
		
		if (typeof methodsObj[value] === "function") {
			methodsObj[value]();
		}
	}
	
	viewAllIdbAction(obj) {
		(new MemMiniController()).viewAllIdbRecords(obj, false);
	}
	
	viewAllWithCommentsIdbAction(obj) {
		(new MemMiniController()).viewAllIdbRecords(obj, true);
	}
	
	viewAllIdbRecords(data, includeComments) {
		let drawAction = new DrawAction();
		(new MessageManager()).initiateDblclickAlertMessage();
		(new SetupAction()).populateTextareasWithData(
			(new MemMiniUtilities()).convertIdbData(data)
		);
		drawAction.removeAllDrawButtons();
		if (false === includeComments) {
			drawAction.removeAllCommentBoxes();
		}
		(new MemMiniUtilities()).resize();
	}
	
	viewOneIdbAction(obj, includeComments, flag) {
		if (typeof obj.result !== "undefined") {
			if (false === includeComments) {
				(new MessageManager()).initiateDblclickAlertMessage();
			}
			
			let memMiniUtilities = new MemMiniUtilities();
			memMiniUtilities.removeAllDrawCanvases('');
			(new MemMiniConfigurations()).clearCanvasConfiguration();
			let drawAction    = new DrawAction();
			let dae           = drawAction.getDrawAreaElement(ListenerResources.mEmMiniNumber);
			let [canvas, ctx] = memMiniUtilities.getCanvasAndContext(drawAction, dae, false);
			if (true === includeComments) {
				(new MemMiniUserInterface()).createCloseMenuButton(canvas, dae);
			}
			(new DrawAction()).fillCanvas(obj.result.data, canvas, 'viewOnly', includeComments);
			drawAction.hideShowAllDrawButtons('hidden');
		}
	}
	
	viewAllAction(includeComments) {
		let mEmMiniPostData = document.querySelector("#mEmMiniPostData");
		if (mEmMiniPostData) {
			let drawAction = new DrawAction();
			(new MessageManager()).initiateDblclickAlertMessage();
			let data = JSON.parse(mEmMiniPostData.value);
			(new SetupAction()).populateTextareasWithData(data);
			drawAction.removeAllDrawButtons();
			if (false === includeComments) {
				drawAction.removeAllCommentBoxes();
			}
			(new MemMiniUtilities()).resize();
		}
	}
	
	viewAction(count, includeComments) {
		if (false === includeComments) {
			(new MessageManager()).initiateDblclickAlertMessage();
		}
		
		(new MemMiniUtilities()).removeAllDrawCanvases('');
		(new MemMiniConfigurations()).clearCanvasConfiguration();
		(new DrawAction()).initializeViewingArea(count, includeComments);
	}
	
	resizeAction() {
		(new MemMiniUtilities()).resize();
	}
	
	saveTextAction() {
		(new TextAction()).save();
	}
	
	deleteTextAction() {
		(new TextAction()).delete();
	}
	
	idbStoreDrawing(obj, canvas, flag) {
		if (true === (new MemMiniUtilities()).isCanvasBlank()) {
			(new MessageManager()).renderMessage(ERROR, NO_DRAWING_ADDED);
			
			return false;
		}
			
		let func = {
			1: function () {
				(new IdbAction()).getRecordByIndex(
					'mEmMiniCount', 
					ListenerResources.mEmMiniNumber, 
					'',
					2,
					(new MemMiniController()).idbStoreDrawing
				);
			},
			2: function () {
				let idbAction    = new IdbAction();
				let newRecordObj = idbAction.getDrawingData();
				if (typeof obj.result !== "undefined") {
					let oldRecordKey = obj.result.id;
					idbAction.deleteRecordByKey(
						newRecordObj, 
						oldRecordKey, 
						(new IdbAction()).pinDrawing
					);
				} else {
					idbAction.pinDrawing(newRecordObj);
				}
			}
		};
		
		if (typeof func[flag] === "function") {
			func[flag]();
		}
	}
	
	idbRemoveDrawing(obj, canvas, flag) { 
		let func = {
			1: function () {
				(new IdbAction()).getRecordByIndex(
					'mEmMiniCount', 
					ListenerResources.mEmMiniNumber, 
					'',
					2,
					(new MemMiniController()).idbRemoveDrawing
				);
			},
			2: function () {
				let newRecordObj = '';
				if (typeof obj.result !== "undefined") {
					let oldRecordKey = obj.result.id;
					(new IdbAction()).deleteRecordByKey(
						newRecordObj, 
						oldRecordKey, 
						(new MessageManager()).drawingDeletedFromBrowser
					);
				} 
			}
		};
		
		if (typeof func[flag] === "function") {
			func[flag]();
		}
	}
}

class TextAction {
	updateAndSaveTextToRecord(eTarget, value, flag) {
		if (1 === flag) {
			let paramsObj = {
				text: value
			};
			(new IdbAction()).updateRecordByCursor(
				value, 
				eTarget.result.data, 
				paramsObj,
				(new TextAction()).saveTextToConfigAndCloseModal
			)
		}
	}
	
	processText(value) {
		if (SERVER === Number(document.querySelector('#mEmMiniSaveText').getAttribute('data-saveTo'))) {
			let drawingData    = document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber);
			let obj            = JSON.parse(drawingData.value);
			obj.text           = value;
			let newDrawingData = JSON.stringify(obj);
			document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber).value = newDrawingData;
			this.saveTextToConfigAndCloseModal(value);
		} else {
			(new IdbAction()).getRecordByIndex(
				'mEmMiniCount', 
				ListenerResources.mEmMiniNumber, 
				value,
				1,
				(new TextAction()).updateAndSaveTextToRecord
			);
		}
	}
	
	saveTextToConfigAndCloseModal(value) {
		let text = value;
		if (typeof value === "object") {
			text = value.text;
		}
		
		MemMiniConfigurations.canvasConfiguration.text = text;
		(new MemMiniUtilities()).combineDataIntoPostData(MemMiniConfigurations.canvasConfiguration);
		(new MemMiniUserInterface()).removeModalWindow();
	}
	
	save() {
		let value = document.querySelector('#mEmMiniTextInputField').value;
		this.processText(value);
		(new DrawAction()).addTextToCanvas(value);
	}
	
	delete() {
		this.processText("");
		if (document.querySelector('#mEmMiniTextBox')) {
		    document.querySelector('#mEmMiniTextBox').remove();
		}
	}
}

class SetupAction {
	getPinnedData() {
		let currentPage = window.location.href;
		(new IdbAction()).getAllRecordsByPageIndex('page', currentPage, {}, (new SetupAction()).initializeViewPinnedButton);
	}
	
	populateTextareasWithData(data) { 
		if (data) {
			let drawAction = new DrawAction();
			for (const [number, obj] of Object.entries(data)) {
				ListenerResources.mEmMiniNumber = number;
				let memMiniUtilities = new MemMiniUtilities();
				let dae              = drawAction.getDrawAreaElement(number);
				let memminicount     = document.querySelector("[data-memminicount='" + number + "']");
				drawAction.insertConfigurations(obj);
				drawAction.saveToTextarea(obj, dae, 'mEmMiniData_');
				let [canvas, ctx]    = (new MemMiniUtilities()).getCanvasAndContext(drawAction, dae, false);
				canvas.style.opacity = obj.opacity;
				drawAction.populateCanvas(canvas, 'mEmMiniData_', 'viewOnly', '');
				memMiniUtilities.combineDataIntoPostData(obj);
				
				if ("" !== obj.text) {
					drawAction.addTextToCanvas(obj.text);
				}
				
				if (TRUE === Number(obj.readOnly) && memminicount) {
					memminicount.remove();
				}
				
				ListenerResources.menuPermissions[ListenerResources.mEmMiniNumber]
					= {readOnly: obj.readOnly, alwaysVisible: obj.alwaysVisible};
			}
		}
	}
	
	initializeViewPinnedButton(data) {
		if (data) {
			for (const [arrayKey, obj] of Object.entries(data)) {
				for (const [objKey, value] of Object.entries(obj)) {
					if ("mEmMiniCount" === objKey) {
						(new SetupAction()).createViewPinnedButton(value);
					}
				}
			}
		}
	}
	
	initializeDrawButtons(records, flag) {
		let numberArray = [];
		if (false === flag) {
			(new IdbAction()).getAllRecordsByPageIndex(
				'page', 
				window.location.href, 
				true,
				(new SetupAction()).initializeDrawButtons
			);
		} else if (true === flag) {
			if (records.length > 0) {
				records.forEach(function (value, index) {
					numberArray.push(value.mEmMiniCount);
				});
			}
		}
		
		let setupAction = new SetupAction();
		let eachMemMini = document.querySelectorAll('[data-mEmMini]');
		if (eachMemMini) {
			eachMemMini.forEach(mEmMini => setupAction.createDrawViewButtons(mEmMini, numberArray));
		}
		setupAction.addEnterButtonOption('.mEmMiniButton');
	}
	
	addEnterButtonOption(className) {
		let eachButton = document.querySelectorAll(className);
		if (eachButton) {
			eachButton.forEach(function (btn) {
				btn.addEventListener("keyup", function(event) {
					if (event.keyCode === ENTER) {
						event.preventDefault();
						event.target.click();
					  }
				}); 
			});
		}
	}
	
	createDrawViewButtonContainer(mEmMini) { 
		let container = document.querySelector('#mEmMiniDrawViewPinnedButtonContainer_' + mEmMini.getAttribute('data-mEmMini'));
		if (!container) {
			let mEmMiniRect                 = mEmMini.getBoundingClientRect();
			container                       = document.createElement("div"); 
			let offset                      = 8;
			container.id                    = 'mEmMiniDrawViewPinnedButtonContainer_' + 
				mEmMini.getAttribute('data-mEmMini');
			container.classList.add("mEmMini");
			container.style.display         = 'inline-block';
			container.style.top             = ((mEmMiniRect.bottom + window.scrollY) - offset) + "px";
			container.style.right           = ((mEmMiniRect.right + window.scrollX)) + "px";
			container.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
			container.style.zIndex          = 1;
			container.style.padding         = '4px 6px 0 6px';
			container.style.borderRadius    = '5px';
			container.style.boxShadow       = '0px 0px 7px 0px rgba(0, 0, 0, 0.75)';
		}
		
		return container;
	}
	
	createViewPinnedButton(number) {
		let container     = document.querySelector('#mEmMiniDrawViewPinnedButtonContainer_' + number);
		let mEmMini       = document.querySelector("[data-mEmMini='" + number + "']");
		let excludedArray = (new MemMiniUtilities()).getExcludedMenuOptions(mEmMini);
		
		if (
			!excludedArray.includes("pin") 
			&& !document.querySelector("[data-mEmMiniViewPinnedCount='" + number + "']")
		) {
			this.addClickEventIdb(
				this.createButton(
					mEmMini, 
					'data-mEmMiniViewPinnedCount', 
					'Edit local drawing', 
					VIEW_PINED_ICON,
					container
				)
			);
		}
	}
	
	processEditButton(excludedArray, number, permissions, mEmMini, container) {
		if (
			!excludedArray.includes("draw") 
			&& !document.querySelector("[data-mEmMiniCount='" + number + "']")
		) {
			if ('' === permissions || TRUE !== Number(permissions.readOnly)) {
				this.addClickEvent(
					this.createButton(
						mEmMini, 
						'data-mEmMiniCount', 
						'Draw', 
						DRAW_ICON,
						container
					)
				);
			}
		}
	}
	
	viewButtonConditions(excludedArray, number, numberArray) {
		return (
			!excludedArray.includes("view")
			&& !document.querySelector("[data-mEmMiniViewCount='" + number + "']")
			&& (true === (new MemMiniJsCommands()).validateRequiredDrawing(number)
			|| true === numberArray.includes(number))
		)
	}
	
	processViewButton(excludedArray, number, mEmMini, container, numberArray) { 
		if (this.viewButtonConditions(excludedArray, number, numberArray)) {
			this.addViewClickEvent(
				this.createButton(
					mEmMini, 
					'data-mEmMiniViewCount', 
					'View', 
					VIEW_ICON,
					container
				)
			);
		}
	}
	
	createDrawViewButtons(mEmMini, numberArray) {
		let number           = mEmMini.getAttribute('data-memmini');
		let container        = this.createDrawViewButtonContainer(mEmMini);
		let excludedArray    = (new MemMiniUtilities()).getExcludedMenuOptions(mEmMini);
		let permissions      = ListenerResources.menuPermissions[number] || '';
		this.processEditButton(excludedArray, number, permissions, mEmMini, container);
		this.processViewButton(excludedArray, number, mEmMini, container, numberArray);
		mEmMini.parentNode.insertBefore(container, mEmMini);
		if ("" === container.innerHTML) {
			container.remove();
		}
	}
	
	createButton(mEmMini, att, title, icon, container) {
		let canvas = document.createElement('canvas');
		canvas.setAttribute(
			att, 
			mEmMini.getAttribute('data-mEmMini')
		);
		canvas.classList.add("mEmMini");
		canvas.classList.add("mEmMiniButton");
		canvas.title                 = title;
		canvas.style.backgroundColor = 'none';
	    canvas.style.cursor          = 'pointer';
		canvas.style.margin          = '0 4px';
		canvas.width                 = 20;
		canvas.height                = 20;
		canvas.tabIndex              = 0;
		container.appendChild(canvas);

		this.addIcon(canvas, icon);
		
		return canvas;
	}
	
	addIcon(canvas, dataUrl) {
		var img = new window.Image();
		img.addEventListener("load", function () {
			canvas.getContext("2d").drawImage(img, 0, 0);
		});
		img.setAttribute("src", dataUrl);
	}
	
	addViewClickEvent(canvas) {
		canvas.addEventListener("click", function(event) {
			(new MemMiniController())
				.viewActionRenderOptions(
					event.target.getAttribute('data-mEmMiniViewCount'), 
					SERVER
				);
		});
	}
	
	addClickEventIdb(canvas) {
		canvas.addEventListener("click", function(event) {
			(new MemMiniController())
				.drawAction(
					event.target.getAttribute('data-mEmMiniViewPinnedCount'), 
					LOCAL
				);
		});
	}
	
	addClickEvent(canvas) {
		canvas.addEventListener("click", function(event) {
			(new MemMiniController())
				.drawAction(
					event.target.getAttribute('data-mEmMiniCount'), 
					SERVER
				);
		});
	}
}

class MemMiniUserInterface {
	createListofViewOptions(count) {
		if (!document.querySelector('#mEmMiniViewOptions')) {
			let viewIconElem             
				= document.querySelector('[data-mEmMiniViewCount="' + count + '"]');
			let ul                   = document.createElement('ul');
			ul.id                    = 'mEmMiniViewOptions';
			ul.classList.add("mEmMiniButton");
			ul.tabIndex              = 0;
			ul.style.display         = 'block';
			ul.style.position        = 'absolute';
			ul.style.marginTop       = '10px';
			ul.setAttribute('size', 14);
			ul.height                = 'auto';
			ul.style.height          = 'auto';
			ul.style.width           = '325px';
			ul.style.padding         = '5px';
			ul.style.cursor          = 'pointer';
			ul.style.overflowY       = 'hidden';
			ul.style.boxShadow       = '0px 0px 7px 0px rgba(0, 0, 0, 0.75)';
			ul.style.backgroundImage = 'none';
			ul.style.backgroundColor = '#ffffff';
			ul.style.zIndex          = 9999999;
			ul.innerHTML             = VIEW_OPTIONS;
			viewIconElem.parentNode.insertBefore(ul, viewIconElem.nextSibling);
			
			ul.addEventListener("click", function(event) {
			    if (event.target !== this && this.contains(event.target)) {    
			        (new MemMiniController()).viewOptionAction(event);
			    }
			});
			(new SetupAction()).addEnterButtonOption('.mEmMiniViewOptionButton');
		}
	}
	
	createFullMenuButtons(canvas, dae) {
		try {
			let container = this.createContainer(canvas, dae);
			this.closeButton(container)
				.actionsListbox(container)
				.uploadButton(container)
				.colorListbox(container)
				.sizeListbox(container)
				.opacityListbox(container);
				(new SetupAction()).addEnterButtonOption('.mEmMiniButton');
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	createModalWindow(flag, idbObj) {
		let obj = {};
		if (0 === Object.keys(idbObj).length) {
			let drawingData = document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber);
			obj = JSON.parse(drawingData.value);
		} else {
			obj = JSON.parse(idbObj.data);
		}
		
		let outerDiv                   = document.createElement("div");
        outerDiv.id                    = "mEmMiniModalWindowContainer";
        outerDiv.style.display         = "block";
        outerDiv.style.position        = "fixed";
        outerDiv.style.zIndex          = 999998;
        outerDiv.style.paddingTop      = "100px";
        outerDiv.style.left            = 0;
        outerDiv.style.top             = 0;
        outerDiv.style.width           = "100%";
        outerDiv.style.height          = "100%";
        outerDiv.style.overflow        = "auto";
        outerDiv.style.backgroundColor = "rgb(0,0,0)";
        outerDiv.style.backgroundColor = "rgba(0,0,0,0.4)"; 
		outerDiv.style.fontFamily      = DEFAULT_FONT_FAMILY;
        
        let innnerDiv                   = document.createElement("div");   
        innnerDiv.id                    = "mEmMiniModalWindow";  
		innnerDiv.style.textAlign       = "center";		
        innnerDiv.style.borderRadius    = "5px";
        innnerDiv.style.border          = "3px solid #888";
        innnerDiv.style.width           = "80%";
        innnerDiv.style.padding         = "5px 10px 10px 10px";
        innnerDiv.style.margin          = "auto auto 200px auto";
        innnerDiv.style.backgroundColor = "#fefefe";
        
        let closeBtnSpan              = document.createElement("span"); 
        closeBtnSpan.id               = "mEmMiniWindowCloseBtn";  
		closeBtnSpan.classList.add("mEmMiniButton");
        closeBtnSpan.style.display    = "block";
        closeBtnSpan.style.float      = "right";
        closeBtnSpan.style.zIndex     = 100000;
        closeBtnSpan.innerHTML        = "&times;";
        closeBtnSpan.style.cursor     = "Pointer";
        closeBtnSpan.style.fontSize   = "30px";
        closeBtnSpan.style.top        = "-5px";
        closeBtnSpan.style.position   = "relative";
        closeBtnSpan.setAttribute("title", "Close this window");
		
		let titleSpan              = document.createElement("span");  
        titleSpan.style.display    = "block";
        titleSpan.style.float      = "left";
        titleSpan.innerHTML        = "Add Text with your Drawing";
        titleSpan.style.fontSize   = "24px";
        titleSpan.style.position   = "relative";
     
        let textDiv                   = document.createElement("div");
        textDiv.id                    = "mEmMiniWindowTextCont";  
        textDiv.style.width           = "100%";
        textDiv.style.overflowY       = "auto";
		
		let textarea                  = document.createElement("textarea");
		textarea.id                   = "mEmMiniTextInputField"; 
		textarea.style.width          = "99%";	
		textarea.style.height         = "200px";	
		textarea.style.marginTop      = "10px";	
		textarea.value                = obj.text;

		let saveBtn                   = document.createElement("span");
		saveBtn.id                    = 'mEmMiniSaveText';
		saveBtn.setAttribute('data-saveTo', flag);
		closeBtnSpan.classList.add("mEmMiniButton");
		saveBtn.innerHTML             = 'Save';
		saveBtn.title                 = 'Save/edit text';
		this.sharedButtonAttributes(saveBtn);
		saveBtn.style.backgroundColor = 'green';
		saveBtn.style.display         = 'inline-block';
		
		let deleteBtn                   = document.createElement("span");
		deleteBtn.id                    = 'mEmMiniDeleteText';
		deleteBtn.setAttribute('data-deleteFrom', flag);
		closeBtnSpan.classList.add("mEmMiniButton");
		deleteBtn.innerHTML             = 'Delete Text';
		deleteBtn.title                 = 'Delete Text';
		this.sharedButtonAttributes(deleteBtn);
		deleteBtn.style.backgroundColor = '#ff0000';
		deleteBtn.style.display         = 'inline-block';
     
        document.body.appendChild(outerDiv);
        document.querySelector("#mEmMiniModalWindowContainer").appendChild(innnerDiv);
		let modalWindow = document.querySelector("#mEmMiniModalWindow");
        modalWindow.appendChild(closeBtnSpan);
		modalWindow.appendChild(titleSpan);
		modalWindow.appendChild(textarea);
		modalWindow.appendChild(saveBtn);
		modalWindow.appendChild(deleteBtn);
        modalWindow.appendChild(textDiv);
		
		(new SetupAction()).addEnterButtonOption('.mEmMiniButton');
	}
	
	removeModalWindow() {
		document.querySelector("#mEmMiniModalWindowContainer").remove();
	}
	
	createCloseMenuButton(canvas, dae) {
		try {
			let container = this.createContainer(canvas, dae);
			this.closeButton(container);
			(new SetupAction()).addEnterButtonOption('.mEmMiniButton');
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	createContainer(canvas, dae) { 
		let div = document.querySelector('#mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber);
		if (!div) {
			let daeRect            	  = dae.getBoundingClientRect();
			console.log(dae.offsetHeight);
			div                	      = document.createElement('div');
			div.id                 	  = 'mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber;
			div.style.position     	  = 'absolute';
			div.style.margin       	  = '10px';
			div.style.zIndex       	  = 2;
			div.style.top             = (dae.offsetTop + dae.offsetHeight) + 'px'; 
			div.style.padding         = '0 5px';
			div.style.backgroundColor = 'rgba(255,255,255, 0.8)';
			div.style.borderRadius    = '5px';
			div.style.boxShadow       = '0px 0px 7px 0px rgba(0, 0, 0, 0.75)';

			dae.parentNode.insertBefore(div, dae);
		}
		
		return div;
	}
	
	uploadButton(container) {
		if (!document.querySelector('#mEmMiniUploadFileLabel_' + ListenerResources.mEmMiniNumber)) {
			let mEmMini       = document.querySelector("[data-mEmMini='" + ListenerResources.mEmMiniNumber + "']");
			let excludedArray = (new MemMiniUtilities()).getExcludedMenuOptions(mEmMini);
			if (!excludedArray.includes("upload")) {
				let label = document.createElement('label');
				label.classList.add("mEmMiniButton");
				label.id = 'mEmMiniUploadFileLabel_' + ListenerResources.mEmMiniNumber;
				label.setAttribute('for', 'mEmMiniUploadFile_' + ListenerResources.mEmMiniNumber);
				label.setAttribute('accept', 'image/*');
				label.style.backgroundColor = 'none';
				label.style.cursor          = 'pointer';
				label.tabIndex              = 0;
				
				let input           = document.createElement('input');
				input.type          = 'file';
				input.setAttribute('accept', 'image/*');
				input.id            = 'mEmMiniUploadFile_' + ListenerResources.mEmMiniNumber;
				input.style.display = 'none';
				
				let canvas            = document.createElement('canvas');
				canvas.style.position = 'relative';
				canvas.style.top      = '7px';
				canvas.width          = '33';
				canvas.height         = '25';
				canvas.title          = 'Upload an image';
				(new SetupAction()).addIcon(canvas, UPLOAD_ICON);
				
				container.appendChild(label);
				container.appendChild(input);
				label.appendChild(canvas);
				
				input.addEventListener("change", function() {
				  (new DrawAction())
					.uploadImage();
				});
			}
		}
		
		return this;
	}
	
	closeButton(container) {
		if (!document.querySelector('#mEmMiniButtonClose_' + ListenerResources.mEmMiniNumber)) {
			let span                   = document.createElement('span');
			span.id                    = 'mEmMiniButtonClose_' + ListenerResources.mEmMiniNumber;
			span.innerHTML             = '&#10006;';
			span.title                 = 'Exit/done';
			span.style.display         = 'inline-block';
			this.sharedButtonAttributes(span);
			span.style.backgroundColor = '#ff0000';
			span.style.border          = 'solid 1px #ff0000';
			container.appendChild(span);
			span.addEventListener("click", function() {
			  (new DrawAction())
				.stopDraw(false);
			});
		}
		
		return this;
	}
	
	actionsListbox(container) {
		if (!document.querySelector('#mEmMiniActionsListbox_' + ListenerResources.mEmMiniNumber)) {
			let select               = document.createElement('select');
			select.id                = 'mEmMiniActionsListbox_' + ListenerResources.mEmMiniNumber;
			select.innerHTML         = ACTION_OPTIONS;
			select.title             = 'Save, edit, remove, etc...';
			this.sharedSelectAttributes(select);
			container.appendChild(select);
			select.value             = OPTIONS;
			(new MemMiniUtilities()).removeSubmenuOptions();
			select.addEventListener("change", function(event) {
				(new MemMiniConfigurations()).changeOptions(event.target);
			});
			select.style.backgroundColor = '#333333';
		}
		
		return this;
	}
	
	colorListbox(container) {
		if (!document.querySelector('#mEmMiniColorListbox_' + ListenerResources.mEmMiniNumber)) {
			let select               = document.createElement('select');
			select.id                = 'mEmMiniColorListbox_' + ListenerResources.mEmMiniNumber;
			select.innerHTML         = COLOR_OPTIONS;
			select.title             = 'Line color';
			this.sharedSelectAttributes(select);
			container.appendChild(select);
			select.value             = MemMiniConfigurations.colorConfiguration;
			select.addEventListener("change", function(event) {
				(new MemMiniConfigurations()).changeDrawColor(event.target);
			});
		}
		
		return this;
	}
	
	sizeListbox(container) {
		if (!document.querySelector('#mEmMiniSizeListbox_' + ListenerResources.mEmMiniNumber)) {
			let select               = document.createElement('select');
			select.id                = 'mEmMiniSizeListbox_' + ListenerResources.mEmMiniNumber;
			select.innerHTML         = SIZE_OPTIONS;
			select.title             = 'Line thickness';
			this.sharedSelectAttributes(select);
			container.appendChild(select);
			select.value             = MemMiniConfigurations.sizeConfiguration;
			select.addEventListener("change", function(event) {
				(new MemMiniConfigurations()).changeDrawSize(event.target);
			});
		}
		
		return this;
	}
	
	opacityListbox(container) {
		if (!document.querySelector('#mEmMiniOpacityListbox_' + ListenerResources.mEmMiniNumber)) {
			let opacityValue = MemMiniConfigurations.opacityConfiguration;
			if ("" !== MemMiniConfigurations.canvasConfiguration.opacity) {
				opacityValue = MemMiniConfigurations.canvasConfiguration.opacity;
			}
			let select               = document.createElement('select');
			select.id                = 'mEmMiniOpacityListbox_' + ListenerResources.mEmMiniNumber;
			select.innerHTML         = OPACITY_OPTIONS;
			select.title             = 'Opacity';
			this.sharedSelectAttributes(select);
			container.appendChild(select);
			select.value             = opacityValue;
			select.addEventListener("change", function(event) {
				(new MemMiniConfigurations()).changeDrawOpacity(event.target);
			});
		}
		
		return this;
	}
	
	sharedSelectAttributes(element) {
		element.classList.add("mEmMiniButton");
		element.style.margin          = '10px 5px';
		element.style.color           = '#ffffff';
		element.style.borderRadius    = '5px';
		element.style.padding         = '5px';
		element.style.backgroundColor = '#333333';
		element.tabIndex              = 0;
	}
	
	sharedButtonAttributes(element) {
		element.classList.add("mEmMiniButton");
		element.style.padding      = '.375rem .75rem';
		element.style.borderRadius = '.25rem';
		element.style.fontSize     = '.8rem';
		element.style.textAlign    = 'center';
		element.style.color        = '#ffffff';
		element.style.cursor       = 'pointer';
		element.style.margin       = '10px 5px';
		element.style.fontFamily   = DEFAULT_FONT_FAMILY;
		element.style.whiteSpace   = 'nowrap';
		element.tabIndex           = 0;
	}
}

class MemMiniConfigurations {
	static colorConfiguration    = '0,0,0';
	static sizeConfiguration     = '1';
	static opacityConfiguration  = '1';
	static canvasConfiguration   = {
		alwaysVisible: '', // 0 or 1
		readOnly: '', // 0 or 1
		opacity:'', // .5 or 1
		text: '', // varchar
		dataUrl: '' // image dataurl
	};
	
	clearCanvasConfiguration() { 
		MemMiniConfigurations.canvasConfiguration.opacity = '';
		MemMiniConfigurations.canvasConfiguration.text    = '';
		MemMiniConfigurations.canvasConfiguration.dataUrl = '';
	}
	
	changeOptions(element) { 
		let listbox      = 
			document.querySelector('#mEmMiniActionsListbox_' + ListenerResources.mEmMiniNumber);
		let actionObject = {
			1: function () {
				(new DrawAction()).stopDraw(true);
			},
			2: function () {
				(new MemMiniController()).idbStoreDrawing({}, '', 1);
			},
			3: function () {
				(new MemMiniController()).idbRemoveDrawing({}, '', 1);
			},
			4: function () {
				(new DrawAction()).clearAll();
			},
			5: function () {
				(new DrawAction()).undo();
			},
			6: function () {
				(new DrawAction()).deleteDrawing();
			},
			7: function () {
				(new DrawAction()).addText(SERVER, 1, {});
			},
			8: function () {
				(new DrawAction()).addText(LOCAL, 1, {});
			}
		};
		
		let excludeArray = []; // Add any option that shouldn't change to default
		if (typeof actionObject[element.value] === "function") {
			actionObject[element.value]();
			if (listbox && !excludeArray.includes(Number(element.value))) {
				listbox.value = OPTIONS;
			}
		}
	}
	
	changeDrawColor(element) {
		MemMiniConfigurations.colorConfiguration = element.value;
	}
	
	changeDrawSize(element) {
		MemMiniConfigurations.sizeConfiguration = element.value;
	}
	
	changeDrawOpacity(element) {
		MemMiniConfigurations.opacityConfiguration        = element.value;
		MemMiniConfigurations.canvasConfiguration.opacity = element.value;
		let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
		canvas.style.opacity = MemMiniConfigurations.opacityConfiguration;
	}
}

class CanvasListeners {
	getMousePosition(canvas, event) {
		let rect = canvas.getBoundingClientRect();
		
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
	}
	
	getTouchEvent(touch, type) {
		return new MouseEvent(type, {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
	}
	
	initializeDrawListeners(canvas, ctx, dae) {
		let drawAction = this ?? new DrawAction();
		canvas.addEventListener("mousedown", function (event) {
			ListenerResources.isDrawing = true;
			drawAction.updateHistory(canvas, dae);
			ListenerResources.lastMousePosition = drawAction.getMousePosition(canvas, event);
		}, false);
		
		canvas.addEventListener("mouseup", function (event) {
			ListenerResources.isDrawing = false;
		}, false);
		
		canvas.addEventListener("mousemove", function (event) {
			if (true === ListenerResources.isDrawing) {
				let currentMousePosition = drawAction.getMousePosition(canvas, event);
				drawAction.draw(canvas, ctx, currentMousePosition);
				ListenerResources.lastMousePosition = currentMousePosition;
			}            
		}, false);

		canvas.addEventListener("touchstart", function (event) {									
            let mouseEvent = drawAction.getTouchEvent(event.touches[0], "mousedown");
            canvas.dispatchEvent(mouseEvent);
            event.preventDefault();				        
		}, false);
					
		canvas.addEventListener("touchend", function (event) {	    
	      let mouseEvent = drawAction.getTouchEvent({}, "mousedown");
	      canvas.dispatchEvent(mouseEvent);	
	      event.preventDefault();	      
		}, false);
		
		canvas.addEventListener("touchmove", function (event) {
	      let mouseEvent = drawAction.getTouchEvent(event.touches[0], "mousemove");
	      canvas.dispatchEvent(mouseEvent);	  
	      event.preventDefault();   
		}, false);
	}
}

class DrawAction extends CanvasListeners {
	initializeDrawingArea(count, flag) {
		try { 
			let dae                         = this.getDrawAreaElement(count);
			ListenerResources.mEmMiniNumber = dae.getAttribute('data-mEmMini');
			let [canvas, ctx]               = (new MemMiniUtilities()).getCanvasAndContext(this, dae, true);
			this.initializeDrawListeners(canvas, ctx, dae);
			if (SERVER === flag) {
				this.populateCanvas(canvas, 'mEmMiniData_', '', '');
				(new MemMiniUserInterface()).createFullMenuButtons(canvas, dae);
			} else if (LOCAL === flag) {
				(new IdbAction()).getRecordByIndex(
					'mEmMiniCount', 
					count, 
					canvas, 
					'',
					(new DrawAction()).populateCanvasFromIdb
				)
			}
			this.hideShowAllDrawButtons('hidden');
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	initializeViewingArea(count, includeComments) {
		try {
			let dae                         = this.getDrawAreaElement(count);
			ListenerResources.mEmMiniNumber = dae.getAttribute('data-mEmMini');
			let [canvas, ctx]               = (new MemMiniUtilities()).getCanvasAndContext(this, dae, false);
			if (true === includeComments) {
				(new MemMiniUserInterface()).createCloseMenuButton(canvas, dae);
			}
			this.populateCanvas(canvas, 'mEmMiniData_', 'viewOnly', includeComments);
			this.hideShowAllDrawButtons('hidden');
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	addText(flag, step, obj) {
		if (true === (new MemMiniUtilities()).isCanvasBlank()) {
			(new MessageManager()).renderMessage(ERROR, ADD_TEXT_ERROR);
			
			return false;
		}
		
		if (SERVER === flag && !document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber)) {
			(new MessageManager()).renderMessage(ERROR, ADD_TEXT_ERROR);
			
			return false;
		}
	
		if (LOCAL === flag && 1 === step) {
			(new IdbAction()).hasRecord(
				'mEmMiniCount', 
				ListenerResources.mEmMiniNumber, 
				flag,
				2,
				(new DrawAction()).addText
			);
		} else {
			(new MemMiniUserInterface()).createModalWindow(flag, obj);
		}
	}
	
	hideShowAllDrawButtons(flag) {
		let eachMemMini = document.querySelectorAll('.mEmMini');
		if (eachMemMini) {
			eachMemMini.forEach(mEmMini => mEmMini.style.visibility = flag);
		}
	}
	
	removeAllDrawButtons() {
		let eachMemMini = document.querySelectorAll('.mEmMini');
		if (eachMemMini) {
			eachMemMini.forEach(mEmMini => mEmMini.remove());
		}
		
		let eachMemMiniButton = document.querySelectorAll('.mEmMiniButton');
		if (eachMemMiniButton) {
			eachMemMiniButton.forEach(mEmMiniButton => mEmMiniButton.remove());
		}
	}
	
	clearAll() {
		let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
		let ctx    = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	uploadImage() {
		let canvas   = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
		let ctx      = canvas.getContext('2d');
		let fread    = new FileReader();
		fread.onload = function(event) {
			let image    = new Image();
			image.onload = function() {
				ctx.drawImage(image, 0, 0);
			};
			image.src = event.target.result;
		};
		fread.readAsDataURL(event.target.files[0]); 
	}
	
	undo() {
		let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
		let ctx    = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.populateCanvas(canvas, 'mEmMiniHistoricData_', '', '');
	}
	
	deleteDrawing() {
		try {
		    this.removeDrawing();				
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	stopDraw(flag) {
		try {
		    this.saveDrawing(flag);				
			this.closeAll(false);
		} catch (error) {
			if (true === SHOW_ERRORS) {
				console.log(error);
			}
		}
	}
	
	renderAlwaysVisible() {
		if ("" !== ListenerResources.responseDataTextareaId) {
			let responseTextarea = document.querySelector('#' + ListenerResources.responseDataTextareaId);
			if (responseTextarea) {
				let data      = JSON.parse(responseTextarea.value);
				let newObj    = {};
				let hasRecord = false;
				if (typeof data === "object") {
					for (const [number, obj] of Object.entries(data)) {
						if (TRUE === Number(obj.alwaysVisible)) {
							newObj[number] = obj;
							hasRecord = true;
						}
					}
						
				}
				
				if (true === hasRecord) {
					(new SetupAction()).populateTextareasWithData(newObj);
				}
			}
		}
	}
	
	removeSpecific(flag) {
		if (false === flag) {
			let container = document.querySelector('#mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber);
			let mEmMini   = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
			if (container) {
				document.querySelector('#mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber).remove();
			}
			if (mEmMini) {
				document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber).remove();
			}
		}
	}
	
	removeEverything(flag) {
		if (true === flag) {
			this.removeAllButtonContainers();
			(new MemMiniUtilities()).removeAllDrawCanvases('');
		}
	}
	
	removeAllButtonContainers() {
		let mEmMiniButtonContainer = document.querySelectorAll("[id^='mEmMiniButtonContainer_']");
		if (mEmMiniButtonContainer) {
			mEmMiniButtonContainer.forEach(eachMEmMiniButtonContainer => eachMEmMiniButtonContainer.remove());
		}
	}
	
	removeAllCommentBoxes() {
		let mEmMiniTextBox = document.querySelectorAll('.mEmMiniTextBox');
		if (mEmMiniTextBox) {
			mEmMiniTextBox.forEach(box => box.remove());
		}
	}
	
	closeAll(flag) {
		this.removeSpecific(flag);
		this.removeEverything(flag);
		this.removeAllDrawButtons();
		let setupAction = new SetupAction();
		setupAction.initializeDrawButtons({}, false);
		setupAction.getPinnedData();
		this.renderAlwaysVisible();
	}
	
	removeDrawing() {
		(new MemMiniUtilities()).removeDataInPostData();
		let data = document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber);
		let hist = document.querySelector('#mEmMiniHistoricData_' + ListenerResources.mEmMiniNumber);
		if (data) {
			data.remove();
			if (hist) {
				hist.remove();
			}
			this.closeAll(false);
			
			return false;
		}

		(new MessageManager()).renderMessage(ERROR, DELETE_ERROR);
	}
	
	saveDrawing(flag) { 
		if (true === flag) {
			if (true === (new MemMiniUtilities()).isCanvasBlank()) {
				(new MessageManager()).renderMessage(ERROR, NO_DRAWING_ADDED);
				
				return false;
			}
			
			let dae    = this.getDrawAreaElement(ListenerResources.mEmMiniNumber);
			let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
			this.saveToTextarea(canvas, dae, 'mEmMiniData_');
		}
	}
	
	updateHistory(canvas, dae) {	
		this.saveToTextarea(canvas, dae, 'mEmMiniHistoricData_');
	}
	
	saveToTextarea(canvas, dae, name) {
		let flag     = false;
		let textarea = document.querySelector('#' + name + ListenerResources.mEmMiniNumber);

		if (!canvas.hasOwnProperty('dataUrl')) {
			flag = true;
			MemMiniConfigurations.canvasConfiguration.dataUrl = canvas.toDataURL();
		} else {
			MemMiniConfigurations.canvasConfiguration.dataUrl = canvas.dataUrl;
		}
		
		if (!textarea) {
			textarea                  = document.createElement('textarea');
			textarea.id               = name + ListenerResources.mEmMiniNumber;
			textarea.name             = name + ListenerResources.mEmMiniNumber;
			textarea.style.visibility = 'hidden';
			textarea.style.position   = 'absolute';
			dae.parentNode.insertBefore(textarea, dae.nextSibling);
		}
        textarea.value = JSON.stringify(MemMiniConfigurations.canvasConfiguration);
		
		if (true === flag && 'mEmMiniData_' === name) {
			(new MemMiniUtilities()).combineDataIntoPostData(MemMiniConfigurations.canvasConfiguration);
			(new MessageManager()).renderMessage(SUCCESS, 'Drawing saved');
		}
	}
	
	draw(canvas, ctx, currentMousePosition) { 
		ctx.beginPath();
		ctx.globalCompositeOperation = "source-over";
		ctx.strokeStyle = 'rgba(' + MemMiniConfigurations.colorConfiguration + ', 1)';
		if ("eraser" === MemMiniConfigurations.colorConfiguration) {
			ctx.globalCompositeOperation = "destination-out";
		} 
        ctx.imageSmoothingEnabled = true;
        ctx.lineCap               = 'round';
        ctx.lineJoin              = 'round';
        ctx.lineWidth             = MemMiniConfigurations.sizeConfiguration;
        ctx.moveTo(
			Number(ListenerResources.lastMousePosition.x), 
			Number(ListenerResources.lastMousePosition.y)
		);
        ctx.lineTo(
			Number(currentMousePosition.x), 
			Number(currentMousePosition.y)
		);
        ctx.stroke();
		ctx.closePath();
	}
	
	populateCanvasFromIdb(obj, canvas) {
		(new DrawAction()).fillCanvas(obj.result.data, canvas, '', '');
	}
	
	populateCanvas(canvas, name, viewType, includeComments) {
		let textarea = document.querySelector('#' + name + ListenerResources.mEmMiniNumber);
		if (null !== textarea && "" !== textarea.value) {
            this.fillCanvas(textarea.value, canvas, viewType, includeComments);
        }
	}
	
	fillCanvas(string, canvas, viewType, includeComments) {
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let obj = JSON.parse(string);
		let img = new window.Image();
		img.addEventListener("load", function () {
			canvas.getContext("2d").drawImage(img, 0, 0);
		});
		img.setAttribute("src", obj.dataUrl);
		ctx.globalCompositeOperation = "source-over";
		this.addCanvasConfigurations(canvas, obj, viewType, includeComments);
	}
	
	insertConfigurations(obj) {
		MemMiniConfigurations.canvasConfiguration.readOnly      = obj.readOnly;
		MemMiniConfigurations.canvasConfiguration.alwaysVisible = obj.alwaysVisible;
		MemMiniConfigurations.canvasConfiguration.opacity       = obj.opacity;
		MemMiniConfigurations.canvasConfiguration.text          = obj.text;
		MemMiniConfigurations.canvasConfiguration.dataUrl       = obj.dataUrl;
	}
	
	addCanvasConfigurations(canvas, obj, viewType, includeComments) {
		this.insertConfigurations(obj);
		canvas.style.opacity = obj.opacity;
		this.fullMenuButtonsCondition(viewType, canvas, obj);
		if (false !== includeComments) {
			this.addTextToCanvas(obj.text);
		}
	}
	
	fullMenuButtonsCondition(viewType, canvas) {
		if ('viewOnly' !== viewType) {
			let dae = this.getDrawAreaElement(ListenerResources.mEmMiniNumber);
			(new MemMiniUserInterface()).createFullMenuButtons(canvas, dae);
		}
	}
	
	addTextToCanvas(text) {
		if (!document.querySelector('[data-mEmMiniTextBoxCount="' + ListenerResources.mEmMiniNumber + '"]') && "" !== text) {
			let formattedText = '<div>' +
				'<span id="mEmMiniTextBoxHide_' + ListenerResources.mEmMiniNumber + '" class="mEmMiniTextBoxHide" title="Hide comment" style="float: right; cursor: pointer; position: relative; bottom: 10px;">' +
				'&#10006;' +
				'</span>' +
				'</div>' +
				'<div style="margin: 5px; position: relative; z-index: 1;">' + text + '</div>';
			let bgColor               = '#00bfb6';
			let div                   = document.createElement("div");  
			div.id                    = 'mEmMiniTextBox';
			div.classList.add("mEmMiniTextBox");
			div.setAttribute('data-mEmMiniTextBoxCount', ListenerResources.mEmMiniNumber);
			div.innerHTML             = formattedText.replace(/(?:\r\n|\r|\n)/g, '<br>');
			div.style.borderRadius    = '5px';
            div.style.padding         = '10px';
			div.style.margin          = '10px 5px';
			div.style.fontFamily   	  = DEFAULT_FONT_FAMILY;
			div.style.backgroundColor = bgColor;
			div.style.color           = '#ffffff';
			
			let triangle                = document.createElement("div");
			triangle.classList.add("mEmMiniTextBox");
			triangle.setAttribute('data-mEmMiniTextBoxTriCount', ListenerResources.mEmMiniNumber);
			triangle.style.position     = 'absolute';
			triangle.style.width        = 0;
			triangle.style.height       = 0; 
			triangle.style.borderBottom = '20px solid ' + bgColor;
			triangle.style.borderLeft   = '20px solid transparent';
			
			let container = document.querySelector('#mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber);
			if (container) {
				container.appendChild(div);
			} else { 
				div.style.width = '200px';
				let dae = (new DrawAction()).getDrawAreaElement(ListenerResources.mEmMiniNumber);
				dae.parentNode.insertBefore(div, dae.nextSibling);
				this.adjustSpeechBubbleTri(triangle, div);
				div.appendChild(triangle);
			}
			this.addClickEventToHideComment();	
		}
	}
	
	addClickEventToHideComment() {
		let textboxes = document.querySelectorAll('.mEmMiniTextBoxHide');
		if (textboxes) {
			textboxes.forEach(function (textbox) {
				textbox.addEventListener("click", function(event) {
					 (new MemMiniController()).removeCommentbox(event.target.id);
				});
			});
		}
	}
	
	adjustSpeechBubbleTri(triangle, div) {
		let divPosition     = div.getBoundingClientRect();
		triangle.style.top  = (div.offsetTop - 14) + 'px';
		triangle.style.left = (div.offsetLeft + div.offsetWidth/2) + 'px';
	}
	
	wrapCanvasAroundDrawAreaElement(dae, isDraw) {
		let width             = dae.offsetWidth;
		let height            = dae.offsetHeight;
		let top               = dae.offsetTop; 
		let left              = dae.offsetLeft; 
		let canvas            = document.createElement('canvas');
		canvas.id             = 'mEmMini_' + ListenerResources.mEmMiniNumber;
		canvas.style.position = 'absolute';
		canvas.width          = width;
		canvas.height         = height;
		canvas.style.top      = Number(top - 1) + "px";
		canvas.style.left     = Number(left - 2) + "px";
		canvas.style.zIndex   = 999999;
		if (true === isDraw) {
			canvas.style.border   = 'dashed 2px #ff0000';
		}
		dae.parentNode.insertBefore(canvas, dae);
		
		return [canvas, canvas.getContext('2d')];
	}
	
	getDrawAreaElement(count) { 
		let element = document.querySelector('[data-mEmMini="' + count + '"]');
		if (!element) {
			throw ERROR_NO_AREA;
		}
		
		return element;
	}
}

class IdbAction {
	initializeDb() {
        let request = window.indexedDB.open("mEmMini", 1);

        request.onerror = function(){
            window.indexedDB.deleteDatabase("mEmMini");
            (new MessageManager()).renderMessage(ERROR, IDB_INIT_ERROR);
        };

        request.onupgradeneeded = function(event) {
            if (Number(event.oldVersion) > 0
                && (
                    Number(event.oldVersion) !== Number(1)
                )
            ) {
                window.indexedDB.deleteDatabase("mEmMini");
            } else {
                let db    = request.result;
                let store = db.createObjectStore(
                    "objectStore",
                    {keyPath: "id", autoIncrement: true}
                );				
				store.createIndex("mEmMiniCount", "mEmMiniCount", {unique: false});
				store.createIndex("page", "page", {unique: false});
            }
        };

        return request;
    }
	
	getDrawingData() {
		let dataString = '';
		if (!document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber)) {
			let dae    = (new DrawAction()).getDrawAreaElement(ListenerResources.mEmMiniNumber);
			let canvas = document.querySelector('#mEmMini_' + ListenerResources.mEmMiniNumber);
			MemMiniConfigurations.canvasConfiguration.dataUrl = canvas.toDataURL();
			dataString = JSON.stringify(MemMiniConfigurations.canvasConfiguration);
		} else {
			dataString = document.querySelector('#mEmMiniData_' + ListenerResources.mEmMiniNumber).value;
		}
		
		return {
			mEmMiniCount: ListenerResources.mEmMiniNumber,
			page: window.location.href,
			data: dataString
		};
	}
	
	getAllRecordsByPageIndex(indexValue, searchValue, extraParams, callbackFunction) {
		let idbAction = new IdbAction();
		let open      = this.initializeDb();
        open.onsuccess = function() {
            let resources       = idbAction.dbResources(open);
            let index           = resources.store.index(indexValue);
            let getRecord       = index.getAll(searchValue);
            getRecord.onsuccess = function(event) {
                if (typeof callbackFunction === "function") {
                    callbackFunction(event.target.result, extraParams);

                    return false;
                }
            };
            idbAction.storageTransactionComplete(resources);
        };
		
		open.onerror = function() {
			(new MessageManager()).renderMessage(ERROR, 'Could not get all records by key');
			
			return false;
		};
	}
	
	updateRecordByCursor(newText, oldData, paramsObj, callBackFunc) {
		let idbAction = new IdbAction();
		let open      = this.initializeDb();
        open.onsuccess = function() {
            let resources    = idbAction.dbResources(open);
			let getAll       = resources.store.openCursor(null);
            getAll.onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    if (JSON.stringify(cursor.value.data) === JSON.stringify(oldData)) {
						let cursorValue   = cursor.value;
						let data		  = JSON.parse(cursor.value.data);
						data.text         = newText;
						cursorValue.data  = JSON.stringify(data);
                        let request       = cursor.update(cursorValue);
                        request.onsuccess = function () {
                            callBackFunc(paramsObj);
							
							return false;
                        };
                    } else {
                        cursor.continue();
                    }
                }
            };
            idbAction.storageTransactionComplete(resources);
        };
		
		open.onerror = function() {
			(new MessageManager()).renderMessage(ERROR, 'Could not get record by index');
			
			return false;
		};
	}
	
	getRecordByIndex(indexType, count, canvas, flag, callBackFunc) {
		let idbAction = new IdbAction();
		let open      = this.initializeDb();
        open.onsuccess = function() {
            let resources       = idbAction.dbResources(open);
            let index           = resources.store.index(indexType);
			let getRecord       = index.get(count);
            getRecord.onsuccess = function(event) {
                callBackFunc(event.target, canvas, flag);
            };
           
            getRecord.onerror = function(event) {
                (new MessageManager()).renderMessage(ERROR, 'Could not get data');
				
				return false;
            };
            idbAction.storageTransactionComplete(resources);
        };
		
		open.onerror = function() {
			(new MessageManager()).renderMessage(ERROR, 'Could not get record by index');
			
			return false;
		};
	}
	
	hasRecord(indexType, count, flag, step, callBackFunc) {
		let idbAction = new IdbAction();
		let open      = this.initializeDb();
        open.onsuccess = function() {
            let resources       = idbAction.dbResources(open);
            let index           = resources.store.index(indexType);
			let getRecord       = index.get(count);
            getRecord.onsuccess = function(event) {
				if (typeof event.target.result !== "undefined") {
					callBackFunc(flag, step, event.target.result);
				} else {
					(new MessageManager()).renderMessage(ERROR, 'Please save a record first');
				}
				
				return false;
            };
           
            getRecord.onerror = function(event) {
                (new MessageManager()).renderMessage(ERROR, 'Could not get data');
				
				return false;
            };
            idbAction.storageTransactionComplete(resources);
        };
		
		open.onerror = function() {
			(new MessageManager()).renderMessage(ERROR, 'Could not get record by index');
			
			return false;
		};
	}
	
	deleteRecordByKey(obj, key, callBackFunc) {
		let idbAction = new IdbAction();
		let open      = this.initializeDb();
        open.onsuccess = function() {
            let resources = idbAction.dbResources(open);
            let request   = resources.store.delete(key);
            request.onsuccess = function(event) {
                callBackFunc(obj);
            };

            request.onerror = function(event) {
                (new MessageManager()).renderMessage(ERROR, 'Could not delete data');
				
				return false;
            };
            idbAction.storageTransactionComplete(resources);
        };
		
		open.onerror = function() {
			(new MessageManager()).renderMessage(ERROR, 'Could not delete record by key');
			
			return false;
		};
	}
	
	pinDrawing(obj) {
		let idbAction = new IdbAction();
		let open      = idbAction.initializeDb();
		open.onsuccess = function() {
			let resources = idbAction.dbResources(open);
			let request   = resources.store.add(obj);
			request.onsuccess = function(event) {
				(new MessageManager()).renderMessage(SUCCESS, 'Drawing saved to browser');
			};
			idbAction.storageTransactionComplete(resources);
		};

		open.onerror = function() {
			(new MessageManager()).renderMessage(ERROR, 'Could not save data');
			
			return false;
		};
	}

    dbResources = function (openDb) {
        let db    = openDb.result;
        let tx    = db.transaction("objectStore", "readwrite");
        let store = tx.objectStore("objectStore");

        return {
            "db": db,
            "tx": tx,
            "store": store
        };
    };
    
    storageTransactionComplete = function(resources){
        resources.tx.oncomplete = function() {
            resources.db.close();
        };
    };
}

class MessageManager {
	renderMessage(flag, msg) {
		if (!document.querySelector('#mEmMiniMessageAlert')) {
			let msgContainer                    = document.createElement('div');
			msgContainer.id                     = 'mEmMiniMessageAlert';
			msgContainer.style.color            = '#ffffff';
			msgContainer.style.fontWeight       = 'bold';
			msgContainer.style.fontFamily       = DEFAULT_FONT_FAMILY;
			msgContainer.innerHTML              = msg; 
			msgContainer.style.backgroundColor  = flag;
            msgContainer.style.padding          = '5px 10px';
			msgContainer.style.position         = 'absolute';
			msgContainer.style.zIndex           = 1;
			msgContainer.style.border           = 'solid 1px #333333';
			msgContainer.style.borderRadius     = '5px';

			let menuContainer = document.querySelector('#mEmMiniButtonContainer_' + ListenerResources.mEmMiniNumber);
			menuContainer.prepend(msgContainer);
			
			setTimeout(function() { 
				if (document.querySelector('#mEmMiniMessageAlert')) {
					document.querySelector('#mEmMiniMessageAlert').remove();
				}
			}, WARNING_ALERT_TIME);
		}
	}
	
	drawingDeletedFromBrowser() {
		(new MessageManager()).renderMessage(SUCCESS, 'Drawing deleted from browser');
		setTimeout(function() { 
			(new DrawAction()).closeAll(false);
		}, WARNING_ALERT_TIME);
	}
	
	initiateDblclickAlertMessage() {
		alert('Double click/tap screen when done viewing');
		document.body.addEventListener("dblclick", function(event) {
			(new DrawAction()).closeAll(true); 
		}, { once: true });
	}
}

