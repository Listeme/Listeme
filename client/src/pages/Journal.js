import './Journal.css';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useCallback, useMemo, useState } from 'react';
import FolderTree from 'react-folder-tree';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';

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
        { name: 'Inside the sample workspace'},
        { name: 'Man this is a lot of samples huh' },
        { name: 'somebody\'s been working hard' },
        { name: "our hypothetical user", children: [
            {name: "sure is putting"},
            {name: "the work eh?"},
        ]},
    ],
};

function Journal() {
    // create a Slate editor object that won't change between renders
    const editor = useMemo(() => withReact(createEditor()), [])

    // keep track of state for the value of the editor
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'start typing here :D' }]
        }
    ])

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
            <FolderTree
              id="folderTree"
              data={treeState}
              showCheckbox={false}
              initOpenStatus='custom'
            />
            <Slate editor={editor} value={value} onChange={value => setValue(value)} id="slateEditor">
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

// TODO:
// add multiple note functionality once db is connected

export default Journal;
