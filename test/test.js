
describe('Checking test framework', function() {
	
	beforeEach(function() {
		this.addMatchers({
			toEqualData : function(expected) {
				return _.isEqual(this.actual, expected);
			}
		});
	});
	
	beforeEach(inject(function() {
	}));
	
	
	afterEach(function() {
		
	});
	
	it('should pass trivial test', function() {
        expect(true).toEqual(true);
    });		
    
	it('should have right section names and order', function() {
        expect(
            _.map($('#mainform .panel-title a'), function(el){return $(el).text();})
        )
        .toEqual(
        _.chain(formPassportOfTheRailwaySectionSettlement.sectionList)
            .sortBy(function(section){ return section.sectionOrder; })
            .map(function(section){ return section.sectionName; })
            .value()
        );
    });
    
	it('should have right fields for each section', function() {
        _.each(formPassportOfTheRailwaySectionSettlement.sectionList, function(sectionDef){
            var sectionDef = formPassportOfTheRailwaySectionSettlement.sectionList[0];
            var fieldMatrixSchemeDef = _.chain(sectionDef.fieldList)
                                    .map(function(value, key){
                                        return _.extend({id: key}, value);})
                                    .groupBy(function(field){
                                        return field.order.row;})
                                    .values()
                                .value();
                                
            var fieldMatrixWidthOffsetDef = _.map(fieldMatrixSchemeDef, function(row){
                return _.map(row, function(cell, cellIndex){
                    return {
                        name: cell.name,
                        width: cell.order.col2 - cell.order.col1,
                        offset: cell.order.col1 - (cellIndex > 0 ? row[cellIndex-1].order.col2 + 1 : 0)
                    };
                });
            });
            
            var fieldMatrixDom = _.map($('#mainform_panelgroup_' + hashCode(sectionDef.sectionName) + ' .row'), function(row, rowNum){
                return {
                    scheme: row.dataset.scheme,
                    widthOffset: _.map($(row).children(), function(cell, cellNum){
                        var reWidth  = new RegExp(CssFrameworkProperties.columnWidthClass + '(\\d*)')
                        var reOffset = new RegExp(CssFrameworkProperties.columnOffsetClass + '(\\d*)')
                        return {
                            name: cell.id,
                            width: parseInt(reWidth.exec(cell.className)[1])|| 0,
                            offset: parseInt(reOffset.exec(cell.className)[1])|| 0
                        };
                    })
                };
            });
            
            //var fieldMatrixSchemeDom = _.map(fieldMatrixDom, function(row){return JSON.parse(row.scheme);});
            //var fieldMatrixWidthOffsetDom = _.map(fieldMatrixDom, function(row){return row.widthOffset;});
            
            expect(// Data in row data-scheme field is true
                _.map(fieldMatrixDom, function(row){
                    return _.map(JSON.parse(row.scheme), function(cell){
                        return {id:cell.id, order:cell.order};
                    });
                })                
            ).toEqualData(fieldMatrixSchemeDef)
        });
    });		
	
});