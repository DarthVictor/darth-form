'use strict';
//{"title":"Тестовая Таблица","subtitle":"name","sectionList":[{"sectionName":"Gadgets","sectionOrder":1,"fieldList":{"GADGETS":{"order":{"row":1,"col1":1,"col2":4}}}},{"sectionName":"Атрибуты","sectionOrder":2,"fieldList":{"TESTTABLEID":{"order":{"row":1,"col1":1,"col2":2}},"NAME":{"order":{"row":1,"col1":3,"col2":4}},"DATE1":{"order":{"row":2,"col1":1,"col2":1}},"DATETIME1":{"order":{"row":2,"col1":2,"col2":3}},"TIME1":{"order":{"row":2,"col1":4,"col2":4}},"JAVACODE":{"order":{"row":3,"col1":1,"col2":4}},"EMAIL":{"order":{"row":4,"col1":1,"col2":1}},"URL":{"order":{"row":4,"col1":2,"col2":3}},"ROLE":{"order":{"row":5,"col1":1,"col2":2}},"FIELDSTYLE":{"order":{"row":5,"col1":3,"col2":4}},"ISALIVE":{"order":{"row":6,"col1":1,"col2":2}},"FIELDFORMAT":{"order":{"row":6,"col1":3,"col2":4}},"FRIEND":{"order":{"row":7,"col1":1,"col2":1}}}}]}

/* App Module */
var app = angular.module('app', [ ]);	
app.controller('TestController', function($scope) {
    $scope.formPlainData = formResponse.definition.form;
    $scope.formDefinition = JSON.parse($scope.formPlainData);

    $scope.$watch('formPlainData', function(newValue, oldValue){
        if(newValue != oldValue){
          $scope.formDefinition = JSON.parse(newValue);
        }
    })
    
    $scope.$watch('formDefinition', function(newValue, oldValue){
        if(!_.isEqual(newValue, oldValue)){
          $scope.formPlainData = JSON.stringify(newValue);
        }
    })
});

app.directive('ipForm', function(){
  return {
    restrict: 'E',
    scope:{
      form: '='
    },
    template: '<div style="border: 1px solid black;" id="mainform"></div>',
    link: function(scope, iElement, iAttrs) {
        scope.rebuild = function(definition){
          var rootNode = iElement[0].childNodes[0];
          while (rootNode.firstChild) {
              rootNode.removeChild(rootNode.firstChild);
          }
          addForm(rootNode, definition);
        }
        scope.rebuild(scope.form);
        scope.$watch('form', function(newValue, oldValue){		
            if(!_.isEqual(newValue, oldValue)){
                scope.rebuild(newValue)
            }
        });
    }
  }
})
//var formDefinition = JSON.parse(formResponse.definition.form)
// console.log(formDefinition);

//addForm(document.getElementById('mainform'), formDefinition)


function addForm(rootElem, formDefinition){
  addFormHeaders(rootElem, formDefinition)
  addFormSections(rootElem, formDefinition)
}
function addFormHeaders(rootElem, formDefinition){
  var title = document.createElement('h2');
  title.textContent = formDefinition.title;
  rootElem.appendChild(title);
}
function addFormSections(rootElem, formDefinition){
  var panel_group = document.createElement('div');
  panel_group.className = 'panel-group';
  rootElem.appendChild(panel_group);
  var sections = _.map( _.sortBy(formDefinition.sectionList, function(section){return section.sectionOrder}),
                        function(orderedSection) {return getSectionFromDefinition(orderedSection, rootElem.id)});
  _.each(sections, function(section){
    panel_group.appendChild(section);
  });
}

function getSectionFromDefinition(sectionDefinition, formId){
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
    link_header.href = '#' + formId + '_collapse_' + sectionDefinition.sectionOrder;
    link_header.textContent = sectionDefinition.sectionName;
    
    var panel_collapse = document.createElement('div');
    panel_collapse.className = 'panel-collapse collapse' + (sectionDefinition.sectionOrder == 1 ? ' in' : '');
    panel_collapse.id = formId + '_collapse_' + sectionDefinition.sectionOrder;
    section.appendChild(panel_collapse);
    
    panel_collapse.appendChild(getSectionBody(sectionDefinition));
    
    return section;
}

function getSectionBody(sectionDefinition){
    var panel_body = document.createElement('div');
    panel_body.className = 'panel-body';
    var matrix = getOneSectionFormMatrix(sectionDefinition.fieldList);
    _.each(matrix, function(row){
        if (row.length > 0){
            var row_div = document.createElement('div');
            row_div.className = 'row';
            panel_body.appendChild(row_div);
            _.each(row, function(cell){
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
		 на сетке N*4. Элементы представляют что-то вида 
		 {id: 'name', span_offset:'col-sm-3 col-sm-offset-6', 'order' : {'row':1, 'col1':1, 'col2':2}}
		 Использует заполняет только непостредственно форматирование формы, Виджеты и
		 данные проставляются в fillFormMatrix
		 */
    CssFrameworkProperties = CssFrameworkProperties || { //Bootstrap3 by default
      columnWidthClass: 'col-sm-',
      columnOffsetClass: 'col-sm-offset-',
      minColumnsInField: 3
    }
		var matrix = [];
		if (fieldsObject) {// заполняем матрицу из заголовка
      _.each(fieldsObject, function(value, key, list){
        if(!!value.order){
          var rowNum = value.order.row - 1;
					var el = {
						id : key,
						order : value.order
					};
					if (matrix[rowNum]) {
						matrix[rowNum].push(el);
					} else {
						matrix[rowNum] = [ el ];
					}
        }
      });
      
      matrix = _.map( _.compact(matrix), function(row, row_index){ //удаляем пустые строки 
        var newRowUnordered = _.map(row, function (cell, cell_index) {
          cell.order.row = row_index; //обновляем индекс
        	return cell;
        });
        var newRow = _.sortBy(newRowUnordered, // сортировка элементов строки
                              function(cell){ // по первой занимаемой элементом колонке
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
  
  