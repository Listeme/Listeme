import './Journal.css';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FolderTree from 'react-folder-tree';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

// define our own custom helpers
const CustomEditor = {
    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true,
        })

        return !!match
    },

    isItalicMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.italic === true,
            universal: true,
        })

        return !!match
    },

    isUnderlineMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.underline === true,
            universal: true,
        })

        return !!match
    },

    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        })

        return !!match
    },

    toggleBoldMark(editor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleItalicMark(editor) {
        const isActive = CustomEditor.isItalicMarkActive(editor)
        Transforms.setNodes(
            editor,
            { italic: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleUnderlineMark(editor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor)
        Transforms.setNodes(
            editor,
            { underline: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'code' },
            { match: n => Editor.isBlock(editor, n) }
        )
    },
}

// default component
const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
}

// react component renderer for code blocks
const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const Leaf = props => {
    return (
        <span
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? 'bold' : 'normal',
                fontStyle: props.leaf.italic ? 'italic' : 'normal',
                textDecorationLine: props.leaf.underline ? 'underline' : 'normal'
            }}
        >
            {props.children}
        </span>
    )
}

// demo folder tree contents until db is hooked up
const treeState = {
    name: 'Sample Workspace',
    isOpen: true,
    children: [
        { name: 'Inside the sample workspace', extra: 'it should ignore this'},
        { name: 'Man this is a lot of samples huh' },
        { name: 'somebody\'s been working hard' },
        { name: "our hypothetical user", children: [
            {name: "sure is putting"},
            {name: "the work eh?"},
        ]},
    ],
};

// query to obtain current user's id and name (for note & noteFolder purposes)
const GET_USER = gql`
    query GetUser {
        users {
            id
            name
        }
    }`;

const GET_ROOT_FOLDER = gql`
    query GetRootFolder($where: NotesFolderWhere) {
        notesFolders(where: $where) {
            id
            name
        }
    }`;

const CREATE_ROOT_FOLDER = gql`
    mutation CreateRootFolder($input: [NotesFolderCreateInput!]!) {
        createNotesFolders(input: $input) {
            notesFolders {
                id
                name
            }
        }
    }`;

const GET_NOTES = gql`
    query GetNotes {
        notes {
            id
            title
            content
        }
    }`;

const CREATE_NOTE = gql`
    mutation CreateNote($input: [NoteCreateInput!]!) {
        createNotes(input: $input) {
            notes {
                id
                title
            }
        }
    }`;

const ADD_NOTE_TO_FOLDER = gql`
    mutation AddNoteToRootFolder($where: NotesFolderWhere, $update: NotesFolderUpdateInput) {
        updateNotesFolders(where: $where, update: $update) {
            notesFolders {
                id
                notes {
                    id
                    title
                }
            }
        }
    }`;

const GET_NOTE = gql`
    query GetNote($where: NoteWhere) {
        notes(where: $where) {
            id
            title
            content
        }
    }`;

const UPDATE_NOTE = gql`
    mutation EditNote($where: NoteWhere, $update: NoteUpdateInput) {
        updateNotes(where: $where, update: $update) {
            notes {
                id
                title
                content
            }
        }
    }`;

const GET_ALL_NOTES_AND_FOLDERS = gql`
query GetAllNotesAndFolders {
    notesFolders {
        notes {
            id
            title
        }
        subfolders {
            id
            name
            notes {
                id
                title
            }
        }
    }
}`;

// used for note and noteFolder queries later!
var user_id;
var user_name;
var currNoteID = null; // store id of current note here

function Journal() {
    // queries
    const [loadUser] = useLazyQuery(GET_USER);
    const [getRootFolder] = useLazyQuery(GET_ROOT_FOLDER, { variables: { "where": { "name": user_name } } });
    const [getNotes] = useLazyQuery(GET_NOTES);
    const [getCurrNote] = useLazyQuery(GET_NOTE, { variables: { "where": { "id": currNoteID } } });
    const [getAllNotesAndFolders] = useLazyQuery(GET_ALL_NOTES_AND_FOLDERS);

    // mutations
    const [makeRootFolder, { data }] = useMutation(CREATE_ROOT_FOLDER);
    const [makeNote] = useMutation(CREATE_NOTE); // pass in variables when calling
    const [addNoteToFolder] = useMutation(ADD_NOTE_TO_FOLDER);
    const [updateNote] = useMutation(UPDATE_NOTE);

    async function userInfo() {
        let userInfo = await loadUser();
        return userInfo;
    }

    async function rootFolder() {
        let rootFolder = await getRootFolder();
        return rootFolder;
    }

    async function userNotes() {
        let userNotes = await getNotes();
        return userNotes;
    }

    async function currNote() {
        let currNote = await getCurrNote();
        return currNote;
    }

    async function allNotes() {
        let allNotes = await getAllNotesAndFolders();
        return allNotes;
    }

    // get the current user, check the root folder, and currNoteID after every update
    useEffect(() => {
        userInfo().then(res => {
            console.log("User name and id retrieved");
            user_id = res.data.users[0].id;
            user_name = res.data.users[0].name;

            // now that the user has been retrived, do rootFolder stuff
            rootFolder().then(res => {
                if (res.data.notesFolders.length === 0) {
                    console.log("No root noteFolder found. Creating one.");
                    // creates Default folder
                    makeRootFolder({ variables:  {
                        "input": [
                          {
                            "name": user_name,
                            "notes": { "create": [] },
                            "subfolders": { "create": [] },
                            "user": { "connect": { "where": { "node": { "id": user_id }}}}}
                        ]}}).then(res => {
                            console.log(`Created root folder with name ${res.data.createNotesFolders.notesFolders[0].name}`);
                        });
                }
                else {
                    console.log("Root folder exists!");
                }
                userNotes().then(res => {
                    if (res.data.notes.length === 0) {
                        console.log("No notes detected, making a new note.");
                        // create a new note and set as currNoteID
                        makeNote({ variables: {
                            "input": [
                              {
                                "title": "",
                                "content": JSON.stringify([{"type":"paragraph","children":[{"text":"New Note!"}]}]),
                                "user": { "connect": { "where": { "node": { "id": user_id }}}}
                              }]}}).then(res => {
                                    console.log("Created new blank note!");
                                    currNoteID = res.data.createNotes.notes[0].id;

                                    // add the new note to the root folder
                                    addNoteToFolder({ variables: {
                                        "where": {
                                        "name": user_name
                                        },
                                        "update": {
                                        "notes": [
                                            { "connect": [
                                                { "where": { "node": { "id": currNoteID } } }
                                            ]
                                            }
                                        ]
                                        }}}).then(() => {
                                        console.log("connected new note to root folder");
                                    });
                              });
                    }
                    else if (currNoteID == null){
                        // set the first note in the result as the currNoteID *if* currNoteID has no value
                        console.log("currNoteID is null, setting to first note for user");
                        currNoteID = res.data.notes[0].id;
                        // also use setValue to ensure the editor's value is also updated
                        editor.children = JSON.parse(res.data.notes[0].content);
                        setValue(JSON.parse(res.data.notes[0].content));
                    }
                })
            });
        });
    }, [currNoteID]);


    // create a Slate editor object that won't change between renders
    const editor = useMemo(() => withReact(createEditor()), [])

    // keep track of state for the value of the editor
    const [value, setValue] = useState(() => {
        var content = null;
        // for some reason this is happening before currNoteID gets set
        // need this to run AFTER userNotes() inside useEffect sets var of currNoteID
        if (currNoteID == null) {
            console.log("currNoteID is null during initial value setting");
            // set currNoteID to a valid value then!!!
            return [{"type":"paragraph","children":[{"text":""}]}];
        }
        currNote().then(res => {
            console.log(res.data);
            content = res.data.notes[0].content;
            console.log("Content retrieved from db");
            return content; // returns content from db if it isnt empty
        });
    });

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    // render the journal
    return (
        <Flex flexDirection="row">
            <Button
                onMouseDown={event => {
                    console.log("This should make a pop up to create a new note");
                }}
            >New Note</Button>
            <Button
                onMouseDown={event => {
                    console.log("This should make a pop up to create a new folder");
                }}
            >New Folder</Button>
            <FolderTree
              id="folderTree"
              data={treeState}
              showCheckbox={false}
              initOpenStatus='custom'
            />
            <Slate
              editor={editor}
              value={value}
              onChange={value => {
                setValue(value)

                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // changes have been made so save content to note specified by currNoteID!
                    const content = JSON.stringify(value)

                    // save content to db
                    updateNote({ variables: {
                        "where": {
                          "id": currNoteID
                        },
                        "update": {
                          "title": "",
                          "content": content
                        }
                      }}).then(() => {
                          console.log("Note updated in db");
                      });
                }
              }}
              id="slateEditor">
                <Flex flexDirection="column" margin="10px" minWidth="300px">
                <ButtonGroup variant="outline" spacing="3">
                    <Button
                        size="sm"
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleBoldMark(editor)
                        }}
                    >
                        Bold
                    </Button>
                    <Button
                        size="sm"
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleItalicMark(editor)
                        }}
                    >
                        Italics
                    </Button>
                    <Button
                        size="sm"
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleUnderlineMark(editor)
                        }}
                    >
                        Underline
                    </Button>
                    <Button
                        size="sm"
                        onMouseDown={event => {
                            event.preventDefault()
                            CustomEditor.toggleCodeBlock(editor)
                        }}
                    >
                        Code Block
                    </Button>
                </ButtonGroup>
                <Editable
                    id="slateEditorField"
                    // pass in renderElement
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (!event.ctrlKey) {
                            return
                        }

                        switch (event.key) {
                            case 'q': {
                                console.log("pressed `")
                                event.preventDefault()
                                CustomEditor.toggleCodeBlock(editor)
                                break
                            }

                            case 'b': {
                                event.preventDefault()
                                CustomEditor.toggleBoldMark(editor)
                                break
                            }

                            case 'i': {
                                event.preventDefault()
                                CustomEditor.toggleItalicMark(editor)
                                break
                            }

                            case 'u': {
                                event.preventDefault()
                                CustomEditor.toggleUnderlineMark(editor)
                                break
                            }

                            default:
                                break
                        }
                    }}
                />
                </Flex>
            </Slate>
        </Flex>
    );
}

export default Journal;