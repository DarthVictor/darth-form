'use strict';

var formDefinition = JSON.parse(formResponse.definition.form)
var rootElement = document.getElementById('mainform')
addForm(rootElement, formDefinition)
addEmptySectionToForm(rootElement, 'Новая секция')
moveSectionTo(rootElement, 1, 5)
moveSectionTo(rootElement, 6, 1)


function transliterate(word) {
	var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};
	return (''+word).split('').map(function (char) {
		return a[char] || char;
	}).join("");
}

function toHref(word) {
	return encodeURIComponent(transliterate(word));
}

function hashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


function addForm(rootElem, formDefinition) {
	function getFormHeaders(rootElem, formDefinition) {
		var title = document.createElement('h2');
		title.textContent = formDefinition.title;
		rootElem.appendChild(title);
	}

	function getFormSections(rootElem, formDefinition) {
		var panel_group = document.createElement('div');
		panel_group.className = 'panel-group';
		rootElem.appendChild(panel_group);
		var sections = _.map(_.sortBy(formDefinition.sectionList, function (section) {
					return section.sectionOrder
				}),
				function (orderedSection) {
				return getSectionFromDefinition(orderedSection, rootElem.id)
			});
		_.each(sections, function (section) {
			panel_group.appendChild(section);
		});
	}

	getFormHeaders(rootElem, formDefinition)
	getFormSections(rootElem, formDefinition)
}

function getSectionFromDefinition(sectionDefinition, formId, alwaysClosed) {
	var section = document.createElement('div');
	section.className = "panel panel-default";

	var panel_heading = document.createElement('div');
	section.appendChild(panel_heading);
	panel_heading.className = "panel-heading";

	var panel_title = document.createElement('h4');
	panel_heading.appendChild(panel_title);
	panel_title.className = "panel-title";

	var link_header = document.createElement('a');
	panel_title.appendChild(link_header);
	link_header.dataset.toggle = 'collapse';
	link_header.dataset.parent = formId;
	link_header.href = '#' + formId + '_collapse_' + hashCode(sectionDefinition.sectionName);
	link_header.textContent = sectionDefinition.sectionName;

	var panel_collapse = document.createElement('div');
	panel_collapse.className = 'panel-collapse collapse' + (sectionDefinition.sectionOrder == 1 && !alwaysClosed ? ' in' : '');
	panel_collapse.id = formId + '_collapse_' + hashCode(sectionDefinition.sectionName);
	section.appendChild(panel_collapse);

	panel_collapse.appendChild(getSectionBody(sectionDefinition));

	return section;
}

function getSectionBody(sectionDefinition) {
	var panel_body = document.createElement('div');
	panel_body.className = 'panel-body';
	var matrix = getOneSectionFormMatrix(sectionDefinition.fieldList);
	_.each(matrix, function (row) {
		if (row.length > 0) {
			var row_div = document.createElement('div');
			row_div.className = 'row';
			panel_body.appendChild(row_div);
			_.each(row, function (cell) {
				var col_div = document.createElement('div');
				row_div.appendChild(col_div);
				col_div.className = cell.span_offset;

				var fieldset = document.createElement('fieldset');
				col_div.appendChild(fieldset);

				var control_group = document.createElement('div');
				control_group.className = 'control-group';
				col_div.appendChild(control_group);

				var label = document.createElement('label');
				control_group.appendChild(label);
				label.setAttribute('for', 'input_' + cell.id);
				label.textContent = cell.label || cell.id;

				var input = document.createElement('input');
				control_group.appendChild(input);
				input.id = 'input_' + cell.id;
				input.className = 'form-control';
				input.type = 'text';
			});
		}
	});
	return panel_body;
}

function getOneSectionFormMatrix(fieldsObject, CssFrameworkProperties) {

	/*
	Получение матрицы элементов, в который каждый из элементов будет расположен
	на сетке N*4. Элементы представляют что-то вида {id: 'name', span_offset:'col-sm-3 col-sm-offset-6', 'order' : {'row':1, 'col1':1, 'col2':2}}
	Использует заполняет только непостредственно форматирование формы, Виджеты и
	данные проставляются в fillFormMatrix
	 */
	CssFrameworkProperties = CssFrameworkProperties || { //Bootstrap3 by default
		columnWidthClass : 'col-sm-',
		columnOffsetClass : 'col-sm-offset-',
		minColumnsInField : 3
	}
	var matrix = [];
	if (fieldsObject) { // заполняем матрицу из заголовка
		_.each(fieldsObject, function (value, key, list) {
			if (!!value.order) {
				var rowNum = value.order.row - 1;
				var el = {
					id : key,
					order : value.order
				};
				if (matrix[rowNum]) {
					matrix[rowNum].push(el);
				} else {
					matrix[rowNum] = [el];
				}
			}
		});

		matrix = _.map(_.compact(matrix), function (row, row_index) { //удаляем пустые строки
				var newRowUnordered = _.map(row, function (cell, cell_index) {
						cell.order.row = row_index; //обновляем индекс
						return cell;
					});
				var newRow = _.sortBy(newRowUnordered, // сортировка элементов строки
						function (cell) { // по первой занимаемой элементом колонке
						cell.order.col1
					});
				var previousCol = 0;
				for (var j = 0; j < newRow.length; j++) {
					newRow[j].span_offset = CssFrameworkProperties.columnWidthClass
						 + ((newRow[j].order.col2 - newRow[j].order.col1 + 1) * CssFrameworkProperties.minColumnsInField);
					if (newRow[j].order.col1 - previousCol > 1) {
						newRow[j].span_offset += CssFrameworkProperties.columnOffsetClass
						 + ((newRow[j].order.col1 - previousCol - 1) * CssFrameworkProperties.minColumnsInField);
					}
					previousCol = newRow[j].order.col2;
				}
				return newRow;
			});

	}
	return matrix;
}; //getOneSectionFormMatrix

function addEmptySectionToForm(rootElem, sectionName, sectionOrder) {
	console.log(rootElem.querySelector('.panel-group'));
	var panelElem = rootElem.querySelector('.panel-group');
	if (!sectionOrder || sectionOrder > panelElem.childNodes.length || sectionOrder <= 0) {
		sectionOrder = panelElem.childNodes.length + 1
	}
	var sectionDefinition = {
		sectionName : sectionName,
		sectionOrder : sectionOrder,
		fieldList : null
	};
	var section = getSectionFromDefinition(sectionDefinition, rootElem.id, true);
	if (sectionOrder > panelElem.childNodes.length) {
		panelElem.appendChild(section);
	} else {
		panelElem.insertBefore(section, panelElem.childNodes[sectionOrder - 1])
	}
}

function moveSectionTo(rootElem, from, to){
	var panelElem = rootElem.querySelector('.panel-group');
	if (!to || to > panelElem.childNodes.length || to <= 0) {
		sectionOrder = panelElem.childNodes.length + 1
	}
	if(from < 1 || from > panelElem.childNodes.length || from <= 0){
		throw new Error('Недопустимый индекс для поля "from" = ' + from);
	}
	if (from != to){
		if (to > from){ // Если мы передвигаем элемент с первого места на третье, 
			to += 1;	// то его нужно вставлять перед четвертым элементом,
						// поскольку перед вставкой элемент удаляется с предыдущего места 
						// и старый четвертый становится третьим.
		}
		panelElem.insertBefore(panelElem.childNodes[from - 1], panelElem.childNodes[to - 1])
	}
}