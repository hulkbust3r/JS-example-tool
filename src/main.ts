import { QFontDatabase, QMainWindow, QWidget, QLabel, QPushButton, QIcon, QBoxLayout, Direction, QFont } from '@nodegui/nodegui';
import * as path from "node:path";
import { CLIENT_RENEG_LIMIT } from 'node:tls';
import sourceMapSupport from 'source-map-support';
import filesystem from "fs";
sourceMapSupport.install();

function main(): void {
  const win = new QMainWindow();
  win.show();
  win.setWindowTitle("8=>");

  const centralWidget = new QWidget();
  const centralLayout = new QBoxLayout(Direction.TopToBottom);
  centralWidget.setObjectName("myCentral");
  centralWidget.setLayout(centralLayout);

  let rowLayoutList = [];
  let levelGridList = [];
  function AddRow()
  {
    const addWidget = new QWidget();
    const addLayout = new QBoxLayout(Direction.LeftToRight);
    addWidget.setLayout(addLayout);
    centralLayout.addWidget(addWidget);
    return addLayout;
  }
  function AddButtonRow()
  {
    let buttonRow = AddRow();

    let newLevelRow = [];
    const addButtonButton = new QPushButton();
    addButtonButton.setText('Add Object!');
    addButtonButton.addEventListener('clicked', () => { AddLevelObjectButton(levelGridList.length,buttonRow,newLevelRow) });
    buttonRow.addWidget(addButtonButton);
    rowLayoutList.push(buttonRow);
    levelGridList.push(newLevelRow);
  }

  function AddLevelObjectButton(aY,aButtonRow,aLevelRow)
  {

    const levelButton = new QPushButton();
    levelButton.setText(SelectedColor);
    let buttonSelectedColor = SelectedColor;
    aLevelRow.push(buttonSelectedColor);
    levelButton.addEventListener('clicked', () => { ChangeButtonToSelectedColor(aLevelRow.length-1,aY,levelButton) });
    aButtonRow.addWidget(levelButton);


  }
  function ChangeButtonToSelectedColor(aX,aY,aButton)
  {
    aButton.setText(SelectedColor);
    levelGridList[aX][aY] = SelectedColor;
  }
  rowLayoutList.push(AddRow());
  let SelectedColor = 'R'

  const label = new QLabel();
  label.setObjectName("mylabel");
  label.setText(SelectedColor);
  rowLayoutList[0].addWidget(label);

  rowLayoutList.push(AddRow());
  const colorButtonRed = new QPushButton();
  colorButtonRed.setText('RED');
  colorButtonRed.addEventListener('clicked', () => { SetSelectedColor('R') });
  rowLayoutList[1].addWidget(colorButtonRed);
  const colorButtonBlue = new QPushButton();
  colorButtonBlue.setText('BLUE');
  colorButtonBlue.addEventListener('clicked', () => { SetSelectedColor('B') });
  rowLayoutList[1].addWidget(colorButtonBlue);
  const colorButtonYellow = new QPushButton();
  colorButtonYellow.setText('YELLOW');
  colorButtonYellow.addEventListener('clicked', () => { SetSelectedColor('Y') });
  rowLayoutList[1].addWidget(colorButtonYellow);

  function SetSelectedColor(aColorToSelect)
  {
    SelectedColor = aColorToSelect;
    label.setText(SelectedColor);
  }

  rowLayoutList.push(AddRow());

  let numberOfButtons = 0;
  const saveButton = new QPushButton();
  saveButton.setText('Save!');
  saveButton.addEventListener('clicked', () => { SaveLevel() });

 //NEDAN: SKRIVA TILL FILER I JAVASCRIPT
  function SaveLevel() {

    var fileSystemObject = require('fs');
    
    var fileToWriteTo = fileSystemObject.createWriteStream('C:/Users/maxma/Desktop/ANEWLEVEL.MaxEgnaFormat', {flags:'a'/*A står för Append*/})
    levelGridList.forEach(row => {
      row.forEach(levelObject => {
        fileToWriteTo.write(levelObject);
      })
      fileToWriteTo.write('\n'); 
    });
    fileToWriteTo.end(); 

  }
 //OVAN: SKRIVA TILL FILER I JAVASCRIPT

  rowLayoutList[2].addWidget(saveButton);

  const newRowButton = new QPushButton();
  newRowButton.setText('New Level Row!');
  newRowButton.addEventListener('clicked', () => { AddButtonRow() });
  rowLayoutList[2].addWidget(newRowButton);


  const label2 = new QLabel();
  const font = new QFont()
  label2.setText("World");
  label2.setInlineStyle(`
    color: red;
  `);

  win.setCentralWidget(centralWidget);
  win.setStyleSheet(
    `
    #myCentral {
      background-color: #009688;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 64px;
      font-weight: bold;
      padding: 1;
    }
  `
  );


  (global as any).win = win;
}
main();

  // const button1 = new QPushButton();

  // function clickEventFunc(afunc: any) {
  //   numberOfButtons++;
  //   label.setText(numberOfButtons);
  //   const newButton = new QPushButton();
  //   newButton.setText('Click me');
  //   newButton.addEventListener('clicked', () => {
  //     clickEventFunc(afunc);
  //   })
  //   rootLayout.addWidget(newButton);
  // }



  // button1.setText('Click me');
  // button1.addEventListener('clicked', () => {
  //   clickEventFunc(clickEventFunc);
  // });

