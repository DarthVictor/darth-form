var formResponse = 
{
		"formId" : 1115,
		"entityTypeId" : 174,
		"formType" : "DETAILS",
		"formName" : "D_RailSegmentPassport.DETAILS.default",
		"formStyle" : "input{ font-style: italic;}",
		"definition" : {
			"form" : "{\"title\":\"Паспорт расчетного участка железной дороги\",\"subtitle\":\"DISPLAYNAME\",\"sectionList\":[{\"sectionName\":\"Общая информация\",\"sectionOrder\":1,\"fieldList\":{\"DISPLAYNAME\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":4}},\"CODE\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"D_RAILSEGMENTPASSPORTID\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}},\"ISACTIVE\":{\"order\":{\"row\":3,\"col1\":1,\"col2\":2}},\"MTK\":{\"order\":{\"row\":3,\"col1\":3,\"col2\":4}},\"PERIOD\":{\"order\":{\"row\":4,\"col1\":1,\"col2\":2}},\"RAILSEGMENT\":{\"order\":{\"row\":4,\"col1\":3,\"col2\":4}},\"RAILSPAN\":{\"order\":{\"row\":5,\"col1\":1,\"col2\":2}},\"RAILWAY\":{\"order\":{\"row\":5,\"col1\":3,\"col2\":4}},\"REGION\":{\"order\":{\"row\":6,\"col1\":1,\"col2\":2}},\"ST_FROM\":{\"order\":{\"row\":6,\"col1\":3,\"col2\":4}},\"ST_TO\":{\"order\":{\"row\":7,\"col1\":1,\"col2\":2}}}},{\"sectionName\":\"Приведенные размеры движения поездов (пар поездов/сутки)\",\"sectionOrder\":2,\"fieldList\":{\"CAPACITY_MOTION_CARGO\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"CAPACITY_MOTION_PASS\":{\"order\":{\"row\":1,\"col1\":3,\"col2\":4}}}},{\"sectionName\":\"Технические характерстики\",\"sectionOrder\":3,\"fieldList\":{\"COMMUNICATIONS\":{\"order\":{\"row\":4,\"col1\":1,\"col2\":2}},\"ENGINE\":{\"order\":{\"row\":4,\"col1\":3,\"col2\":4}},\"LOCOMOTIVE_CARGO\":{\"order\":{\"row\":5,\"col1\":1,\"col2\":2}},\"LOCOMOTIVE_PASS\":{\"order\":{\"row\":5,\"col1\":3,\"col2\":4}},\"L_1_WAY\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"L_2_WAY\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}},\"L_3_WAY\":{\"order\":{\"row\":3,\"col1\":1,\"col2\":2}},\"L_4_WAY\":{\"order\":{\"row\":3,\"col1\":3,\"col2\":4}},\"L_TOTAL\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"MASS_FROM\":{\"order\":{\"row\":6,\"col1\":3,\"col2\":4}},\"MASS_TO\":{\"order\":{\"row\":6,\"col1\":1,\"col2\":2}},\"SLOPE_FROM\":{\"order\":{\"row\":7,\"col1\":3,\"col2\":4}},\"SLOPE_TO\":{\"order\":{\"row\":7,\"col1\":1,\"col2\":2}},\"TRAIN_LENGTH_FROM\":{\"order\":{\"row\":8,\"col1\":3,\"col2\":4}},\"TRAIN_LENGTH_TO\":{\"order\":{\"row\":8,\"col1\":1,\"col2\":2}}}},{\"sectionName\":\"Пропускная способность\",\"sectionOrder\":4,\"fieldList\":{\"CAPACITY_TOTAL\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"LOADING\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}}}},{\"sectionName\":\"Пропускная способность - перегоны\",\"sectionOrder\":5,\"fieldList\":{\"SPANS\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":4}}}},{\"sectionName\":\"Пропускная способность - станции\",\"sectionOrder\":6,\"fieldList\":{\"STATIONSCAPACITY\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":4}}}},{\"sectionName\":\"Пропускная способность - Устройства локомотивного хозяйства:\",\"sectionOrder\":7,\"fieldList\":{\"LOKOSUPPLYCAPACITY\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":4}}}},{\"sectionName\":\"Перерабатывающая способность\",\"sectionOrder\":10,\"fieldList\":{\"PROCESSING_STATION_CARRIAGE\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"PROCESSING_STATION_LMT\":{\"order\":{\"row\":1,\"col1\":3,\"col2\":4}},\"PROCESSING_STATION_LOADING\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"PROCESSING_STATION_TRAINS\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}},\"PROCESSING_STORAGE_CARRIAGE\":{\"order\":{\"row\":3,\"col1\":1,\"col2\":2}},\"PROCESSING_STORAGE_LMT\":{\"order\":{\"row\":3,\"col1\":3,\"col2\":4}},\"PROCESSING_STORAGE_LOADING\":{\"order\":{\"row\":4,\"col1\":1,\"col2\":2}},\"PROCESSING_STORAGE_TRAINS\":{\"order\":{\"row\":4,\"col1\":3,\"col2\":4}}}},{\"sectionName\":\"Пропускная способность - устройства тягового электроснабжения\",\"sectionOrder\":11,\"fieldList\":{\"ELECTRICSUPPLYCAPACITY\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":4}}}},{\"sectionName\":\"Отправление пассажиров по участкам\",\"sectionOrder\":12,\"fieldList\":{\"PASS_ARRIVAL_LONGDIST\":{\"order\":{\"row\":6,\"col1\":1,\"col2\":2}},\"PASS_ARRIVAL_SUBURB\":{\"order\":{\"row\":6,\"col1\":3,\"col2\":4}}}},{\"sectionName\":\"Отправление и перевозки грузов \",\"sectionOrder\":13,\"fieldList\":{\"CARGO_DENSITY\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"CARGO_NEXT\":{\"order\":{\"row\":1,\"col1\":3,\"col2\":4}},\"CARGO_PREV\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"CARGO_SELF_ARRIVAL\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}},\"CARGO_SELF_DEPARTURE\":{\"order\":{\"row\":3,\"col1\":1,\"col2\":2}}}},{\"sectionName\":\"Дополнительные справочные данные\",\"sectionOrder\":15,\"fieldList\":{\"SPAN_TIME_BCWD_CARGO\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"SPAN_TIME_BCWD_PASS\":{\"order\":{\"row\":1,\"col1\":3,\"col2\":4}},\"SPAN_TIME_FRWD_CARGO\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"SPAN_TIME_FRWD_PASS\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}}}},{\"sectionName\":\"Размеры движения\",\"sectionOrder\":16,\"fieldList\":{\"TRAINS_CARGO_COMPLEX_GRAPH\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"TRAINS_CARGO_FAST_GRAPH\":{\"order\":{\"row\":1,\"col1\":3,\"col2\":4}},\"TRAINS_CARGO_GRAPH\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"TRAINS_CARGO_LOCOMOTIVE_GRAPH\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}},\"TRAINS_FROM_CARGO\":{\"order\":{\"row\":3,\"col1\":1,\"col2\":2}},\"TRAINS_FROM_PASS\":{\"order\":{\"row\":3,\"col1\":3,\"col2\":4}},\"TRAINS_PASS_COMMUTER\":{\"order\":{\"row\":4,\"col1\":1,\"col2\":2}},\"TRAINS_PASS_FAST\":{\"order\":{\"row\":4,\"col1\":3,\"col2\":4}},\"TRAINS_PASS_FOLLOWING\":{\"order\":{\"row\":5,\"col1\":1,\"col2\":2}},\"TRAINS_PASS_INTERCITY\":{\"order\":{\"row\":5,\"col1\":3,\"col2\":4}},\"TRAINS_PASS_SEASONAL\":{\"order\":{\"row\":6,\"col1\":1,\"col2\":2}},\"TRAINS_TO_CARGO\":{\"order\":{\"row\":6,\"col1\":3,\"col2\":4}},\"TRAINS_TO_PASS\":{\"order\":{\"row\":7,\"col1\":1,\"col2\":2}}}},{\"sectionName\":\"История\",\"sectionOrder\":101,\"fieldList\":{\"CREATEDBYID\":{\"order\":{\"row\":1,\"col1\":1,\"col2\":2}},\"CREATEDTIME\":{\"order\":{\"row\":1,\"col1\":3,\"col2\":4}},\"UPDATEDBYID\":{\"order\":{\"row\":2,\"col1\":1,\"col2\":2}},\"UPDATEDTIME\":{\"order\":{\"row\":2,\"col1\":3,\"col2\":4}}}}]}",
			"fields" : {
				"ST_TO" : {
					"pattern" : "SELECT e38b0i0.R_RAILSTATION_ID \"RRAILSTATIONID\", e38b0i0.DISPLAY_NAME \"DISPLAYNAME\" FROM r_railstation e38b0i0 LEFT JOIN r_railstationattr e38b1i0 ON e38b0i0.R_RAILSTATION_ID=e38b1i0.R_RAILSTATION_ID AND e38b1i0.BATCH=1",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18338,
					"label" : "Станция назначения",
					"type" : "combobox"
				},
				"LOKOSUPPLYCAPACITY" : {
					"subEntityId" : 205,
					"lookupQuery" : "\"RAILSEGMENTPASSPORT=\" + record.getFieldValue(\"D_RAILSEGMENTPASSPORTID\")",
					"lookupEntity" : "D_RailLokoSupply",
					"pattern" : "",
					"patternType" : "vjAddOne",
					"entityFieldId" : 22690,
					"label" : "Устройства локомотивного хозяйства:",
					"type" : "subgrid"
				},
				"STATIONSCAPACITY" : {
					"subEntityId" : 203,
					"lookupQuery" : "\"RAILSEGMENTPASSPORT=\" + record.getFieldValue(\"D_RAILSEGMENTPASSPORTID\")",
					"lookupEntity" : "D_RailStationCapacityNew",
					"pattern" : "",
					"patternType" : "vjAddOne",
					"entityFieldId" : 22688,
					"label" : "Станции",
					"type" : "subgrid"
				},
				"TEXT_0_1" : {
					"entityFieldId" : 18461,
					"label" : "text0",
					"type" : "textarea"
				},
				"TEXT_3_0" : {
					"entityFieldId" : 18399,
					"label" : "text3",
					"type" : "textarea"
				},
				"TEXT_3_1" : {
					"entityFieldId" : 18464,
					"label" : "text3",
					"type" : "textarea"
				},
				"CARGODENSITY" : {
					"subEntityId" : 206,
					"lookupQuery" : "\"RAILSEGMENT=\" + record.getFieldValue(\"D_RAILSEGMENTPASSPORTID\")",
					"lookupEntity" : "D_RailСargoDensity",
					"pattern" : "",
					"patternType" : "vjAddOne",
					"entityFieldId" : 22827,
					"label" : "Густота движения грузов",
					"type" : "subgrid"
				},
				"ST_FROM" : {
					"pattern" : "SELECT e38b0i0.R_RAILSTATION_ID \"RRAILSTATIONID\", e38b0i0.DISPLAY_NAME \"DISPLAYNAME\" FROM r_railstation e38b0i0 LEFT JOIN r_railstationattr e38b1i0 ON e38b0i0.R_RAILSTATION_ID=e38b1i0.R_RAILSTATION_ID AND e38b1i0.BATCH=1",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18337,
					"label" : "Станция отправления",
					"type" : "combobox"
				},
				"TEXT_4_0" : {
					"entityFieldId" : 18400,
					"label" : "text4",
					"type" : "textarea"
				},
				"RAILWAY" : {
					"pattern" : "SELECT e36b0i0.R_RAILROAD_ID \"RRAILROADID\", e36b0i0.DISPLAY_NAME \"DISPLAYNAME\" FROM r_railroad e36b0i0",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18339,
					"label" : "Железная дорога",
					"type" : "combobox"
				},
				"TEXT_4_1" : {
					"entityFieldId" : 18465,
					"label" : "text4",
					"type" : "textarea"
				},
				"CREATEDBYID" : {
					"pattern" : "SELECT e3b0i0.USER_ID \"USERID\", e3b0i0.FULL_NAME \"FULLNAME\" FROM ipuser e3b0i0",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18332,
					"label" : "Кем создано",
					"type" : "combobox"
				},
				"RAILSPAN" : {
					"pattern" : "SELECT e41b0i0.R_RAILSPAN_ID \"RRAILSPANID\", e41b0i0.DISPLAY_NAME \"DISPLAYNAME\" FROM r_railspan e41b0i0",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18732,
					"label" : "Перегон",
					"type" : "combobox"
				},
				"ELECTRICSUPPLYCAPACITY" : {
					"subEntityId" : 204,
					"lookupQuery" : "\"RAILSEGMENTPASSPORT=\" + record.getFieldValue(\"D_RAILSEGMENTPASSPORTID\")",
					"lookupEntity" : "D_RailElectricSupply",
					"pattern" : "",
					"patternType" : "vjAddOne",
					"entityFieldId" : 22689,
					"label" : "Устройства тягового электроснабжения:",
					"type" : "subgrid"
				},
				"TEXT_2_1" : {
					"entityFieldId" : 18463,
					"label" : "text2",
					"type" : "textarea"
				},
				"MTK" : {
					"pattern" : "SELECT e192b0i0.R_MTK_ID \"R_MTKID\", e192b0i0.STRING_0 \"DISPLAYNAME\" FROM r_mtk e192b0i0 LEFT JOIN r_mtkattr e192b1i0 ON e192b0i0.R_MTK_ID=e192b1i0.R_MTK_ID AND e192b1i0.BATCH=1",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18667,
					"label" : "МТК",
					"type" : "combobox"
				},
				"SPANS" : {
					"subEntityId" : 201,
					"lookupQuery" : "\"RAILSEGMENTPASSPORT=\" + record.getFieldValue(\"D_RAILSEGMENTPASSPORTID\")",
					"lookupEntity" : "D_RailTrackCapacity",
					"pattern" : "",
					"patternType" : "vjAddOne",
					"entityFieldId" : 22687,
					"label" : "Перегоны",
					"type" : "subgrid"
				},
				"TEXT_2_0" : {
					"entityFieldId" : 18398,
					"label" : "text2",
					"type" : "textarea"
				},
				"RAILSEGMENT" : {
					"pattern" : "SELECT e37b0i0.R_RAILSEGMENT_ID \"RRAILSEGMENTID\", e37b0i0.DISPLAY_NAME \"DISPLAYNAME\" FROM r_railsegment e37b0i0 LEFT JOIN r_railsegmentattr e37b1i0 ON e37b0i0.R_RAILSEGMENT_ID=e37b1i0.R_RAILSEGMENT_ID AND e37b1i0.BATCH=1",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18336,
					"label" : "Расчетный участкок железной дороги",
					"type" : "combobox"
				},
				"TEXT_0_0" : {
					"entityFieldId" : 18396,
					"label" : "text0",
					"type" : "textarea"
				},
				"REGION" : {
					"lookupQuery" : "\"ISACTIVE=1 and RAILROAD=\" + record.get(\"RAILWAY\")",
					"lookupEntity" : "R_RailRegions",
					"pattern" : "SELECT e200b0i0.DISPLAY_NAME \"DISPLAYNAME\", e200b0i0.R_RAILREGIONS_ID \"R_RAILREGIONSID\" FROM r_railregions e200b0i0 LEFT JOIN r_railregionsattr e200b1i0 ON e200b0i0.R_RAILREGIONS_ID=e200b1i0.R_RAILREGIONS_ID AND e200b1i0.BATCH=1 WHERE \"ISACTIVE=1 AND e200b1i0.INTEGER_0=\" + RECORD.GET(\"RAILWAY\")",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18340,
					"label" : "Регион",
					"type" : "combobox"
				},
				"TEXT_1_1" : {
					"entityFieldId" : 18462,
					"label" : "text1",
					"type" : "textarea"
				},
				"UPDATEDBYID" : {
					"pattern" : "SELECT e3b0i0.USER_ID \"USERID\", e3b0i0.FULL_NAME \"FULLNAME\" FROM ipuser e3b0i0",
					"patternType" : "lookupEntity",
					"entityFieldId" : 18334,
					"label" : "Кем обнолвено",
					"type" : "combobox"
				},
				"TEXT_1_0" : {
					"entityFieldId" : 18397,
					"label" : "text1",
					"type" : "textarea"
				}
			}
		}
	};
