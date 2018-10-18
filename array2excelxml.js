/**
 * @include parseTpl, isArray, isNumber, escapeXmlString, assignNonNull
 * @param {array<array<array>>} tables
 * @param {array<object>|object} [ops]
 * @param {array<number>|number} [op.width]
 * @param {number} [op.height]
 * @param {string} [op.sheetName]
 * @param {boolean} [op.hasTitle = true]
 * @param {number} [op.frozenLine = 1]
 * @return {string}
 */
function array2excelxml(tables, ops){
	if(tables && tables[0] && tables[0][0] != null){
		if(!isArray(tables[0][0])){
			tables = [tables];
		}
	}
	ops = ops || {}
	var tpl = 
`<?xml version="1.0"?>
<?powered author="mrbrick@yinhe.org"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:x="urn:schemas-microsoft-com:office:excel">
 <Styles>
  <Style ss:ID="Default" ss:Name="Normal">
   <Alignment ss:Vertical="Center"/>
   <Font ss:FontName="微软雅黑" x:CharSet="134" ss:Size="10"/>
  </Style>
  <Style ss:ID="styletable">
  </Style>
  <Style ss:ID="styletitle">
   <Font x:CharSet="134" ss:Size="12" ss:Bold="1" ss:Color="#000080"/>
   <Borders>
    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>
   </Borders>
  </Style>
  <Style ss:ID="stylerow">
  </Style>
 </Styles>
 {:each tables as table, tableIndex:}
 {:
	var op = assignNonNull({
		sheetName: 'sheet' + (tableIndex + 1),
		hasTitle: true,
		frozenLine: null,
	}, ops[tableIndex] || ops);
	
	var titleIndex = op.hasTitle ? 1 : 0;
	var frozenLine = op.frozenLine == null ? op.hasTitle ? 1 : 0 : op.frozenLine * 1;
 :}
 <Worksheet ss:Name="{::escapeXmlString(op.sheetName):}">
  <Table ss:StyleID="styletable" ss:DefaultColumnWidth="{::isNumber(op.width) ? op.width : 60:}" ss:DefaultRowHeight="{::isNumber(op.height) ? op.height : 20:}">
  {:if isArray(op.width):}
   {:each op.width as width:}
    <Column ss:Width="{::width:}"/>
   {:each:}
  {:if:}
   
   {:if op.hasTitle:}
   <Row ss:StyleID="styletitle">
    {:each table[0] as title:}
    <Cell><Data ss:Type="String">{::escapeXmlString(title):}</Data></Cell>
    {:each:}
   </Row>
   {:if:}
   {:each table as line, lineIndex if lineIndex >= titleIndex:}
   <Row ss:StyleID="stylerow">
    {:each line as value:}
	<Cell><Data ss:Type="String">{::escapeXmlString(value):}</Data></Cell>
	{:each:}
   </Row>
   {:each:}
  </Table>
  <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">
  {:if frozenLine:}
   <FrozenNoSplit/>
   <SplitHorizontal>{::frozenLine:}</SplitHorizontal>
   <TopRowBottomPane>{::frozenLine:}</TopRowBottomPane>
   <ActivePane>{::frozenLine + 1:}</ActivePane>
   {:if:}
  </WorksheetOptions>
 </Worksheet>
 {:each:}
</Workbook>
`;
	return parseTpl(tpl, {
		tables: tables,
		ops: ops,
		escapeXmlString: escapeXmlString,
		assignNonNull: assignNonNull,
		isArray: isArray,
		isNumber: isNumber,
	}, {
		justCompile: 0
	});
}