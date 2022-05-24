import { LexiconUnit } from "../../domain/LexiconUnit";
import { LexiconUnitGateway } from "../api/LexiconUnitGateway";
import JSZip from 'jszip';

export class InMemoryLexiconUnitGateway implements LexiconUnitGateway {
    private readonly filename: string;
    private readonly fs = require('fs');
    private readonly fse = require('fs-extra');
    private scormFolder = 'ExportScorm';
    private AuthorName="";
    private GeneralInformation ="";
    constructor(filename: string) {
        this.filename = filename;
    }
    private updateScormProps (authorName: string, generalInformation:string):void{
        try{
            this.fs.rmSync('../backend/src/fileStorage/'+this.scormFolder,{recursive:true, force:true});
            this.copyTemplate();
            var contentv3 = this.fs.readFileSync('../backend/src/fileStorage/ScormTemplate/contentv3.xml',{ encoding: 'utf-8' });
            contentv3 = contentv3.replaceAll('AUTHOR_NAME', authorName)
            contentv3 = contentv3.replaceAll('GENERAL_DESCRIPTION', generalInformation)
            this.fs.writeFileSync('../backend/src/fileStorage/'+this.scormFolder+'/contentv3.xml', contentv3);
        }
        catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
    private copyTemplate():void{
        this.fse.copySync('../backend/src/fileStorage/ScormTemplate', '../backend/src/fileStorage/'+this.scormFolder);
    }
    createScormProps(scormProps: { authorsName: string; generalInformation: string; }): void {
        try {
            this.updateScormProps(this.AuthorName, this.GeneralInformation);
        }
        
        catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }
    
    sendToExport(lexiconUnitsArray: LexiconUnit[]): void {
        try { 
            this.fs.writeFileSync('LexiconUnitsToExport.json', JSON.stringify(lexiconUnitsArray));
            const array = JSON.stringify(lexiconUnitsArray);
            const data = JSON.parse(array);
            var RESOURCES = '';
            var ITEMS = '';
            var htmlContent ='';
            data ?
                data.map((unit: { word: string; file:any },index:number) => {
                    const copyPath = '../backend/src/fileStorage/lexicon/'+unit.file.filename;
                    const targetPath ='../backend/src/fileStorage/'+this.scormFolder+'/'+unit.file.filename;
                    this.fs.copyFile(copyPath,targetPath,(err: any)=>{
                        if(err)throw err
                    });
                    htmlContent = '<!DOCTYPE html>'+
                    '<html lang="en" xml:lang="en" xmlns="http://www.w3.org/1999/xhtml">'+
                    '<head>'+
                    '<meta http-equiv="content-type" content="text/html; charset=utf-8" />'+
                    '<title>'+unit.word+' | Pagrindinis </title>'+
                    '<meta name="author" content="'+this.AuthorName+'" />'+
                    '<link rel="license" type="text/html" href="http://creativecommons.org/licenses/by-sa/4.0/" />'+
                    '<meta name="generator" content="eXeLearning 2.6 - exelearning.net" />'+
                    '<link rel="stylesheet" type="text/css" href="base.css" />'+
                    '<link rel="stylesheet" type="text/css" href="content.css" />'+
                    '<script type="text/javascript" src="exe_jquery.js"></script>'+
                    '<script type="text/javascript" src="common_i18n.js"></script>'+
                    '<script type="text/javascript" src="common.js"></script>'+
                    '<link rel="stylesheet" type="text/css" href="udl-content.css" />'+
                    '<script type="text/javascript" src="udl-content.js"></script>'+
                    '<script type="text/javascript" src="SCORM_API_wrapper.js"></script>'+
                    '<script type="text/javascript" src="SCOFunctions.js"></script>'+
                    '<meta name="viewport" content="width=device-width, initial-scale=1" />'+
                    '</head>'+
                    '<body id="exe-node-11" class="exe-scorm" onunload="unloadPage()"><script type="text/javascript">document.body.className+=" js";jQuery(function(){loadPage()})</script>'+
                    '<div id="outer">'+
                    '<section id="main">'+
                    '<header id="nodeDecoration"><div id="headerContent"><h1 id="nodeTitle">Lietuvių gestų kalbos mokymosi programa</h1></div></header>'+
                    '<article class="iDevice_wrapper UDLcontentIdevice" id="id4">'+
                    '<div class="iDevice emphasis0" >'+
                    '<div id="ta4_114_2" class="block iDevice_content">'+
                    '<div class="exe-udlContent exe-udlContent-engagement"><section class="exe-udlContent-block"><div class="exe-udlContent-content"><div class="exe-udlContent-content-main"><table border="1" style="width: 100%; margin-left: auto; margin-right: auto; height: 52px;" class="exe-table">'+
                    '<tbody>'+
                    '<tr style="height: 26px;">'+
                    '<td style="width: 30%; height: 26px; text-align: center;"><strong>Žodis</strong></td>'+
                    '<td style="width: 70%; height: 26px; text-align: center;"><strong>Vaizdo įrašas</strong></td>'+
                    '</tr>'+
                    '<tr style="height: 26px;">'+
                    '<td style="width: 30%; height: 26px; text-align: center;"><strong>'+unit.word+'</strong></td>'+
                    '<td style="width: 70%; height: 26px; text-align: center;"><video width="640" height="480" controls="controls" class="mediaelement">'+
                    '<source src="'+unit.file.filename+'" type="video/ogg"></video><br><br><br><br></td>'+
                    '</tr>'+
                    '</tbody>'+
                    '</table></div></div></section></div>'+
                    '</div>'+
                    '</div>'+
                    '</article>'+
                    '</section>'+
                    '</div>'+
                    '<script type="text/javascript" src="_intef_js.js"></script></body></html>';

                    this.fs.writeFileSync('../backend/src/fileStorage/'+this.scormFolder+'/'+unit.word+'.html',htmlContent);

                    RESOURCES += '<resource identifier="'+unit.word+'" type="webcontent" adlcp:scormtype="sco" href="'+unit.word+'.html">'+
                    '<file href="'+unit.word+'.html"/> '+
                    '<file href="exe_html5.js"/>' +
                    '<file href="'+unit.file.filename+'.ogg"/>' +
                    '<dependency identifierref="COMMON_FILES"/>'+
                    '</resource>\n'
                    ITEMS += '<item identifier="ITEMID'+index+'" isvisible="true" identifierref="'+unit.word+'">'+
                    '<title>'+unit.word+'</title>'+
                    '</item>\n'
                }) : RESOURCES,ITEMS, htmlContent = '';
            if (RESOURCES == '' && ITEMS =='' && htmlContent =='') {
            } else {
                var manifestContent = this.fs.readFileSync('../backend/src/fileStorage/ScormTemplate/imsmanifest.xml',{ encoding: 'utf-8' });
                manifestContent = manifestContent.replaceAll('RESOURCES', RESOURCES);
                manifestContent = manifestContent.replaceAll('ITEMS', ITEMS);
                this.fs.writeFileSync('../backend/src/fileStorage/'+this.scormFolder+'/imsmanifest.xml',manifestContent)
                const zl = require("zip-lib");
                zl.archiveFolder('./../backend/src/fileStorage/'+this.scormFolder, '../backend/src/fileStorage/ZipToExportScorm.txt',(function (err: any) {
                    console.log(err);
                }));
            }
        }
        catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        } 
    }


    createUnit(unit: string, abbreviation: string, file: any): void {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();
        const lexiconUnit = new LexiconUnit(unit, abbreviation, file);
        try {
            if (this.isWordAlreadyInFile(lexiconUnit, jsonObj.lexiconUnits)) {
                throw new Error("Word already exists");
            } else {
                jsonObj.lexiconUnits.push(lexiconUnit);
                const json = JSON.stringify(jsonObj);
                this.fs.writeFileSync(this.filename + '.json', json);
            }
        } catch (err) {
            const error = err as Error;
            throw new Error(error.message);
        }
    }

    private isWordAlreadyInFile(lexiconUnit: LexiconUnit, allUnits: any): boolean {
        for (let i = 0; i < allUnits.length; i++) {
            if (allUnits[i].word.toLocaleLowerCase() === lexiconUnit.getWord().toLocaleLowerCase())
                return true;
        }
        return false;
    }

    retrieveAll(): LexiconUnit[] {
        const jsonObj = this.readFromFileOrCreateIfFileNotFound();

        return this.transformToLexiconUnitArray(jsonObj.lexiconUnits);
    }

    private transformToLexiconUnitArray(units: any): LexiconUnit[] {
        const lexiconUnits: LexiconUnit[] = [];
        units.forEach((element: any) => {
            const unit = new LexiconUnit(element.word, element.abbreviation, element.file);
            lexiconUnits.push(unit);
        });

        return lexiconUnits;
    }

    private readFromFileOrCreateIfFileNotFound(): any {
        let obj: { lexiconUnits: LexiconUnit[] } = {
            lexiconUnits: []
        };
        try {
            const readLines = this.fs.readFileSync(this.filename + '.json', 'utf8');
            obj = JSON.parse(readLines);
        } catch (err) {
            const json = JSON.stringify(obj);
            this.fs.writeFileSync(this.filename + '.json', json);
        }

        return obj;
    }

}