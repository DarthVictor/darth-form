'use strict';
var Bootstrap3CssFrameworkProperties = { //Bootstrap3 by default
    columnWidthClass : 'col-sm-',
    columnOffsetClass : 'col-sm-offset-',
    minColumnsInField : 3,
    maxColumnsInField : 12,
    maxFieldsInRow: 4
}
var CssFrameworkProperties = Bootstrap3CssFrameworkProperties; //Bootstrap3 by default
var formDefinition = formPassportOfTheRailwaySectionSettlement;
var rootElement = document.getElementById('mainform')
if (!rootElement){
    var rootElement = document.createElement('div')
    rootElement.id = 'mainform';
    document.body.appendChild(rootElement)
}else{
    // var t = new Date(); 
    // for (var i = 0; i < 1000; i++){
        // addForm(rootElement, formPassportOfTheRailwaySectionSettlement)    
        // removeForm(rootElement)
    // }
    // var t1 = new Date();
    // console.log((t1.getSeconds() - t.getSeconds())*1000 + t1.getMilliseconds() - t.getMilliseconds());

    addForm(rootElement, formPassportOfTheRailwaySectionSettlement)
    // addEmptySectionToForm(rootElement, 'Новая секция')
    // moveSectionTo(rootElement, 1, 5)
    // removeSection(rootElement, 10)
    // insertRowWithScheme(rootElement, 0, 3, {TEST: {
					// "order" : {
						// "row" : 1,
						// "col1" : 0,
						// "col2" : 1
					// }
				// }})

}

function transliterate(word) {
    var a = {'Ё':'YO','Й':'I','Ц':'TS','У':'U','К':'K','Е':'E','Н':'N','Г':'G','Ш':'SH','Щ':'SCH','З':'Z','Х':'H','Ъ':'\'','ё':'yo','й':'i','ц':'ts','у':'u','к':'k','е':'e','н':'n','г':'g','ш':'sh','щ':'sch','з':'z','х':'h','ъ':'\'','Ф':'F','Ы':'I','В':'V','А':'a','П':'P','Р':'R','О':'O','Л':'L','Д':'D','Ж':'ZH','Э':'E','ф':'f','ы':'i','в':'v','а':'a','п':'p','р':'r','о':'o','л':'l','д':'d','ж':'zh','э':'e','Я':'Ya','Ч':'CH','С':'S','М':'M','И':'I','Т':'T','Ь':'\'','Б':'B','Ю':'YU','я':'ya','ч':'ch','с':'s','м':'m','и':'i','т':'t','ь':'\'','б':'b','ю':'yu'};
    return (''+word).split('').map(function (char) {
        return a[char] || char;
    }).join('');
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
        panel_group.id = '' + rootElem.id + '_panelgroup';
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
function removeForm(rootElem){
    while(rootElem.childNodes.length > 0) rootElem.removeChild(rootElem.childNodes[0]);
}

function getSectionFromDefinition(sectionDefinition, formId, alwaysClosed) {
    function getSectionCollapseId(formId, sectionName){
        return '' + formId + '_collapse_' + hashCode(sectionName);
    }
    function getSectionId (formId, sectionName){
        return '' + formId + '_' + hashCode(sectionName);
    }
    var section = document.createElement('div');
    section.className = 'panel panel-default';
    var sectionId = getSectionId(formId, sectionDefinition.sectionName);
    var sectionCollapseId = getSectionCollapseId(formId, sectionDefinition.sectionName)
    section.id = sectionId;
    var panel_heading = document.createElement('div');
    section.appendChild(panel_heading);
    panel_heading.className = 'panel-heading';

    var panel_title = document.createElement('h4');
    panel_heading.appendChild(panel_title);
    panel_title.className = 'panel-title';

    var link_header = document.createElement('a');
    panel_title.appendChild(link_header);
    link_header.dataset.toggle = 'collapse';
    link_header.dataset.parent = '#' + formId;
    link_header.dataset.section = '#' + sectionId;
    link_header.href = '#' + sectionCollapseId;
    link_header.textContent = sectionDefinition.sectionName;
    link_header.onclick = onSectionClick;

    var panel_collapse = document.createElement('div');
    panel_collapse.className = 'panel-collapse collapse' + (sectionDefinition.sectionOrder == 0 && !alwaysClosed ? ' in' : '');
    panel_collapse.id = sectionCollapseId;
    section.appendChild(panel_collapse);

    //TODO: реализация ленивой загрузки
    var sectionBody = getSectionBody(sectionDefinition, sectionId);
    sectionBody.dataset.section = '#' + sectionId;
    panel_collapse.appendChild(sectionBody);
    
    updateSectionScheme(section);
    // console.log(JSON.parse(section.dataset.scheme), sectionDefinition.fieldList, 
        // _.isEqual(JSON.parse(section.dataset.scheme), sectionDefinition.fieldList));
    return section;
}

function updateSectionScheme(section){
    var sectionBody = section.childNodes[1].childNodes[0];
    section.dataset.scheme = JSON.stringify(getSchemeFromSectionElements(sectionBody));
}

function getSchemeFromSectionElements(sectionBody){       
    var sectionScheme = {};
    _.each(sectionBody.childNodes, function(row, rowNum){
        var rowScheme = _.map(row.childNodes, function(cell, cellNum){
            var reWidth  = new RegExp(CssFrameworkProperties.columnWidthClass + '(\\d*)')
            var reOffset = new RegExp(CssFrameworkProperties.columnOffsetClass + '(\\d*)')
            return {
                name: cell.id,
                width: (parseInt(reWidth.exec(cell.className)[1])|| 0)/CssFrameworkProperties.minColumnsInField,
                offset: (parseInt(reOffset.exec(cell.className)[1])|| 0)/CssFrameworkProperties.minColumnsInField
            };
        })
        var col1 = -1;
        _.each(rowScheme, function(cellScheme){
            col1 = col1 + cellScheme.offset + 1
            sectionScheme[cellScheme.name] = {
                order: {
                    row: rowNum,
                    col1: col1,
                    col2: col1 + cellScheme.width - 1
                }
            };
            col1 = sectionScheme[cellScheme.name].order.col2;
        });
    })
    return sectionScheme    
}

function getSectionBody(sectionDefinition, sectionId) {
    var panel_body = document.createElement('div');
    panel_body.className = 'panel-body';
    var matrix = getOneSectionMatrix(sectionDefinition.fieldList);
    _.each(matrix, function (row, rowNum) {
        if (row.length > 0){
            panel_body.appendChild(getRowBody(row, sectionId));
        }
    });
    return panel_body;
}


function getRowBody(row, sectionId) {
    var row_div = document.createElement('div');
    row_div.className = 'row';
    row_div.dataset.sectionId = sectionId
    row_div.getScheme = function (){
        return JSON.parse(document.getElementById(this.dataset.sectionId).dataset.scheme);
    }
    _.each(row , function (cell) {
        row_div.appendChild(getCellBody(cell));               
    });        
    return row_div;
}

function getCellBody(cell /*{span_offset, id, label}*/) {
    var fieldset = document.createElement('fieldset');
    fieldset.className = cell.span_offset;
    fieldset.id = cell.id;
    fieldset.onclick = onFieldClick;

    var control_group = document.createElement('div');
    control_group.className = 'control-group';
    fieldset.appendChild(control_group);

    var label = document.createElement('label');
    control_group.appendChild(label);
    label.setAttribute('for', 'input_' + cell.id);
    label.textContent = cell.label || cell.id;

    var input = document.createElement('input');
    control_group.appendChild(input);
    input.id = 'input_' + cell.id;
    input.className = 'form-control';
    input.type = 'text';
    return fieldset;
}

function getSectionOrderFromQuerySelector(querySelector){
    var section = document.querySelector(querySelector);
    var sectionOrder = 0;
    _.each(section.parentNode.childNodes, function(child, index){
        if (section.id == child.id){
            sectionOrder = index + 0;
        }
    });
    if (sectionOrder >= 0){
        return sectionOrder;
    }
    else{
        throw new Error('Неизвестный селектор: ' + querySelector);
    }
}    

function onSectionClick(){
    var sectionOrder = getSectionOrderFromQuerySelector(this.dataset.section);
    console.log('Выбрана секция ' + sectionOrder);
}

function onFieldClick(){
    //console.log(this.parentNode.getScheme)
    var sectionScheme = this.parentNode.getScheme();
    var self = this;
    //console.log(sectionScheme, self.id)
    var fieldScheme = _.find(sectionScheme, function(field, fieldName){
        return fieldName === self.id;
    });
    var fieldOrder = {};
    fieldOrder.section = getSectionOrderFromQuerySelector(this.parentNode.parentNode.dataset.section);
    if(!!fieldScheme){
        _.extend(fieldOrder, fieldScheme.order);
    }
    else{
        throw new Error('Неправильно определено поле: ' + this.id);
    }
    console.log('Выбрано поле ' + this.id + ' c координатами ' + JSON.stringify(fieldOrder)  );
}

// function updateSpanOffsetClassesInChildren(row){
    // _.each(JSON.parse(row.dataset.scheme), function(cellScheme, index){
        // row.childNodes[index].className = cellScheme.span_offset;
    // })
// }

function setSpanOffsetInScheme(newRowUnordered){
    var newRow = _.sortBy(newRowUnordered, // сортировка элементов строки
                function (cell) { // по первой занимаемой элементом колонке
                    return cell.order.col1;
    });
    for (var j = 0, previousCol = -1; j < newRow.length; j++) {
        newRow[j].span_offset = CssFrameworkProperties.columnWidthClass
             + ((newRow[j].order.col2 - newRow[j].order.col1 + 1) * CssFrameworkProperties.minColumnsInField);
        if (newRow[j].order.col1 - previousCol > 0) {
            newRow[j].span_offset += ' ' + CssFrameworkProperties.columnOffsetClass
             + ((newRow[j].order.col1 - previousCol - 1) * CssFrameworkProperties.minColumnsInField);
        }
        previousCol = newRow[j].order.col2;
    }
    return newRow;
}

function getOneSectionMatrix(fieldsObject) {
    /*
    Получение матрицы элементов, в который каждый из элементов будет расположен
    на сетке N*4. Элементы представляют что-то вида {id: 'name', span_offset:'col-sm-3 col-sm-offset-6', 'order' : {'row':0, 'col1':0, 'col2':2}}
    Использует заполняет только непостредственно форматирование формы, Виджеты и
    данные проставляются в fillFormMatrix	
     */
    
    return _.chain(fieldsObject)
        .map(function(value, key){
            return _.extend({id: key}, value);})
        .groupBy(function(field){
            return field.order.row;}) // grouping by row numbers
        .values()
        .map(function(row, rowNum){
            return setSpanOffsetInScheme(
                    _.chain(row)
                    .sortBy(function(cell){
                        return cell.order.col1; // sorting by first column
                    })
                    .map(function (cell){
                        cell.order.row = rowNum; // removing empty rows
                        return cell;
                    })
                    .value()
                );
        })
    .value();
}; //getOneSectionMatrix
          
function getOneRowMatrix(fieldsObject, rowNum) {
    return setSpanOffsetInScheme(
        _.chain(fieldsObject)
            .map(function(value, key){
                value.order.row = rowNum;
                return _.extend({id: key}, value);})
            .values()
            .sortBy(function(cell){
                return cell.order.col1; // sorting by first column
            })
            .map(function (cell){
                cell.order.row = rowNum; // removing empty rows
                return cell;
            })
            .value()
    );
}

function getRowFieldsObject(fieldsObject, row) {throw new Error('not implemented')}



function addEmptySectionToForm(rootElem, sectionName, sectionOrder) {
    var panelElem = rootElem.querySelector('.panel-group');
    if (sectionOrder == null || 
        sectionOrder > panelElem.childNodes.length - 1 ||
        sectionOrder < 0) {
            sectionOrder = panelElem.childNodes.length
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
        panelElem.insertBefore(section, panelElem.childNodes[sectionOrder])
    }
}

function moveSectionTo(rootElem, from, to){
    var panelElem = rootElem.querySelector('.panel-group');
    if (!to || to > panelElem.childNodes.length || to <= 0) {
        sectionOrder = panelElem.childNodes.length
    }
    if(from < 0 || from >= panelElem.childNodes.length){
        throw new Error('Недопустимый индекс для поля \'from\' = ' + from);
    }
    if (from != to){
        if (to > from){ // Если мы передвигаем элемент с первого места на третье, 
            to += 1;    // то его нужно вставлять перед четвертым элементом,
                        // поскольку перед вставкой элемент удаляется с предыдущего места 
                        // и старый четвертый становится третьим.
        }
        panelElem.insertBefore(panelElem.childNodes[from], panelElem.childNodes[to])
    }
}

function removeSection(rootElem, order){
    var panelElem = rootElem.querySelector('.panel-group');
    if(order < 0 || order >= panelElem.childNodes.length){
        throw new Error('Недопустимый индекс для поля \'order\' = ' + order);
    }
    panelElem.removeChild(panelElem.childNodes[order])
}

function insertRowWithScheme(rootElem, sectionNum, rowNum, rowFields){
    //checking indexes
    var panelElem = rootElem.querySelector('.panel-group');
    if (sectionNum < 0 || sectionNum > panelElem.childNodes.length-1) {
        throw new Error('Недопустимый индекс для секции = ' + sectionNum);
    }
    var section = panelElem.childNodes[sectionNum];
    var panel_body = section.querySelector('.panel-body');
    var sectionScheme = JSON.parse(section.dataset.scheme);
    if (rowNum < 0 || rowNum > panel_body.childNodes.length) {
        throw new Error('Недопустимый индекс для строки = ' + rowNum);
    }
    
    //checking scheme for new row
    _.each(rowFields, function(fieldValue, fieldName){
        fieldValue.order.row = rowNum;
        if(sectionScheme[fieldName] !== undefined) {
            throw new Error('Недопустимое имя поля = ' + fieldName);
        }
    });
    var row = getRowBody(getOneRowMatrix(rowFields, rowNum), section.id);

    if (rowNum === panel_body.childNodes.length)
        panel_body.appendChild(row);
    else{
        panel_body.insertBefore(row, panel_body.childNodes[rowNum]);
    }
    updateSectionScheme(section);
}

function canInsertCellBefore(rootElem, beforeCellName, insertableCellScheme){
    var panelElem = rootElem.querySelector('.panel-group');
    var cellElement = document.getElementById(beforeCellName);
    if(!cellElement) throw new Error('Can\'t find cell element');
    var sectionScheme = getSchemeForFieldName(beforeCellName);
    var cellScheme = sectionScheme[beforeCellName];
    console.assert(!!cellScheme, 'Can\'t find scheme for cell with name' + beforeCellName);       
    var to = cellScheme.order;
};


function getSchemeForFieldName(fieldName){
    return  JSON.parse(document.getElementById(
                document.getElementById(fieldName).parentNode.dataset.sectionId
            ).dataset.scheme);
}

function moveElementTo(rootElem, fieldName, to /** section | row | col | colWidth*/){
    var panelElem = rootElem.querySelector('.panel-group');
    var cellElement = document.getElementById(fieldName);
    if(!cellElement) throw new Error('Can\'t find cell element');
    var sectionScheme = getSchemeForFieldName(fieldName);
    var cellScheme = sectionScheme[fieldName];
    console.assert(!!cellScheme, 'Can\'t find scheme for cell with name' + fieldName);       
    var from = cellScheme.order;
   
/*     function renumerateRows(){
        _.each(fromRowsNodes, function(row, index){
            row.dataset.scheme = JSON.stringify(
                _.map(JSON.parse(row.dataset.scheme), function(cellScheme){
                    cellScheme.order.row = index;
                    return cellScheme;
                })
            );
        });
    }

    function updateOldRow(){
        var oldRowSchemeUpdated = setSpanOffsetInScheme(_.filter(oldRowScheme, function(field){
            return field.order.col1 != from.col;
        }));
        // в старой строке остались ячейки        
        if (oldRowSchemeUpdated.length > 0){
            // обновление схемы старой строки
            fromRow.dataset.scheme = JSON.stringify(oldRowSchemeUpdated);
            //обновление координат ячеек старой строки в соответствии с новой схемой
            _.each(fromRow.childNodes, function(cell, index){ 
                cell.className = oldRowSchemeUpdated[index].span_offset;
            });
        }
        else{ // в старой строке не осталось ячеек
            fromSection.removeChild(fromRowsNodes[from.row]); 
            renumerateRows();
        }
    } 
    
    var toSection, toRow;
    // Смена секции
    if(!!to.section && to.section != from.section){
        if(to.section < 0 || to.section >= panelElem.childNodes.length){
            throw new Error('Недопустимый индекс для поля \'to.section\' = ' + to.section);
        }
        toSection = panelElem.childNodes[to.section].querySelector('.panel-body')
        var toRowsNodes = toSection.childNodes;
        
        // перенос из старой строки в новую
        toRow = getRowBody([]);
        console.log(toRow, cellElement)
        toRow.appendChild(cellElement);
        // создание схемы новой строки
        toRow.dataset.scheme = JSON.stringify([{
            id: fieldScheme.id,
            order:{
                col1: 0,
                col2: cellWidth,
                row: toRowsNodes.length
            },
            span_offset: CssFrameworkProperties.columnWidthClass
                         + (cellWidth) * CssFrameworkProperties.minColumnsInField
        }]);
        // добавление строки к секции
        toSection.appendChild(toRow);
        updateSectionScheme();
    }
    // Смена строки
    else if(!!to.row && to.row != from.row){
        if(to.row < 0 || to.row >= fromRowsNodes.length){
            throw new Error('Недопустимый индекс для поля \'to.row\' = ' + to.row);
        }
        // Остануться ли в нашей строке еще ячейки?
        var lastElementInRow = (fromRow.childNodes.length == 0);
        // Если мы передвигаем элемент с первого места на третье, 
        // то его нужно вставлять перед четвертым элементом,
        // поскольку перед вставкой элемент удаляется с предыдущего места 
        // и старый четвертый становится третьим. 
        if (to.row > from.row && lastElementInRow){
            to.row += 1;
        }
        toRow = fromRowsNodes[to.row]
        
        // Есть ли в новой строке место для передвигаемой ячейки?
        var insertIntoNewRow = false;
		if(to.row < fromRowsNodes.length) {
			var toRow = fromRowsNodes[to.row];
			_.each(JSON.parse(toRow.dataset.scheme), function(cellScheme){
                    if (cellScheme.order.col2 >= fieldScheme.order.col1 && cellScheme.order.col1 <= fieldScheme.order.col1
                    || cellScheme.order.col1 <= fieldScheme.order.col2 && cellScheme.order.col1 >= fieldScheme.order.col1){
                        insertIntoNewRow = true;
					}
			});
        }else{
			// перенос из старой строки в новую
			insertIntoNewRow = true;
		}
        var toRow;
		if(insertIntoNewRow){
			toRow = getRowBody([]);
			toRow.appendChild(cellElement);
			// создание схемы новой строки
			toRow.dataset.scheme = JSON.stringify([{
				id: fieldScheme.id,
				order:{
					col1: fieldScheme.order.col1,
					col2: fieldScheme.order.col2,
					row: to.row
				},
				span_offset:  CssFrameworkProperties.columnWidthClass
					 + ((fieldScheme.order.col2 - fieldScheme.order.col1) * CssFrameworkProperties.minColumnsInField)
					 + (fieldScheme.order.col1 > 0 ?
							' ' + CssFrameworkProperties.columnOffsetClass + ((fieldScheme.order.col1) * CssFrameworkProperties.minColumnsInField)
							: '')
			}]);
			// добавление строки к секции
			if(to.row >= fromRowsNodes.length){
				fromSection.appendChild(toRow);
			}
            else{
				fromSection.insertBefore(toRow, fromRowsNodes[to.row])
            }
			updateOldRow();
		}
		else{
            toRow = fromRowsNodes[to.row]
            var insertBefore = null; // ищем ячейку перед которой вставить данные
            _.each(JSON.parse(toRow.dataset.scheme), function(cellScheme, index){
                    if (cellScheme.order.col1 > fieldScheme.order.col2){
                        insertBefore = index;
					}
			});
            var fieldSchemeNew = fieldScheme;
            fieldSchemeNew.order.row = to.row;
			if(insertBefore != null)
				toRow.appendChild(cellElement);
			else
				toRow.insertBefore(cellElement, toRow.childNodes[insertBefore])
            var oldRowScheme = JSON.parse(toRow.dataset.scheme);
            oldRowScheme.push(fieldSchemeNew);
            toRow.dataset.scheme = JSON.stringify(setSpanOffsetInScheme(oldRowScheme));
            updateSpanOffsetClassesInChildren(toRow);
			updateOldRow();
        }
    }
    
    */
}
