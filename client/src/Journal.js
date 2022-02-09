import './Journal.css';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useCallback, useMemo, useState } from 'react';

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

function Journal() {
    // create a Slate editor object that won't change between renders
    const editor = useMemo(() => withReact(createEditor()), [])

    // keep track of state for the value of the editor
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'This is the new default' }]
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

    // render the Slate context
    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <div id="editorToolbar">
                <button
                  onMouseDown={event => {
                      event.preventDefault()
                      CustomEditor.toggleBoldMark(editor)
                  }}
                >
                  Bold
                </button>
                <button
                  onMouseDown={event => {
                      event.preventDefault()
                      CustomEditor.toggleItalicMark(editor)
                  }}
                >
                  Italics
                </button>
                <button
                  onMouseDown={event => {
                      event.preventDefault()
                      CustomEditor.toggleUnderlineMark(editor)
                  }}
                >
                  Underline
                </button>
                <button
                  onMouseDown={event => {
                      event.preventDefault()
                      CustomEditor.toggleCodeBlock(editor)
                  }}
                >
                  Code Block
                </button>
            </div>
            <Editable
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
        </Slate>
    );
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
                textDecorationLine: props.leaf.underline ? 'underline' : 'normal'}}
        >
            {props.children}
        </span>
    )
}

// TODO:
// 1. add more elements than a plaintext editable area
// 2. use some basic css to arrange them on screen
// 3. add more features to the editor (markdown support, codeblocks, font changing, etc)
// 4. check out the "saving to a database" section of slate documentation to figure out saving

export default Journal;
