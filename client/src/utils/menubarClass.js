 const headbuttons = [
    {
        name: "Font Sizes",
        children: [ 
            {
            label: 'Paragraph',
            command: 'setParagraph',
          },
          {
            label: 'H1',
            command: 'toggleHeading',
            className: 'heading',
            arg: {
              level: 1,
            }
          },
          {
            label: 'H2',
            command: 'toggleHeading',
            className: 'heading',
            arg: {
              level: 2,
            }
          },
          {
            label: 'H3',
            command: 'toggleHeading',
            className: 'heading',
            arg: {
              level: 3,
            }
          },
        ]
    },
    {
        name: "Styles",
        children: [
            {
              label: 'bold',
              command: 'toggleBold',
              className: 'bold',
              img: true,
              disabled: true,
            },
       {
               label: 'italicFont',
              command: 'toggleItalic',
              className: 'italic',
              img: true,
              disabled: true,
 
        },
        {
         
              label: 'strike',
              command: 'toggleStrike',
              className: 'strike',
              img: true,
              disabled: true,
 
        }
 
         ]

    },
    {
        name: 'Lists',
        children: [
            {
                label: 'list',
                command: 'toggleBulletList',
                className: 'bulletList',
                img: true,
            },
            {
                    label: 'olist',
                    command: 'toggleOrderedList',
                    className: 'orderedList',
                    img: true,
            },
            { 
                label: 'checkList',
                command: 'toggleTaskList',
                className: 'taskList',
                img: true, 
        },
        ]
    },
    {
        name: "Align",
        children: [
            {
                label: 'alignLeft',
                command: 'setTextAlign',
                className: {
                    textAlign: 'left'
                },
                arg: "left",
                img: true, 
            },
            {
                label: 'center',
                command: 'setTextAlign',
                className: {
                    textAlign: 'center'
                },
                arg: "center",
                img: true, 
            },
            {
                label: 'alignRight',
                command: 'setTextAlign',
                className: {
                    textAlign: 'right'
                },
                arg: "right",
                img: true, 
            },
            {
                label: 'justify',
                command: 'setTextAlign',
                className: {
                    textAlign: 'justify'
                },
                arg: "justify",
                img: true, 
            },

        ]

    },
    {
        name: 'Decorations',
        children: [
            {
                label: 'Code Block',
                command: 'toggleCodeBlock',
                className: 'codeBlock',
            },
            {
                label: 'blockquote',
                command: 'toggleBlockquote',
                className: 'blockquote',
                img: true,
            }
        ]

    },
    {
        name: "Color",
        children: [
            {
                parent: "Color",
                command: "setColor",
                className: "textStyle",
                arg: {
                    color: "#A020F0",
                },
                div: true,
                col: "#A020F0",
            },
            {
                parent: "Color",
                command: "setColor",
                className: "textStyle",
                arg: {
                    color: "#FF0000",
                },
                div: true,
                col: "#FF0000",
            },
            {
                parent: "Color",
                command: "setColor",
                className: "textStyle",
                arg: {
                    color: "#00ff00",
                },
                div: true,
                col: "#00ff00",
            },
            {
                parent: "Color",
                command: "setColor",
                className: "textStyle",
                arg: {
                    color: "#0000FF",
                },
                div: true,
                col: "#0000FF",
            },
            {
                parent: "Color",
                command: "setColor",
                className: "textStyle",
                arg: {
                    color: "#FFFF00",
                },
                div: true,
                col: "#FFFF00",
            },

        ]
    },
    {
        name: 'Extras',
        children: [
            {
                label: "Clear Nodes",
                command: "clearNodes",
                
            },
            {
                label: "Undo",
                command: "undo",
                
            },
            {
                label: "Redo",
                command: "redo",
                
            }
        ]
    }
    
  
  ];

  export default headbuttons