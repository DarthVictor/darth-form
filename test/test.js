
describe('Checking test framework', function() {
	
	beforeEach(function() {
		this.addMatchers({
			toEqualData : function(expected) {
				return _.isEqual(this.actual, expected);
			}
		});
	});
	
	beforeEach(function() {
        addForm(rootElement, formPassportOfTheRailwaySectionSettlement)
    });
	
	
	afterEach(function() {
		removeForm(rootElement)
	});
	
	it('should pass trivial test', function() {
        expect(true).toEqual(true);
    });		
    
    function compareDomAndForm(formId, formDef) {
        expect(
            _.map($('#' + formId + ' .panel-title a'), function(el){return $(el).text();})
        )
        .toEqual(
        _.chain(formDef.sectionList)
            .sortBy(function(section){ return section.sectionOrder; })
            .map(function(section){ return section.sectionName; })
            .value()
        );
   
        _.each(formDef.sectionList, function(sectionDef){
            //var sectionDef = formPassportOfTheRailwaySectionSettlement.sectionList[0]; var formId = 'mainform';
            var fieldMatrixSchemeDef = _.chain(sectionDef.fieldList)
                                    .map(function(value, key){
                                        return _.extend({id: key}, value);})
                                    .groupBy(function(field){
                                        return field.order.row;})
                                    .values()
                                    .map(function(row, rowNum){
                                        return _.sortBy(row, function(cell){
                                            return cell.order.col1;
                                        });
                                    })
                                .value();
                                
            var fieldMatrixWidthOffsetDef = _.map(fieldMatrixSchemeDef, function(row){
                return _.map(row, function(cell, cellIndex){
                    return {
                        name: cell.id,
                        width: cell.order.col2 - cell.order.col1 + 1,
                        offset: cell.order.col1 - (cellIndex > 0 ? row[cellIndex-1].order.col2 + 1 : 0)
                    };
                });
            });
            
            var fieldMatrixWidthOffsetDom = _.map($('#' + formId + '_' + hashCode(sectionDef.sectionName) + ' .row'), function(row, rowNum){
                return _.map($(row).children(), function(cell, cellNum){
                        var reWidth  = new RegExp(CssFrameworkProperties.columnWidthClass + '(\\d*)')
                        var reOffset = new RegExp(CssFrameworkProperties.columnOffsetClass + '(\\d*)')
                        return {
                            name: cell.id,
                            width: (parseInt(reWidth.exec(cell.className)[1])|| 0)/CssFrameworkProperties.minColumnsInField,
                            offset: (parseInt(reOffset.exec(cell.className)[1])|| 0)/CssFrameworkProperties.minColumnsInField
                        };
                    }) ;
            });
            
            // console.log('fieldMatrixSchemeDef', _.map(fieldMatrixDom, function(row){
                    // return _.map(JSON.parse(row.scheme), function(cell){
                        // return {id:cell.id, order:cell.order};
                    // });
                // })     
            // )
            // console.log('fieldMatrixSchemeDef', fieldMatrixSchemeDef)
            
            expect(// Data in data-scheme field is true
                JSON.parse(document.getElementById( formId + '_' + hashCode(sectionDef.sectionName)).dataset.scheme)
            ).toEqualData(sectionDef.fieldList)
            
            // console.log('fieldMatrixWidthOffsetDef', _.map(fieldMatrixDom, function(row){
                    // return  row.widthOffset;;
                // })       
            // )
            // console.log('fieldMatrixWidthOffsetDef', fieldMatrixWidthOffsetDef)
            
            expect(// Cells in DOM has right width/offset
                fieldMatrixWidthOffsetDom           
            ).toEqualData(fieldMatrixWidthOffsetDef)
        });
    }
    
	it('should have right section names and order', function(){
        compareDomAndForm('mainform', formPassportOfTheRailwaySectionSettlement)
    });		
    
    it('should implement addEmptySectionToForm operations', function() {
        addEmptySectionToForm(rootElement, 'Новая секция')
        var formDef = formPassportOfTheRailwaySectionSettlement;
        formDef.sectionList.push({
                "sectionName" : "Новая секция",
                "sectionOrder" : 100,
                "fieldList" : {}
        });
        compareDomAndForm('mainform', formDef)
    });	
	
    it('should implement moveSectionTo operations', function() {
        moveSectionTo(rootElement, 1, 5)
        var formDef = formPassportOfTheRailwaySectionSettlement;
        formDef.sectionList = _.map(formDef.sectionList, function(section){
            if (section.sectionOrder == 1) section.sectionOrder = 6;
            if (section.sectionOrder >= 6) section.sectionOrder += 1;
            return section;
        });
        compareDomAndForm('mainform', formDef)
    });		
    
    it('should implement removeSection operations', function() {
        removeSection(rootElement, 10)
        var formDef = formPassportOfTheRailwaySectionSettlement;
        formDef.sectionList = _.chain(formDef.sectionList)
                                .sortBy(function(section){ return section.sectionOrder; })
                                .map(function(section, index){
                                    section.sectionOrder = index;
                                    return section;
                                })
                                .filter(function(section){
                                    return section.sectionOrder != 10;
                                })
                            .value();
        compareDomAndForm('mainform', formDef)
    });	
    
    it('should implement insertRow operations', function() {
        insertRowWithScheme(rootElement, 0, 3, {TEST: {
					"order" : {
						"row" : 1,
						"col1" : 0,
						"col2" : 1
					}
				}})
        var formDef = formPassportOfTheRailwaySectionSettlement;
        formDef.sectionList = _.map(formDef.sectionList, function(section){
            if (section.sectionOrder == 0) {
                _.each(section.fieldList, function(field){
                    if (field.order.row >= 3) field.order.row++;
                })
                section.fieldList['TEST'] = {
					"order" : {
						"row" : 3,
						"col1" : 0,
						"col2" : 1
					}
				}
            }
            return section;
        });
        compareDomAndForm('mainform', formDef)
    });		
    
    // it('should implement moveElementTo section operations', function() {
        // moveElementTo(rootElement, {'section':0,'row':2,'col':0},  {'section':7})
        // var formDef = formPassportOfTheRailwaySectionSettlement;
        // formDef.sectionList = _.each(formDef.sectionList, function(section){
            // if (section.sectionOrder == 0){
                // delete section.fieldList['ISACTIVE']
            // }
            
            // if (section.sectionOrder == 7){

                // section.fieldList['ISACTIVE'] = {
					// "order" : {
						// "row" : 4,
						// "col1" : 0,
						// "col2" : 1
					// }
				// };
            // }
            
        // })
        // compareDomAndForm('mainform', formDef)
    // });		
    
    // it('should implement moveElementTo row operations', function() {
        // moveElementTo(rootElement,  {'section':0,'row':1,'col':0}, {'row':2})
        // var formDef = formPassportOfTheRailwaySectionSettlement;
        // formDef.sectionList = _.each(formDef.sectionList, function(section){
            
            // if (section.sectionOrder == 0){
                // _.each(section.fieldList,function(value, field){
                    // if(value.order.row >=2) value.order.row++;
                // });
                // section.fieldList['CODE'].order.row = 2;
            // }
            
        // })
        // compareDomAndForm('mainform', formDef)
    // });		
    
	
    
});